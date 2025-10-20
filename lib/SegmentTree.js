'use strict';

const { misc, } = require("naughty-util");

class SegmentTree {
  #root = null;
  #aggregation = null;
  #tree = null;

  constructor(array, aggregation) {
    this.#root = Object.freeze(array.slice(0));
    this.#aggregation = aggregation;
    this.#build();
  }

  *#range(from, to = from) {
    const root = this.#root;
    while (from <= to) yield root[from++];
  }

  #build() {
    const agg = this.#aggregation;
    const root = this.#root;
    const last = root.length - 1;
    const tree = this.#tree = new Map();
    const stack = [[0, 0, last]];
    while (stack.length > 0) {
      const { 0: index, 1: left, 2: right } = stack.pop();
      const single = left === right;
      const range = single ? [left] : [left, right];
      tree.set(index, { range, meta: agg(this.#range(...range)), });
      if (single) continue;
      const mid = Math.floor((left + right) / 2);
      stack.push([index * 2 + 2, mid + 1, right]);
      stack.push([index * 2 + 1, left, mid]);
    }
  }

  #overlap(range, from, to) {
    if (range === undefined) return false;
    return range[0] <= to && (range[1] ?? range[0]) >= from;
  }

  #subRange(range, from, to) {
    if (range === undefined) return false;
    const valid = misc.inRange(range[0], from, to);
    if (!valid) return false;
    if (range[1] !== undefined) {
      return valid && misc.inRange(range[1], from, to);
    }
    return valid;
  }

  select(from, to) {
    const max = this.#root.length - 1;
    if (to === undefined || to > max) to = max;
    if (from < 0 || !Number.isInteger(from)) {
      throw new Error('from has to be positive integer');
    }
    const tree = this.#tree;
    let stack = [0];
    let values = [];
    while (stack.length > 0) {
      const index = stack.pop();
      const node = tree.get(index);
      const range = node.range;
      if (range[0] === from && range[1] === to) {
        values = stack = null;
        return node.meta;
      }
      if (this.#subRange(range, from, to)) {
        values.push(node.meta);
        continue;
      }
      if (this.#overlap(range, from, to)) {
        const left = index * 2 + 1;
        stack.push(left, left + 1);
      }
    }
    return this.#aggregation(values);
  }

  range(index) {
    const node = this.#tree.get(index);
    if (node === undefined) return null;
    return node.range;
  }

  meta(index) {
    const node = this.#tree.get(index);
    if (node === undefined) return null;
    return node.meta;
  }

  update(target, value) {
    // find the node with  target, 
    // update all node with target in range
  }
}

module.exports = SegmentTree;
