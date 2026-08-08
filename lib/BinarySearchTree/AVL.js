'use strict';

class AVL {
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
}

module.exports = AVL;
