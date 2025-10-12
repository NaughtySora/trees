'use strict';

const SLL = require("./lib/SLL.js");

class NodeLike {
  #root = null;

  #node(value) {
    return { value, left: null, right: null };
  }

  insert(value) {
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

  debug() {
    console.log(this.#root);
  }
}

// 2i + 1, 2i+2, (i - 1) / 2
class ArrayLike {
  #collection = [];

  insert(value) {
    this.#collection.push(value);
  }

  bft(callback) {
    for (const node of this.#collection) {
      callback(node);
    }
  }

  in(callback) {

  }

  pre(callback) {

  }

  post(callback) {

  }

  debug() {
    console.log(this.#collection);
  }
}

class BinaryTree {
  #tree = null;

  constructor({ representation = "node" } = {}) {
    this.#tree = new (BinaryTree.#variants[representation] ?? NodeLike);
  }

  insert(value) {
    this.#tree.insert(value);
  }

  debug() {
    this.#tree.debug();
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

  static #variants = {
    __proto__: null,
    node: NodeLike,
    array: ArrayLike,
  };
}

module.exports = BinaryTree;