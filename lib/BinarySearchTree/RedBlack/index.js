'use strict';

const { inOrderIterator } = require('../index.js');

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
    while (node.parent.color === RED && node.parent.color === node.color) {
      if (this.#isBlack(this.#uncle(node))) {
        const parent = node.parent;
        const grandparent = parent.parent;
        const subtree = grandparent.parent;
        parent.color = BLACK;
        grandparent.color = RED;
        if (subtree === null) {
          this.#root = parent;
        } else {
          const gSide = subtree.left === grandparent ? "left" : "right";
          subtree[gSide] = parent;
        }
        parent.parent = grandparent.parent;
        grandparent.parent = parent;
        const OppositeNodeSide = parent.left === node ? "right" : "left";
        const parentSide = grandparent.left === parent ? "left" : "right";
        const sibling = parent[OppositeNodeSide];
        grandparent[parentSide] = sibling;
        parent[OppositeNodeSide] = grandparent;
        if (sibling !== null) sibling.parent = grandparent;
        break;
      } else {
        // recoloring bubbles up, can produce chain recoloring/rotation, can't break after first.
        throw 'recoloring is not implemented';
      }
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
