'use strict';

const {
  reflection: { isObject },
  array: { valid: isArray }
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
      this.#tree.push(this.#aggregation([root[start]]));
    } else {
      stack.push(el);
      this.#tree.push(this.#aggregation(
        root.slice(start, el[1] + 1),
      ));
    }
  }

  #fill() {
    const root = this.#root;
    this.#tree = [this.#aggregation(root)];
    const stack = [[0, root.length - 1]];
    while (stack.length > 0) {
      const next = stack.shift();
      if (next[1] === undefined) continue;
      const middle = Math.floor((next[0] + next[1]) / 2);
      this.#insert([next[0], middle], stack);
      this.#insert([middle + 1, next[1]], stack);
    }
  }

  select(range) {

  }

  update(target, value) {
    // find the node with  target, 
    // update all node with target in range
  }
}

module.exports = SegmentTree;