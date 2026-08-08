'use strict';

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
    console.log('right-right');
  }

  #rotateRightLeft(subtree, parent) {
    console.log('right-left');
  }

  #rotateLeftRight(subtree, parent) {
    const B = subtree.left;
    const C = B.right;
    B.right = C.left;
    C.left = B;
    subtree.left = C;
    const E = C.right;
    subtree.left = E;
    C.right = subtree;
    if (parent === null) {
      this.#root = C;
    } else {
      parent.left === subtree ?
        parent.left = C :
        parent.right = C;
    }
  }

  #rotateLeftLeft(subtree, parent) {
    console.log('left-left');
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
    let k = 0;
    while (k < traversal.length) {
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
        throw '';
      }
      k++;
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
