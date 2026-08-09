'use strict';

const { inOrderIterator } = require('../index.js');

class RedBlackTree {
  #root = null;
  #size = 0;

  #node(value, color = 1) {
    return { value, color, left: null, right: null };
  }

  #color(node) {
    return node.color === 0 ? "black" : "red";
  }

  insert(value) {
    if (this.#root === null) {
      this.#size++;
      this.#root = this.#node(value, 0);
      return true;
    }
    let node = this.#root;
    const traversal = [];
    while (true) {
      if (value < node.value) {
        traversal.push(node);
        if (node.left === null) {
          node = node.left = this.#node(value);
          break;
        }
        node = node.left;
        continue;
      }
      if (value > node.value) {
        traversal.push(node);
        if (node.right === null) {
          node = node.right = this.#node(value);
          break;
        }
        node = node.right;
        continue;
      }
      return false;
    }
    this.#size++;
    const parent = traversal[traversal.length - 1];

    
    while (parent.color === 1 && parent.color === node.color) {
      
      break;
    }
  }

  [Symbol.iterator]() {
    return inOrderIterator(this.#root);
  }

}

const tree = new RedBlackTree();

tree.insert(10);
tree.insert(5);
tree.insert(1);


module.exports = { RedBlackTree };
