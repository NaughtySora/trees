'use strict';

class NodeLike {
  #root = null;

  #node(value) {
    return { value, left: null, right: null };
  }

  insert(value) {
    if (this.#root === null) return void (this.#root = this.#node(value));
    let queue = [this.#root];
    // making queue with linkedlist to shift with no reindexing
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

  bft() { }
  //sort, bst
  #in() { }
  // copy, build, serialize
  #pre(callback) {
    const stack = [];
    let node = this.#root;
    while (node) {
      callback(node.value);
      if (node.right !== null) stack.push(node.right);
      node = node.left ?? stack.pop();
    }
  }
  //delete, aggregate, evaluate
  #post() { }
  //     1
  //    / \
  //   2   3
  //  / \
  // 4   5
  dft(method, callback) {
    this.#traversal[method].call(this, callback);
  }

  debug() {
    console.log(this.#root);
  }

  #traversal = { pre: this.#pre, in: this.#in, post: this.#post };
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

  dft(method, callback) {
    this.#representation.dft(method, callback);
  }
}


const tree = new BinaryTree();

// tree.insert(1);
// tree.debug();
// tree.insert(2);
// tree.debug();
// tree.insert(3);
// tree.debug();
// tree.insert(4);
// tree.debug();
// tree.insert(5);
// tree.debug();
// tree.insert(6);
// tree.debug();
// tree.insert(7);
// tree.debug();
// tree.insert(8);
// tree.debug();

tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.dft('pre', console.log);