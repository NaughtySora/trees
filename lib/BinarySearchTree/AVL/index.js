'use strict';

const { search, inOrderIterator } = require('../index.js');

class AVL {
  #root = null;
  #size = 0;
  #rotation = [
    [this.#rotateRightRight, this.#rotateRightLeft],
    [this.#rotateLeftRight, this.#rotateLeftLeft],
  ];

  #node(value, height = 0) {
    return { value, height, left: null, right: null };
  }

  #height(node) {
    if (node == null) return -1;
    return node.height;
  }

  #rotateRightRight(subtree, parent) {
    const right = subtree.right;
    const rightLeft = right.left;
    right.left = subtree;
    subtree.right = rightLeft;
    if (parent === null) {
      this.#root = right;
    } else {
      parent.left === subtree ?
        parent.left = right :
        parent.right = right;
    }
  }

  #rotateRightLeft(subtree, parent) {
    const right = subtree.right;
    const rightLeft = right.left;
    right.left = rightLeft.right;
    rightLeft.right = right;
    subtree.right = rightLeft.left;
    rightLeft.left = subtree;
    if (parent === null) {
      this.#root = rightLeft;
    } else {
      parent.left === subtree ?
        parent.left = rightLeft :
        parent.right = rightLeft;
    }
  }

  #rotateLeftRight(subtree, parent) {
    const left = subtree.left;
    const leftRight = left.right;
    left.right = leftRight.left;
    leftRight.left = left;
    subtree.left = leftRight;
    subtree.left = leftRight.right;
    leftRight.right = subtree;
    if (parent === null) {
      this.#root = leftRight;
    } else {
      parent.left === subtree ?
        parent.left = leftRight :
        parent.right = leftRight;
    }
  }

  #rotateLeftLeft(subtree, parent) {
    const left = subtree.left;
    const leftRight = left.right;
    left.right = subtree;
    subtree.left = leftRight;
    if (parent === null) {
      this.#root = left;
    } else {
      parent.left === subtree ?
        parent.left = left :
        parent.right = left;
    }
  }

  insert(value) {
    if (this.#root === null) {
      this.#size++;
      this.#root = this.#node(value);
      return true;
    }
    let node = this.#root;
    const traversal = [];
    while (true) {
      if (value < node.value) {
        traversal.push(node);
        if (node.left === null) {
          node.left = this.#node(value, 0);
          break;
        }
        node = node.left;
        continue;
      }
      if (value > node.value) {
        traversal.push(node);
        if (node.right === null) {
          node.right = this.#node(value, 0);
          break;
        }
        node = node.right;
        continue;
      }
      return false;
    }
    this.#size++;
    let k = traversal.length - 1;
    while (k >= 0) {
      const node = traversal[k];
      const left = this.#height(node.left);
      const right = this.#height(node.right);
      node.height = Math.max(left, right) + 1;
      const balanced = Math.abs(left - right);
      if (balanced > 1) {
        const leftHeavy = left > right;
        const child = leftHeavy ? node.left : node.right;
        const side1 = Number(leftHeavy);
        const side2 = Number(this.#height(child.left) > this.#height(child.right));
        this.#rotation[side1][side2]
          .call(this, node, k === 0 ? null : traversal[k - 1]);
        break;
      }
      k--;
    }
    return true;
  }

  delete(value) {
    if (this.#root === null) return false;
    let node = this.#root;
    const traversal = [];
    while (node !== null) {
      if (value === node.value) break;
      traversal.push(node);
      if (value < node.value) node = node.left;
      else if (value > node.value) node = node.right;
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
      const parent = traversal[traversal.length - 1];
      if (parent == null) {
        this.#root = node.right ?? node.left;
      } else {
        const branch = parent.left === node ? "left" : "right";
        parent[branch] = node.right ?? node.left;
      }
    }
    this.#size--;
    let k = 0;
    while (traversal.length > 0) {
      const node = traversal.pop();
      const left = this.#height(node.left);
      const right = this.#height(node.right);
      node.height = Math.max(left, right) + 1;
      const balanced = Math.abs(left - right);
      if (balanced > 1) {
        const leftHeavy = left > right;
        const child = leftHeavy ? node.left : node.right;
        const side1 = Number(leftHeavy);
        const side2 = Number(this.#height(child.left) > this.#height(child.right));
        const parentIndex = traversal.length - 1;
        this.#rotation[side1][side2]
          .call(this, node, parentIndex < 0 ? null : traversal[parentIndex]);
      }
    }
    return true;
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
}

module.exports = AVL;
