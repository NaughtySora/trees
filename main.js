'use strict';

class NodeLike {
  #root = null;

  #node(value) {
    return { value, left: null, right: null };
  }

  insert(value) {
    if (this.#root === null) return void (this.#root = this.#node(value));
    let queue = [this.#root];
    while (true) {
      const node = queue.shift();
      if (node.left === null) {
        node.left = this.#node(value);
        break;
      }
      if (node.right === null) {
        node.right = this.#node(value);
        break;
      }
      queue.push(node.left, node.right);
    }
    queue = null;
  }

  debug() {
    console.log(this.#root);
  }
}

class ArrayLike {
  // 2i + 1, 2i+2, (i - 1) / 2
  #collection = [];
}

const structures = { node: NodeLike, array: ArrayLike, };

class BinaryTree {
  #representation = null;
  constructor({ structure = "node" } = {}) {
    const Representation = structures[structure];
    this.#representation = new (Representation ?? structures.node);
  }

  insert(value) {
    this.#representation.insert(value);
  }

  debug() {
    this.#representation.debug();
  }
}


const tree = new BinaryTree();

tree.insert(1);
tree.debug();
tree.insert(2);
tree.debug();
tree.insert(3);
tree.debug();
tree.insert(4);
tree.debug();
tree.insert(5);
tree.debug();
tree.insert(6);
tree.debug();
tree.insert(7);
tree.debug();
tree.insert(8);
tree.debug();