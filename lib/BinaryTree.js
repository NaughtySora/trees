'use strict';

const { misc } = require("naughty-util");
const SLL = require("./SLL.js");

const KINDS = {
  __proto__: null,
  complete: Symbol("kComplete"),
};

class NodeLike {
  #root = null;

  #node(value) {
    return { value, left: null, right: null };
  }

  [KINDS.complete](value) {
    if (this.#root === null) return void (this.#root = this.#node(value));
    const queue = new SLL();
    let node = this.#root;
    while (true) {
      if (node.left === null) {
        node.left = this.#node(value);
        break;
      }
      if (node.right === null) {
        node.right = this.#node(value);
        break;
      }
      queue.push(node.left);
      queue.push(node.right);
      node = queue.shift();
    }
  }

  bft(callback) {
    const queue = [];
    let node = this.#root;
    while (node) {
      callback(node.value);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      node = queue.shift();
    }
  }

  in(callback) {
    const stack = [];
    let node = this.#root;
    while (stack.length > 0 || node !== null) {
      while (node !== null) (stack.push(node), node = node.left);
      node = stack.pop();
      callback(node.value);
      node = node.right;
    }
  }

  pre(callback) {
    const stack = [];
    let node = this.#root;
    while (node) {
      callback(node.value);
      if (node.right !== null) stack.push(node.right);
      node = node.left ?? stack.pop();
    }
  }

  post(callback) {
    const stack = [];
    let node = this.#root;
    let visited = null;
    while (stack.length > 0 || node !== null) {
      while (node !== null) (stack.push(node), node = node.left);
      const { left, right, value } = stack[stack.length - 1];
      if ((left === null && right === null) || visited === right) {
        callback(value);
        visited = stack.pop();
        continue;
      }
      if (visited !== left) node = left;
      if (visited !== right) node = right;
    }
  }

  get root() {
    if (this.#root === null) return;
    return this.#root.value;
  }
}

class ArrayLike {
  #collection = [];

  [KINDS.complete](value) {
    this.#collection.push(value);
  }

  bft(callback) {
    for (const node of this.#collection) {
      callback(node);
    }
  }

  #left(index) {
    return (2 * index) + 1;
  }

  #right(index) {
    return (2 * index) + 2;
  }

  in(callback) {
    let root = 0;
    const stack = [root];
    const tree = this.#collection;
    const size = tree.length - 1;
    while (stack.length > 0 && misc.inRange(root, 0, size)) {
      const left = this.#left(root);
      if (left < size) {
        stack.push(root = left);
        continue;
      }
      const index = stack.pop();
      callback(tree[index]);
      const right = this.#right(index);
      if (right > size) continue;
      stack.push(right);
      root = right;
    }
  }

  pre(callback) {
    let root = 0;
    const stack = [root];
    const tree = this.#collection;
    const size = tree.length - 1;
    while (stack.length > 0 && misc.inRange(root, 0, size)) {
      callback(tree[root]);
      const right = this.#right(root);
      if (right <= size) stack.push(right);
      const left = this.#left(root);
      root = left <= size ? left : stack.pop();
    }
  }

  post(callback) {
    let root = 0;
    const stack = [];
    const tree = this.#collection;
    const size = tree.length - 1;
    let visited = root;
    while (stack.length > 0 || misc.inRange(root, 0, size)) {
      while (root <= size) (stack.push(root), root = this.#left(root));
      const last = stack[stack.length - 1];
      const right = this.#right(last);
      const left = this.#left(last);
      if ((right > size && left > size) || visited === right) {
        callback(tree[last]);
        visited = stack.pop();
        continue;
      }
      if (left !== visited) root = left;
      if (right !== visited) root = right;
    }
  }

  get root() {
    return this.#collection[0];
  }
}

class BinaryTree {
  #tree = null;
  #kind = KINDS.complete;

  constructor({ representation = "node", kind = "complete" } = {}) {
    this.#tree = new (BinaryTree.#variants[representation] ?? NodeLike);
    this.#kind = KINDS[kind] ?? KINDS.complete;
  }

  insert(value) {
    this.#tree[this.#kind](value);
  }

  pre(callback) {
    this.#tree.pre(callback);
  }

  in(callback) {
    this.#tree.in(callback);
  }

  post(callback) {
    this.#tree.post(callback);
  }

  bft(callback) {
    this.#tree.bft(callback);
  }

  get root() {
    return this.#tree.root;
  }

  static #variants = {
    __proto__: null,
    node: NodeLike,
    array: ArrayLike,
  };
}

module.exports = BinaryTree;