'use strict';

const { describe, it } = require("node:test");
const assert = require('node:assert/strict');
const SegmentTree = require("../lib/SegmentTree.js");

describe('SegmentTree', () => {
  const arr = Array.from({ length: 20 }, (_, i) => i);
  const max = (values) => Math.max(...values);
  const sum = (values) => values.reduce((a, b) => a + b, 0);

  it('tree building correctly', () => {
    const tree = new SegmentTree(arr, max);
    assert.deepEqual(tree.range(0), [0, 19]);
    assert.deepEqual(tree.range(7), [0, 2]);
    assert.deepEqual(tree.range(18), [4]);
    assert.deepEqual(tree.range(25), [13]);
  });

  it('tree meta', () => {
    const tree = new SegmentTree(arr, max);
    assert.deepEqual(tree.meta(0), 19);
    assert.deepEqual(tree.meta(7), 2);
    assert.deepEqual(tree.meta(18), 4);
    assert.deepEqual(tree.meta(25), 13);
  });

  it('computes correct max over full range', () => {
    const tree = new SegmentTree(arr, max);
    assert.equal(tree.select(0, arr.length - 1), 19);
    assert.equal(tree.select(1, 3), 3);
  });

  it('computes correct sum over partial range', () => {
    const tree = new SegmentTree(arr, sum);
    assert.equal(tree.select(0, arr.length - 1), 190);
    assert.equal(tree.select(1, 3), 6);
  });
});