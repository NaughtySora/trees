'use strict';

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const BinaryHeap = require("../lib/BinaryHeap/index.js");

const max = (a, b) => b - a;
const min = (a, b) => a - b;

describe('BinaryHeap', () => {
  it('compare should be function', () => {
    assert.throws(() => {
      new BinaryHeap();
    }, { message: "Binary heap requires a compare function" });
  });

  describe('MaxHeap', () => {
    it('insert', () => {
      const heap = new BinaryHeap(max);
      heap.insert(1);
      assert.deepEqual(heap.copy(), [1]);
      heap.insert(2);
      assert.deepEqual(heap.copy(), [2, 1]);
      heap.insert(0);
      assert.deepEqual(heap.copy(), [2, 1, 0]);
      heap.insert(3);
      assert.deepEqual(heap.copy(), [3, 2, 0, 1]);
    });

    it('peek', () => {
      const heap = new BinaryHeap(max);
      heap.insert(1);
      assert.equal(heap.peek(), 1);
      assert.equal(heap.length, 1);
      heap.insert(2);
      assert.equal(heap.peek(), 2);
      assert.equal(heap.length, 2);
    });

    it('extract', () => {
      const heap = new BinaryHeap(max);
      heap.insert(5);
      heap.insert(2);
      heap.insert(5);
      heap.insert(4);
      heap.insert(6);
      assert.equal(heap.extract(), 6);
      assert.deepEqual(heap.copy(), [5, 4, 5, 2]);
      assert.equal(heap.extract(), 5);
      assert.deepEqual(heap.copy(), [5, 4, 2]);
      assert.equal(heap.extract(), 5);
      assert.deepEqual(heap.copy(), [4, 2]);
      assert.equal(heap.extract(), 4);
      assert.deepEqual(heap.copy(), [2]);
      assert.equal(heap.extract(), 2);
      assert.deepEqual(heap.copy(), []);
    });

    it('heapify', () => {
      const heap = new BinaryHeap(max);
      heap.heapify([5, 2, 5, 4, 6]);
      assert.deepEqual(heap.copy(), [6, 5, 5, 4, 2]);
      assert.equal(heap.extract(), 6);
      assert.deepEqual(heap.copy(), [5, 4, 5, 2]);
      assert.equal(heap.extract(), 5);
      assert.deepEqual(heap.copy(), [5, 4, 2]);
      assert.equal(heap.extract(), 5);
      assert.deepEqual(heap.copy(), [4, 2]);
      assert.equal(heap.extract(), 4);
      assert.deepEqual(heap.copy(), [2]);
      assert.equal(heap.extract(), 2);
      assert.deepEqual(heap.copy(), []);
    });
  });

  describe('MinHeap', () => {
    it('insert', () => {
      const heap = new BinaryHeap(min);
      heap.insert(1);
      assert.deepEqual(heap.copy(), [1]);
      heap.insert(2);
      assert.deepEqual(heap.copy(), [1, 2]);
      heap.insert(0);
      assert.deepEqual(heap.copy(), [0, 2, 1]);
      heap.insert(3);
      assert.deepEqual(heap.copy(), [0, 2, 1, 3]);
    });

    it('peek', () => {
      const heap = new BinaryHeap(min);
      heap.insert(1);
      assert.equal(heap.peek(), 1);
      assert.equal(heap.length, 1);
      heap.insert(2);
      assert.equal(heap.peek(), 1);
      assert.equal(heap.length, 2);
    });

    it('extract', () => {
      const heap = new BinaryHeap(min);
      heap.insert(5);
      heap.insert(2);
      heap.insert(5);
      heap.insert(4);
      heap.insert(6);
      assert.equal(heap.extract(), 2);
      assert.deepEqual(heap.copy(), [4, 5, 5, 6]);
      assert.equal(heap.extract(), 4);
      assert.deepEqual(heap.copy(), [5, 6, 5]);
      assert.equal(heap.extract(), 5);
      assert.deepEqual(heap.copy(), [5, 6]);
      assert.equal(heap.extract(), 5);
      assert.deepEqual(heap.copy(), [6]);
      assert.equal(heap.extract(), 6);
      assert.deepEqual(heap.copy(), []);
    });

    it('heapify', () => {
      const heap = new BinaryHeap(min);
      heap.heapify([5, 2, 5, 4, 6]);
      assert.deepEqual(heap.copy(), [2, 4, 5, 5, 6]);
      assert.equal(heap.extract(), 2);
      assert.deepEqual(heap.copy(), [4, 5, 5, 6]);
      assert.equal(heap.extract(), 4);
      assert.deepEqual(heap.copy(), [5, 6, 5]);
      assert.equal(heap.extract(), 5);
      assert.deepEqual(heap.copy(), [5, 6]);
      assert.equal(heap.extract(), 5);
      assert.deepEqual(heap.copy(), [6]);
      assert.equal(heap.extract(), 6);
      assert.deepEqual(heap.copy(), []);
    });
  });

  it('clear', () => {
    const heap = new BinaryHeap(max);
    heap.heapify([5, 2, 5, 4, 6]);
    assert.equal(heap.length, 5);
    heap.clear();
    assert.equal(heap.length, 0);
  });
});