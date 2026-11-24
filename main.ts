// The Funniest Sick-Day Excuse — a make.fun bounty entry.
//
// One line, one breath: the excuse itself, written to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt) with no
// trailing newline, and echoed to stdout. Same text on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Won't be in today — my flatmate's sourdough starter escaped its jar overnight and now the kitchen is officially a biohazard";

// The gate is 1–200 characters; refuse to write anything outside it.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1-200 gate`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
