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
  #aggregations = null;
  #meta = null;
  constructor(array, aggregations) {
    if (!isArray(array)) {
      throw new Error('array is required with at least 1 value');
    }
    if (!isObject(aggregations)) {
      throw new Error('aggregation api is required');
    }
    this.#root = Object.freeze(array.slice(0));
    this.#aggregations = copyInterface(aggregations);
    this.#fill();
  }

  #fill() {

  }

  select(value) {

  }

  update(target, value) {
    // find the node with  target, update all node with target in range
  }
}

module.exports = SegmentTree;
