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

  #toLeft(index) {
    if (index == 0) return;
    const tree = this.#tree;
    const stack = [[index, this.#parent(index)]];
    while (stack.length > 0) {
      const members = stack.pop();
      const target = members[0];
      const parent = members[1];
      if (this.#compare(tree[target], tree[parent]) < 0) {
        swap.call(tree, target, parent);
        stack.push([parent, this.#parent(parent)]);
      }
    }
  }

  #toRight(index) {
    const left = (index * CHILDREN_OFFSET) + 1;
    const tree = this.#tree;
    if (left >= tree.length) return;
    const right = left + 1;
    const vLeft = tree[left];
    const vRight = tree[right] ?? vLeft;
    const child = this.#compare(vLeft, vRight) < 0 ? vLeft : vRight;
    if (this.#compare(tree[index], child) > 0) {
      const i = child === vLeft ? left : right;
      swap.call(tree, i, index);
      this.#toRight(i);
    }
  }

  push(value) {
    const index = this.#tree.length;
    this.#tree.push(value);
    this.#toLeft(index);
  }

  shift() {
    const tree = this.#tree;
    const { length } = tree;
    if (length === 0) return;
    const last = length - 1;
    if (last === 0) return tree.pop();
    [tree[0], tree[last]] = [tree[last], tree[0]];
    const first = tree.pop();
    this.#toRight(0);
    return first;
  }

  peek() {
    return this.#tree[0];
  }

  heapify(list) {
    const tree = this.#tree = this.#tree.concat(list);
    let i = Math.floor((tree.length - CHILDREN_OFFSET) / CHILDREN_OFFSET);
    while (i >= 0) this.#toRight(i--);
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
