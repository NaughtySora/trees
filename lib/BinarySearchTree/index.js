'use strict';

const { reflection } = require("naughty-util");
// BST operations: insert, search, delete, traversal. 
// Balanced BST ideas: rotations, maintaining.
/**
 * skip duplicated policy
 */
class BinarySearchTree {
  #root = null;

  #node(value) {
    return { value, left: null, right: null };
  }

  insert(value) {
    if (this.#root === null) {
      return void (this.#root = this.#node(value));
    }
    let node = this.#root;
    while (true) {
      if (value < node.value) {
        if (node.left === null) {
          return void (node.left = this.#node(value));
        }
        node = node.left;
        continue;
      }
      if (value > node.value) {
        if (node.right === null) {
          return void (node.right = this.#node(value));
        }
        node = node.right;
        continue;
      }
      break;
    }
  }

  search(value) {
    if (this.#root === null) return null;
    let node = this.#root;
    while (node !== null) {
      if (value < node.value) node = node.left;
      else if (value > node.value) node = node.right;
      else return node;
    }
    return null;
  }

  has(value) {
    return this.search(value) !== null;
  }

  [Symbol.iterator]() {

  }

  get debug() {
    return this.#root;
  }
}

const payload = [8, 3, 1, 6, 4, 7, 10, 14];
const tree = new BinarySearchTree();
payload.forEach(x => tree.insert(x));
// reflection.inspect(tree.debug);
const n0 = tree.search(1);
const h0 = tree.has(1);
console.log(n0, h0);
const n1 = tree.search(2);
const h1 = tree.has(2);
console.log(n1, h1);
const n2 = tree.search(10);
const h2 = tree.has(10);
console.log(n2, h2);

