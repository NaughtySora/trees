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
  #in(callback) {
    const stack = [];
    let node = this.#root;
    while (stack.length > 0 || node !== null) {
      while (node !== null) (stack.push(node), node = node.left);
      node = stack.pop();
      callback(node.value);
      node = node.right;
    }
  }
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

  dft(method, callback) {
    if (typeof callback !== "function") {
      throw new Error('dft requires a callback');
    }
    if (!Object.hasOwn(this.#traversal, method)) return;
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