'use strict';

const { describe, it } = require("node:test");
const assert = require('node:assert/strict');
const SegmentTree = require("../lib/SegmentTree.js");

describe.only('SegmentTree', () => {
  const arr = [1, 2, 3, 4, 5];
  const max = (values) => Math.max(...values);
  const sum = (values) => values.reduce((a, b) => a + b, 0);

  it('fills the tree correctly', () => {
    const tree = new SegmentTree(arr, max);
    assert.equal(tree.tree[0][0], 0);
    assert.equal(tree.tree[0][1], arr.length - 1);
  });

  it('computes correct max over full range', () => {
    const tree = new SegmentTree(arr, max);
    const result = tree.select(0, arr.length - 1);
    assert.equal(result, 5);
  });

  it('computes correct max over subrange', () => {
    const tree = new SegmentTree(arr, max);
    const result = tree.select(1, 3);
    assert.equal(result, 4);
  });

  it('computes correct sum over full range', () => {
    const tree = new SegmentTree(arr, sum);
    const result = tree.select(0, arr.length - 1);
    assert.equal(result, 15);
  });

  it('computes correct sum over partial range', () => {
    const tree = new SegmentTree(arr, sum);
    const result = tree.select(2, 4);
    assert.equal(result, 12);
  });
});