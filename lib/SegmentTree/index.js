'use strict';

const { misc: { inRange }, } = require("naughty-util");

const CHILDREN_OFFSET = 2;

class SegmentTree {
  #root = null;
  #aggregation = null;
  #tree = null;

  constructor(array, aggregation) {
    if (typeof aggregation !== "function") {
      throw new Error("Segment Tree requires an aggregation function");
    }
    this.#root = array.slice(0);
    this.#aggregation = aggregation;
    this.#build();
  }

  *#range(from, to = from) {
    const root = this.#root;
    while (from <= to) yield root[from++];
  }

  #left(index) {
    return (2 * index) + 1;
  }

  #right(index) {
    return (2 * index) + 2;
  }

  #build() {
    const agg = this.#aggregation;
    const root = this.#root;
    const last = root.length - 1;
    const tree = this.#tree = new Map();
    const stack = [[0, 0, last]];
    while (stack.length > 0) {
      const { 0: parent, 1: start, 2: end } = stack.pop();
      const single = start === end;
      const range = single ? [start] : [start, end];
      tree.set(parent, { range, meta: agg(this.#range(...range)), });
      if (single) continue;
      const middle = Math.floor((start + end) / 2);
      stack.push([this.#right(parent), middle + 1, end]);
      stack.push([this.#left(parent), start, middle]);
    }
  }

  #overlap(range, from, to) {
    return range[0] <= to && (range[1] ?? range[0]) >= from;
  }

  #subRange(range, from, to) {
    const starts = inRange(range[0], from, to);
    if (!starts) return false;
    if (range.length > 1) return inRange(range[1], from, to);
    return true;
  }

  select(from, to) {
    if (from < 0 || !Number.isInteger(from)) {
      throw new Error('from has to be positive integer');
    }
    const length = this.#root.length - 1;
    if (to === undefined || to > length) to = length;
    const tree = this.#tree;
    let stack = [0];
    let result = [];
    while (stack.length > 0) {
      const index = stack.pop();
      const node = tree.get(index);
      const range = node.range;
      if (range[0] === from && range[1] === to) return node.meta;
      if (this.#subRange(range, from, to)) {
        result.push(node.meta);
        continue;
      }
      if (this.#overlap(range, from, to)) {
        const left = this.#left(index);
        stack.push(left, left + 1);
      }
    }
    return this.#aggregation(result);
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

  update(index, value) {
    if (!inRange(index, 0, this.#root.length - 1)) return;
    this.#root[index] = value;
    const tree = this.#tree;
    const stack = [];
    let i = 0;
    while (true) {
      const node = tree.get(i);
      const range = node.range;
      const left = range[0];
      if (range.length === 1 && index === left) {
        stack.push([i, node]);
        break;
      }
      if (inRange(index, left, range[1] ?? left)) {
        stack.push([i, node]);
      }
      i++;
    }
    const agg = this.#aggregation;
    const leaf = stack.pop();
    leaf[1].meta = value;
    while (stack.length > 0) {
      const node = stack.pop();
      const left = tree.get(this.#left(node[0]));
      const right = tree.get(this.#right(node[0]));
      if (left === undefined || right === undefined) continue;
      node[1].meta = agg([left.meta, right.meta]);
    }
  }
}

module.exports = SegmentTree;
