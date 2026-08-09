'use strict';

const { describe, it } = require("node:test");
const AVL = require("../lib/BinarySearchTree/AVL.js");
const assert = require("node:assert/strict");
const { iterator } = require("naughty-util");

const grow = (dataset, tree = new AVL()) =>
  (dataset.forEach(x => tree.insert(x)), tree);

describe('AVL', () => {
  it('insert / rotation LR - LL', () => {
    const tree = grow([23, 1, 6, -3, 9, 7, 15, 4, 2, 13]);
    assert.deepEqual([...tree], [-3, 1, 2, 4, 6, 7, 9, 13, 15, 23]);
  });

  it('insert / rotation RR', () => {
    const tree = grow([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    assert.deepEqual([...tree], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('insert / rotation RL', () => {
    const tree = grow([10, 5, 15, 20, 12, 13, 11, 14, 25, 23]);
    assert.deepEqual([...tree], [5, 10, 11, 12, 13, 14, 15, 20, 23, 25]);
    assert.ok(tree.insert(-1));
    assert.ok(!tree.insert(5));
  });

  it('delete', () => {
    const eviction = [10, 25, 20, 90, 80, 70, 50, 40,
      60, 30, 35, 45, 55, 65, 75];
    const orders = new Map([
      [10, [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90]],
      [25, [20, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90]],
      [20, [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90]],
      [90, [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]],
      [80, [30, 35, 40, 45, 50, 55, 60, 65, 70, 75]],
      [70, [30, 35, 40, 45, 50, 55, 60, 65, 75]],
      [50, [30, 35, 40, 45, 55, 60, 65, 75]],
      [40, [30, 35, 45, 55, 60, 65, 75]],
      [60, [30, 35, 45, 55, 65, 75]],
      [30, [35, 45, 55, 65, 75]],
      [35, [45, 55, 65, 75]],
      [45, [55, 65, 75]],
      [55, [65, 75]],
      [65, [75]],
      [75, []],
    ]);
    const tree = grow([50, 30, 70, 20, 40, 60, 80, 10,
      25, 35, 45, 55, 65, 75, 90]);
    const size = tree.size;
    assert.ok(!tree.delete(9999));
    for (const [candidate, i] of iterator.enumerate(eviction)) {
      assert.ok(tree.delete(candidate));
      assert.equal(size - (i + 1), tree.size);
      assert.deepEqual([...tree], orders.get(candidate));
    }
    assert.equal(tree.size, 0);
  });

  it('min - max - size - height', () => {
    const dataset = [50, 30, 70, 20, 40, 60, 80, 10,
      25, 35, 45, 55, 65, 75, 90];
    const tree = grow(dataset);
    assert.equal(tree.max, 90);
    assert.equal(tree.min, 10);
    assert.equal(tree.height, 3);
    assert.equal(tree.size, dataset.length);
  });

  it('search - has', () => {
    const tree = grow([50, 30, 70, 20, 40, 60, 80, 10,
      25, 35, 45, 55, 65, 75, 90]);
    assert.equal(tree.search(65).value, 65);
    assert.equal(tree.search(22), null);
    assert.ok(tree.has(35));
    assert.ok(!tree.has(11));
  });
});