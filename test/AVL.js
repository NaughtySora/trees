'use strict';

const { describe, it } = require("node:test");
const AVL = require("../lib/BinarySearchTree/AVL.js");
const assert = require("node:assert/strict");

describe('AVL', () => {
  it('insert / rotation LR - LL', () => {
    const tree = new AVL();
    const data = [23, 1, 6, -3, 9, 7, 15, 4, 2, 13];
    data.forEach(x => tree.insert(x));
    assert.deepEqual([...tree], [-3, 1, 2, 4, 6, 7, 9, 13, 15, 23]);
  });

  it('insert / rotation RR', () => {
    const tree = new AVL();
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    data.forEach(x => tree.insert(x));
    assert.deepEqual([...tree], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('insert / rotation RL', () => {
    const tree = new AVL();
    const data = [10, 5, 15, 20, 12, 13, 11, 14, 25, 23];
    data.forEach(x => tree.insert(x));
    assert.deepEqual([...tree], [5, 10, 11, 12, 13, 14, 15, 20, 23, 25]);
  });
});