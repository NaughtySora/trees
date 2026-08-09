'use strict';

const { search, inOrderIterator } = require('./plain.js');

class AVL {
  #root = null;
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
      return void (this.#root = this.#node(value));
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
      return;
    }
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
}

module.exports = AVL;
