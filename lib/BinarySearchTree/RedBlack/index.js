'use strict';

const { inOrderIterator, search } = require('../index.js');

const BLACK = 0;
const RED = 1;

class RedBlackTree {
  #root = null;
  #size = 0;

  #node(value, parent, color = RED) {
    return { parent, value, color, left: null, right: null };
  }

  #uncle(node) {
    const grandparent = node.parent.parent;
    return grandparent.left === node.parent ?
      grandparent.right : grandparent.left;
  }

  #isBlack(node) {
    return node === null || node.color === BLACK;
  }

  #branch(parent, node) {
    return parent.left === node ? "left" : "right";
  }

  #sibling(parent, node) {
    return parent.left === node ? "right" : "left";
  }

  #pgpRotation(node) {
    const parent = node.parent;
    const grandparent = parent.parent;
    const subtree = grandparent.parent;
    parent.color = BLACK;
    grandparent.color = RED;
    if (subtree === null) this.#root = parent;
    else subtree[this.#branch(subtree, grandparent)] = parent;
    parent.parent = grandparent.parent;
    grandparent.parent = parent;
    const siblingBranch = this.#sibling(parent, node);
    const sibling = parent[siblingBranch];
    grandparent[this.#branch(grandparent, parent)] = sibling;
    parent[siblingBranch] = grandparent;
    if (sibling !== null) sibling.parent = grandparent;
  }

  #npRotation(node) {
    const parentBranch = this.#branch(node.parent.parent, node.parent);
    const nodeBranch = this.#branch(node.parent, node);
    if (parentBranch === nodeBranch) return node;
    const parent = node.parent;
    const nodeChild = node[parentBranch];
    parent.parent[parentBranch] = node;
    node[parentBranch] = parent;
    node.parent = parent.parent;
    parent.parent = node;
    parent[nodeBranch] = nodeChild;
    if (nodeChild !== null) nodeChild.parent = parent;
    return parent;
  }

  insert(value) {
    if (this.#root === null) {
      this.#size++;
      this.#root = this.#node(value, null, BLACK);
      return true;
    }
    let node = this.#root;
    while (true) {
      if (value < node.value) {
        if (node.left === null) {
          node = node.left = this.#node(value, node);
          break;
        }
        node = node.left;
        continue;
      }
      if (value > node.value) {
        if (node.right === null) {
          node = node.right = this.#node(value, node);
          break;
        }
        node = node.right;
        continue;
      }
      return false;
    }
    this.#size++;
    while (node.parent !== null && node.parent.color === RED) {
      const uncle = this.#uncle(node);
      if (this.#isBlack(uncle)) {
        node = this.#npRotation(node);
        this.#pgpRotation(node);
        break;
      } else {
        const parent = node.parent;
        const grandparent = parent.parent;
        parent.color = BLACK;
        uncle.color = BLACK;
        grandparent.color = RED;
        node = grandparent;
      }
    }
    this.#root.color = BLACK;
  }

  [Symbol.iterator]() {
    return inOrderIterator(this.#root);
  }

  search(value) {
    return search(this.#root, value);
  }

  has(value) {
    return this.search(value) !== null;
  }

  [Symbol.iterator]() {
    return inOrderIterator(this.#root);
  }

  get height() {
    if (this.#root === null) return -1;
    return this.#root.height;
  }

  get size() {
    return this.#size;
  }

  get min() {
    if (this.#root === null) return;
    let node = this.#root;
    while (node.left !== null) node = node.left;
    return node.value;
  }

  get max() {
    if (this.#root === null) return;
    let node = this.#root;
    while (node.right !== null) node = node.right;
    return node.value;
  }

  static red = RED;
  static black = BLACK;
}

module.exports = RedBlackTree;
