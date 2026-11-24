// The Funniest Out-of-Office — make.fun bounty
// Writes a single-line out-of-office auto-reply (<=140 chars) to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt). Pure Node stdlib,
// deterministic: the same line every run.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// One line a real person would set: a believable OOO setup, then a
// twist nobody sees coming — the cat has taken over the inbox and her
// entire email policy is one word.
const LINE =
  "I'm out of office until Monday. My cat is answering my emails — " +
  "she has replied to everyone with 'no', and honestly, she's not wrong.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry line must be 1-140 chars, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry line must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true, mode: 0o755 });
writeFileSync(outFile, LINE + "\n", { encoding: "utf8", mode: 0o644 });
try {
  chmodSync(outFile, 0o644);
} catch {
  // mode already set by writeFileSync; ignore on filesystems that balk
}
console.log(`wrote ${outFile} (${LINE.length} chars)`);
