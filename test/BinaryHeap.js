'use strict';

const { describe, it, beforeEach } = require("node:test");
const BinaryHeap = require("../lib/BinaryHeap.js");
const assert = require("node:assert/strict");

describe('BinaryHeap', () => {
  it('compare should be function', () => {
    assert.throws(() => {
      new BinaryHeap();
    }, { message: "Binary heap requires a compare function" });
  });

  describe('MaxHeap', () => {
    let heap = new BinaryHeap((a, b) => b - a);
    beforeEach(() => {
      heap = new BinaryHeap((a, b) => b - a);
    });
    it('push', () => {
      heap.push(1);
      assert.deepEqual(heap.copy(), [1]);
      heap.push(2);
      assert.deepEqual(heap.copy(), [2, 1]);
      heap.push(0);
      assert.deepEqual(heap.copy(), [2, 1, 0]);
      heap.push(3);
      assert.deepEqual(heap.copy(), [3, 2, 0, 1]);
    });
    it('peek', () => {
      heap.push(1);
      assert.equal(heap.peek(), 1);
      assert.equal(heap.length, 1);
      heap.push(2);
      assert.equal(heap.peek(), 2);
      assert.equal(heap.length, 2);
    });
    it('shift', () => {
      heap.push(5);
      heap.push(2);
      heap.push(5);
      heap.push(4);
      heap.push(6);
      assert.equal(heap.shift(), 6);
      assert.deepEqual(heap.copy(), [5, 4, 5, 2]);
      assert.equal(heap.shift(), 5);
      assert.deepEqual(heap.copy(), [5, 4, 2]);
      assert.equal(heap.shift(), 5);
      assert.deepEqual(heap.copy(), [4, 2]);
      assert.equal(heap.shift(), 4);
      assert.deepEqual(heap.copy(), [2]);
      assert.equal(heap.shift(), 2);
      assert.deepEqual(heap.copy(), []);
    });
    it('heapify', () => {
      heap.heapify([5, 2, 5, 4, 6]);
      assert.deepEqual(heap.copy(), [6, 5, 5, 4, 2]);
      assert.equal(heap.shift(), 6);
      assert.deepEqual(heap.copy(), [5, 4, 5, 2]);
      assert.equal(heap.shift(), 5);
      assert.deepEqual(heap.copy(), [5, 4, 2]);
      assert.equal(heap.shift(), 5);
      assert.deepEqual(heap.copy(), [4, 2]);
      assert.equal(heap.shift(), 4);
      assert.deepEqual(heap.copy(), [2]);
      assert.equal(heap.shift(), 2);
      assert.deepEqual(heap.copy(), []);
    });
  });

  describe('MinHeap', () => {
    let heap = new BinaryHeap((a, b) => a - b);
    beforeEach(() => {
      heap = new BinaryHeap((a, b) => a - b);
    });
    it('push', () => {
      heap.push(1);
      assert.deepEqual(heap.copy(), [1]);
      heap.push(2);
      assert.deepEqual(heap.copy(), [1, 2]);
      heap.push(0);
      assert.deepEqual(heap.copy(), [0, 2, 1]);
      heap.push(3);
      assert.deepEqual(heap.copy(), [0, 2, 1, 3]);
    });
    it('peek', () => {
      heap.push(1);
      assert.equal(heap.peek(), 1);
      assert.equal(heap.length, 1);
      heap.push(2);
      assert.equal(heap.peek(), 1);
      assert.equal(heap.length, 2);
    });
    it('shift', () => {
      heap.push(5);
      heap.push(2);
      heap.push(5);
      heap.push(4);
      heap.push(6);
      assert.equal(heap.shift(), 2);
      assert.deepEqual(heap.copy(), [4, 5, 5, 6]);
      assert.equal(heap.shift(), 4);
      assert.deepEqual(heap.copy(), [5, 6, 5]);
      assert.equal(heap.shift(), 5);
      assert.deepEqual(heap.copy(), [5, 6]);
      assert.equal(heap.shift(), 5);
      assert.deepEqual(heap.copy(), [6]);
      assert.equal(heap.shift(), 6);
      assert.deepEqual(heap.copy(), []);
    });
    it('heapify', () => {
      heap.heapify([5, 2, 5, 4, 6]);
      assert.deepEqual(heap.copy(), [2, 4, 5, 5, 6]);
      assert.equal(heap.shift(), 2);
      assert.deepEqual(heap.copy(), [4, 5, 5, 6]);
      assert.equal(heap.shift(), 4);
      assert.deepEqual(heap.copy(), [5, 6, 5]);
      assert.equal(heap.shift(), 5);
      assert.deepEqual(heap.copy(), [5, 6]);
      assert.equal(heap.shift(), 5);
      assert.deepEqual(heap.copy(), [6]);
      assert.equal(heap.shift(), 6);
      assert.deepEqual(heap.copy(), []);
    });
    it('clear', () => {
      heap.heapify([5, 2, 5, 4, 6]);
      assert.equal(heap.length, 5);
      heap.clear();
      assert.equal(heap.length, 0);
    });
  });
});