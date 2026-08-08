'use strict';

class AVL {
  #root = null;

  #node(value, height = 0) {
    return { value, height, left: null, right: null };
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
    while (traversal.length > 0) {
      const node = traversal.pop();
      const left = node.left ? node.left.height : -1;
      const right = node.right ? node.right.height : -1;
      node.height = Math.max(left, right) + 1;
      if (Math.abs(left - right) > 1) {
        // fix here
      }
    }
  }

  get debug() {
    return this.#root;
  }
}

const tree = new AVL();

tree.insert(23);
tree.insert(1);
tree.insert(6);
tree.insert(-3);
tree.insert(9);
tree.insert(7);
tree.insert(15);
tree.insert(4);
tree.insert(2);
tree.insert(13);
console.dir(tree.debug, { depth: 10 });
`
      23
     /  
    1   
   / \
 -3   6
     / \
    4   9
   /   / \
  2   7   15
          /
        13
`


module.exports = AVL;
