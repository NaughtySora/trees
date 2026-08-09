'use strict';

const { describe, it } = require("node:test");
const assert = require('node:assert/strict');
const { BinarySearchTree } = require("../lib/BinarySearchTree/index.js");
const { misc } = require("naughty-util");

const NUMBERS = [8, 3, 1, 6, 4, 7, 10, 14];

describe('BinarySearchTree', () => {
  it('insert', () => {
    const expected = [1, 3, 4, 6, 7, 8, 10, 14];
    const tree = new BinarySearchTree();
    NUMBERS.forEach(x => tree.insert(x));
    assert.deepEqual([...tree], expected);
    tree.insert(3);
    assert.deepEqual([...tree], expected);
  });

  it('search/has', () => {
    const tree0 = new BinarySearchTree();
    NUMBERS.forEach(x => tree0.insert(x));
    assert.ok(tree0.has(3));
    assert.ok(tree0.has(1));
    assert.ok(tree0.has(6));
    assert.ok(tree0.has(10));
    assert.ok(!tree0.has(12));
    assert.ok(!tree0.has(0));
    assert.ok(!tree0.has(null));
    assert.ok(!tree0.has(24));

    assert.ok(tree0.search(3));
    assert.ok(tree0.search(1));
    assert.ok(tree0.search(6));
    assert.ok(tree0.search(10));
    assert.ok(!tree0.search(12));
    assert.ok(!tree0.search(0));
    assert.ok(!tree0.search(null));
    assert.ok(!tree0.search(24));

    const tree1 = new BinarySearchTree();
    for (const i of misc.range(999)) tree1.insert(i);
    assert.ok(tree1.has(255));
    assert.ok(tree1.has(999));
    assert.ok(tree1.has(1));
    assert.ok(tree1.has(0));
    assert.ok(!tree1.has(1000));
    assert.ok(!tree1.has(25555));

    assert.ok(tree1.search(255));
    assert.ok(tree1.search(999));
    assert.ok(tree1.search(1));
    assert.ok(tree1.search(0));
    assert.ok(!tree1.search(1000));
    assert.ok(!tree1.search(25555));
  });

  it('delete', () => {
    const expected = new Map([
      [8, [1, 3, 4, 6, 7, 10, 14]],
      [3, [1, 4, 6, 7, 8, 10, 14]],
      [1, [3, 4, 6, 7, 8, 10, 14]],
      [6, [1, 3, 4, 7, 8, 10, 14]],
      [4, [1, 3, 6, 7, 8, 10, 14]],
      [7, [1, 3, 4, 6, 8, 10, 14]],
      [10, [1, 3, 4, 6, 7, 8, 14]],
      [14, [1, 3, 4, 6, 7, 8, 10]]
    ]);
    const test = new Map();
    NUMBERS.forEach(x => {
      const tree = new BinarySearchTree();
      NUMBERS.forEach(y => tree.insert(y));
      tree.delete(x);
      test.set(x, [...tree]);
    });
    assert.deepEqual(test, expected);
    const tree = new BinarySearchTree();
    NUMBERS.forEach(x => tree.insert(x));
    assert.ok(!tree.delete(-500));
  });
});

