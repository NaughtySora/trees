'use strict';

const { describe, it, beforeEach } = require("node:test");
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

  it('max over full range', () => {
    const tree = new SegmentTree(arr, max);
    assert.equal(tree.select(0, arr.length - 1), 19);
    assert.equal(tree.select(1, 3), 3);
  });

  it('sum over partial range', () => {
    const tree = new SegmentTree(arr, sum);
    assert.equal(tree.select(0, arr.length - 1), 190);
    assert.equal(tree.select(1, 3), 6);
  });

  describe('update', () => {
    let tree;

    beforeEach(() => {
      tree = new SegmentTree(
        [1, 3, 5, 7, 9, 11, 13, 15],
        arr => arr.reduce((a, b) => a + b, 0)
      );
    });

    it('updates a single leaf and propagates aggregation', () => {
      assert.equal(tree.select(0, 7), 64);
      assert.equal(tree.select(0, 1), 4);
      assert.equal(tree.select(3, 3), 7);
      tree.update(3, 10);
      assert.equal(tree.select(3, 3), 10);
      assert.equal(tree.select(0, 7), 67);
      assert.equal(tree.select(0, 3), 19);
      assert.equal(tree.select(3, 5), 30);
    });

    it('updates first and last elements', () => {
      tree.update(0, 100);
      tree.update(7, 200);
      assert.equal(tree.select(0, 0), 100);
      assert.equal(tree.select(7, 7), 200);
      assert.equal(tree.select(0, 7), 348);
    });

    it('updates multiple elements sequentially', () => {
      tree.update(2, 0);
      tree.update(4, 0);
      tree.update(5, 20);
      assert.equal(tree.select(0, 2), 4);
      assert.equal(tree.select(3, 5), 27);
      assert.equal(tree.select(0, 7), 59);
    });
  });
});