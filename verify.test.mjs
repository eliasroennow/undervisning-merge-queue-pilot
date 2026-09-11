import test from 'node:test';
import assert from 'node:assert/strict';
import { verify, verifyFiles } from './verify.mjs';

test('baseline files pass', () => verifyFiles());
test('two independent compatible updates pass together', () => verify({units:20}, {units:30}));
test('each incompatible change passes against the original baseline', () => {
  verify({units:60}, {units:10});
  verify({units:10}, {units:60});
});
test('combining those individually green changes fails', () => {
  assert.throws(() => verify({units:60}, {units:60}), /combined-capacity-exceeded/);
});
test('an individually invalid change fails', () => {
  assert.throws(() => verify({units:101}, {units:10}), /combined-capacity-exceeded/);
});
test('malformed or unexpected inputs fail closed', () => {
  for (const value of [{units:'10'}, {units:-1}, {}, {units:10, bypass:true}]) {
    assert.throws(() => verify(value, {units:10}));
  }
});
