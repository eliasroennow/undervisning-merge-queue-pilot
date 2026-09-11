import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// Synthetic invariant, not application code. Separate-file changes can merge
// cleanly in Git while violating this shared limit.
export function verify(left, right) {
  for (const input of [left, right]) {
    assert.deepEqual(Object.keys(input).sort(), ['units']);
    assert.ok(Number.isSafeInteger(input.units) && input.units >= 0);
  }
  assert.ok(left.units + right.units <= 100, 'combined-capacity-exceeded');
}

export function verifyFiles() {
  verify(...['left.json', 'right.json'].map(name =>
    JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  verifyFiles();
  console.log('Synthetic candidate invariant passed. This is not a merge-queue receipt.');
}
