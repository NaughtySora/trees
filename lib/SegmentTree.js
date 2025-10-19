'use strict';

const {
  reflection: { isObject },
  array: { valid: isArray },
  misc,
  iterator
} = require("naughty-util");

const copyInterface = obj => {
  const output = {};
  for (const name in obj) {
    if (!Object.hasOwn(obj, name) || typeof obj[name] !== "function") continue;
    output[name] = obj[name].bind(obj);
  }
  return output;
};

class SegmentTree {
  #root = null;
  #aggregation = null;
  #tree = null;
  #meta = [];

  constructor(array, aggregation) {
    this.#root = Object.freeze(array.slice(0));
    this.#aggregation = aggregation;
    this.#fill();
  }

  #insert(el, stack) {
    const root = this.#root;
    const start = el[0];
    if (start === el[1]) {
      stack.push([start]);
      this.#tree.push([start]);
      this.#meta.push(this.#aggregation([root[start]]));
    } else {
      stack.push(el);
      this.#tree.push(el);
      this.#meta.push(this.#aggregation(
        root.slice(start, el[1] + 1),
      ));
    }
  }

  #fill() {
    const root = this.#root;
    this.#tree = [[0, root.length - 1]];
    this.#meta = [this.#aggregation(root)];
    const stack = [[0, root.length - 1]];
    while (stack.length > 0) {
      const next = stack.shift();
      if (next[1] === undefined) continue;
      const middle = Math.floor((next[0] + next[1]) / 2);
      this.#insert([next[0], middle], stack);
      this.#insert([middle + 1, next[1]], stack);
    }
  }

  #overlap(node, from, to) {
    if (node === undefined) return false;
    return node[0] <= to && (node[1] ?? node[0]) >= from;
  }

  #subRange(node, from, to) {
    if (node === undefined) return false;
    const valid = misc.inRange(node[0], from, to);
    if (!valid) return false;
    if (node[1] !== undefined) {
      return valid && misc.inRange(node[1], from, to);
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
    const size = tree.length - 1;
    while (stack.length > 0) {
      const index = stack.pop();
      const node = tree[index];
      if (node[0] === from && node[1] === to) {
        values = null;
        stack = null;
        return this.#meta[index];
      }
      if (this.#subRange(node, from, to)) {
        values.push(this.#meta[index]);
        continue;
      }
      if (this.#overlap(node, from, to)) {
        const left = index * 2 + 1;
        const right = left + 1;
        if (left <= size) stack.push(left);
        if (right <= size) stack.push(right);
      }
    }
    return this.#aggregation(values);
  }

  update(target, value) {
    // find the node with  target, 
    // update all node with target in range
  }

  get tree() {
    return [...this.#tree];
  }
}

module.exports = SegmentTree;