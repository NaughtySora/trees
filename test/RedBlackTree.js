'use strict';

const { describe, it } = require("node:test");
const assert = require('node:assert/strict');
const RedBlackTree = require('../lib/BinarySearchTree/RedBlack/index.js');

const grow = (dataset, tree = new RedBlackTree()) =>
  (dataset.forEach(x => tree.insert(x)), tree);

describe('RedBlackTree', () => {
  it('insert LL', () => {
    const tree = grow([50, 30, 20, 10, 5, 25, 40, 35, 45, 15]);
    const colors = new Map([
      [50, RedBlackTree.black],
      [30, RedBlackTree.black],
      [20, RedBlackTree.black],
      [10, RedBlackTree.red],
      [5, RedBlackTree.black],
      [25, RedBlackTree.red],
      [40, RedBlackTree.red],
      [35, RedBlackTree.black],
      [45, RedBlackTree.red],
      [15, RedBlackTree.red],
    ]);
    for(const i of tree){
      assert.equal(tree.search(i).color, colors.get(i));
    }
    assert.deepEqual([...tree], [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
  });

  it('insert RR', () => {
    const tree = grow([10, 20, 30, 40, 50, 25, 35, 45, 55, 60]);
    assert.deepEqual([...tree], [10, 20, 25, 30, 35, 40, 45, 50, 55, 60]);
  });

  it('insert LR', () => {
    const tree = grow([50, 20, 30, 10, 25, 35, 5, 15, 27, 40]);
    assert.deepEqual([...tree], [5, 10, 15, 20, 25, 27, 30, 35, 40, 50]);
  });

  it('insert RL', () => {
    const tree = grow([20, 50, 30, 10, 60, 25, 40, 5, 35, 70]);
    assert.deepEqual([...tree], [5, 10, 20, 25, 30, 35, 40, 50, 60, 70]);
  });
});