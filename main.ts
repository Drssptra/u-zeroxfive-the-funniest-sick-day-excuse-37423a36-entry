// u-zeroxfive-the-funniest-sick-day-excuse-37423a36 — v2 resubmit.
// Builds the excuse from ordered clauses, validates it against the
// 1–200 char single-line gate, then writes it byte-exact to
// $MAKEFUN_OUTPUT_DIR/entry.txt (no trailing newline) and echoes it.
// Node 22, stdlib only, no network, deterministic: same bytes every run.
// Expected entry: 129 chars, single line, no trailing newline in entry.txt.
import * as fs from "node:fs";
import * as path from "node:path";

const CLAUSES: readonly string[] = [
  "Won't be in today —",
  "the elevator stopped between floors",
  "and I've been stuck in it so long",
  "the building's started charging me rent",
];

function buildEntry(clauses: readonly string[]): string {
  return clauses.join(" ");
}

function gate(entry: string): void {
  const checks: Array<[boolean, string]> = [
    [entry.length >= 1 && entry.length <= 200, `length ${entry.length} outside 1-200`],
    [!/[\r\n]/.test(entry), "entry must be a single line"],
    [entry.trim().length > 0, "entry must not be blank"],
    [!entry.endsWith("\n"), "entry must not end with a newline"],
  ];
  for (const [ok, why] of checks) {
    if (!ok) throw new Error(`invalid entry: ${why}`);
  }
}

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (dir !== undefined && dir.length > 0) return dir;
  return "/output";
}

function main(): void {
  const entry = buildEntry(CLAUSES);
  gate(entry);
  const dir = outputDir();
  fs.mkdirSync(dir, { recursive: true });
  const target = path.resolve(dir, "entry.txt");
  fs.writeFileSync(target, Buffer.from(entry, "utf8"));
  process.stdout.write(entry + "\n");
}

main();
