/// <reference path="../dist/carol.d.ts" />

import test, { describe } from 'node:test';
import assert from 'node:assert';
import _default, { carol, Pattern, alt, seq } from 'carol-js';

describe('api', () => {
  test('carol', () => {
    assert.strictEqual(carol(/abc/).source, 'abc');
  });

  test('Pattern', () => {
    assert.strictEqual(new Pattern('abc').source, 'abc');
  });

  test('seq', () => {
    assert.strictEqual(seq([carol(/abc/), carol(/xyz/)]).source, 'abcxyz');
  });

  test('alt', () => {
    assert.strictEqual(alt([carol(/abc/), carol(/xyz/)]).source, '(?:abc|xyz)');
  });

  test('Pattern.many', () => {
    const p = carol(/abc/);
    assert.strictEqual(p.many().source, '(?:abc)*');
  });

  test('Pattern.option', () => {
    const p = carol(/abc/);
    assert.strictEqual(p.option().source, '(?:abc)?');
  });

  test('Pattern.capture', () => {
    const p = carol(/abc/);
    assert.strictEqual(p.capture().source, '(abc)');
  });

  test('Pattern.toRegex', () => {
    const p = carol(/abc/);
    assert.ok(p.toRegex() instanceof RegExp);
  });
});

describe('api (default export)', () => {
  test('default', () => {
    assert.strictEqual(_default(/abc/).source, 'abc');
  });

  test('default.carol', () => {
    assert.strictEqual(_default.carol(/abc/).source, 'abc');
  });

  test('default.Pattern', () => {
    assert.strictEqual(new _default.Pattern('abc').source, 'abc');
  });

  test('default.seq', () => {
    assert.strictEqual(_default.seq([_default.carol(/abc/), _default.carol(/xyz/)]).source, 'abcxyz');
  });

  test('default.alt', () => {
    assert.strictEqual(_default.alt([_default.carol(/abc/), _default.carol(/xyz/)]).source, '(?:abc|xyz)');
  });
});
