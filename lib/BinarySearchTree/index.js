'use strict';

const { reflection } = require("naughty-util");

const search = (root, value) => {
  if (root === null) return null;
  while (root !== null) {
    if (value < root.value) root = root.left;
    else if (value > root.value) root = root.right;
    else return root;
  }
  return null;
};

const inOrderIterator = root => {
  const stack = [];
  return {
    next() {
      if (stack.length === 0 && root === null) {
        return { value: undefined, done: true };
      }
      while (root !== null) (stack.push(root), root = root.left);
      root = stack.pop();
      const result = { value: root.value, done: false };
      root = root.right;
      return result;
    }
  }
};

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
    return search(this.#root, value);
  }

  has(value) {
    return this.search(value) !== null;
  }

  delete(value) {
    if (this.#root === null) return false;
    let parent = null;
    let node = this.#root;
    while (node !== null) {
      const successor = node;
      if (value < node.value) {
        node = node.left;
        parent = successor;
      } else if (value > node.value) {
        node = node.right;
        parent = successor;
      } else {
        break;
      }
    }
    if (node === null) return false;
    if (node.left !== null && node.right !== null) {
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
      else {
        const branch = parent.left === node ? "left" : "right";
        parent[branch] = node.right ?? node.left;
      }
    }
    return true;
  }

  [Symbol.iterator]() {
    return inOrderIterator(this.#root);
  }
}

module.exports = { BinarySearchTree, search, inOrderIterator };
