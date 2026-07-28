'use strict';

const CHILDREN_OFFSET = 2;

function swap(a, b) {
  [this[b], this[a]] = [this[a], this[b]];
}

class BinaryHeap {
  #tree = [];
  #compare = null;

  constructor(compare) {
    if (typeof compare !== "function") {
      throw new Error("Binary heap requires a compare function");
    }
    this.#compare = compare;
  }

  #parent(index) {
    return Math.floor((index - 1) / CHILDREN_OFFSET);
  }

  #lift(index) {
    if (index == 0) return;
    const tree = this.#tree;
    const stack = [[index, this.#parent(index)]];
    while (stack.length > 0) {
      const members = stack.pop();
      const target = members[0];
      const parent = members[1];
      if (this.#compare(tree[target], tree[parent]) < 0) {
        swap.call(tree, target, parent);
        if (parent === 0) continue;
        stack.push([parent, this.#parent(parent)]);
      }
    }
  }

  #sink(parent) {
    const stack = [parent];
    const tree = this.#tree;
    while (stack.length > 0) {
      const parent = stack.pop();
      const left = (parent * CHILDREN_OFFSET) + 1;
      if (left >= tree.length) continue;
      const right = left + 1;
      const vLeft = tree[left];
      const vRight = tree[right] ?? vLeft;
      const child = this.#compare(vLeft, vRight) < 0 ? vLeft : vRight;
      if (this.#compare(tree[parent], child) > 0) {
        const index = child === vLeft ? left : right;
        swap.call(tree, index, parent);
        stack.push(index);
      }
    }
  }

  insert(value) {
    const index = this.#tree.length;
    this.#tree.push(value);
    this.#lift(index);
  }

  extract() {
    if (this.#tree.length === 0) return;
    const tree = this.#tree;
    const length = tree.length;
    const last = length - 1;
    if (last === 0) return tree.pop();
    swap.call(tree, last, 0);
    const root = tree.pop();
    this.#sink(0);
    return root;
  }

  peek() {
    return this.#tree[0];
  }

  heapify(list) {
    const tree = this.#tree = this.#tree.concat(list);
    let i = Math.floor((tree.length - CHILDREN_OFFSET) / CHILDREN_OFFSET);
    while (i >= 0) this.#sink(i--);
  }

  copy() {
    return [...this.#tree];
  }

  clear() {
    this.#tree.length = 0;
  }

  get length() {
    return this.#tree.length;
  }
}

module.exports = BinaryHeap;
