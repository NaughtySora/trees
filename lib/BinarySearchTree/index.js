'use strict';

const { reflection } = require("naughty-util");

// Balanced BST ideas: rotations, maintaining.

/**
 * @description
 * - Node like representation
 * - Duplicated policy - Skip duplicated
 * - Deleting policy - Use Successor
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

  delete(value) {
    if (this.#root === null) return false;
    let parent = null;
    let node = this.#root;
    let branch;
    while (node !== null) {
      const prev = node;
      if (value < node.value) {
        node = node.left;
        branch = 'left';
        parent = prev;
      } else if (value > node.value) {
        node = node.right;
        branch = 'right';
        parent = prev;
      } else {
        break;
      }
    }
    if (node === null) return false;
    const noLeft = node.left === null;
    const noRight = node.right === null;
    if (!noLeft && !noRight) {
      let successor = null;
      let smallest = node.right;
      while (smallest.left !== null) {
        successor = smallest;
        smallest = smallest.left;
      }
      node.value = smallest.value;
      if (successor === null) node.right = smallest.right;
      else successor.left = smallest.right;
    } else {
      if (parent === null) this.#root = node.right ?? node.left;
      else parent[branch] = node.right ?? node.left;
    }
    return true;
  }

  /** in order */
  [Symbol.iterator]() {
    let node = this.#root;
    const stack = [];
    return {
      next() {
        if (stack.length === 0 && node === null) {
          return { value: undefined, done: true };
        }
        while (node !== null) (stack.push(node), node = node.left);
        node = stack.pop();
        const result = { value: node.value, done: false };
        node = node.right;
        return result;
      }
    }
  }

  get debug() {
    return this.#root;
  }
}

const payload = [8, 3, 1, 6, 4, 7, 10, 14];
const tree = new BinarySearchTree();
payload.forEach(x => tree.insert(x));


const test = new Map();
payload.forEach(x => {
  const tree = new BinarySearchTree();
  payload.forEach(y => tree.insert(y));
  tree.delete(x);
  test.set(x, [...tree]);
});
console.log(test);