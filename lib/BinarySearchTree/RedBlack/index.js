'use strict';

const { inOrderIterator, search } = require('../index.js');

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

  #branch(parent, node) {
    return parent.left === node ? "left" : "right";
  }

  #sibling(parent, node) {
    return parent.left === node ? "right" : "left";
  }

  #pgpRotation(node) {
    const parent = node.parent;
    const grandparent = parent.parent;
    const subtree = grandparent.parent;
    parent.color = BLACK;
    grandparent.color = RED;
    if (subtree === null) this.#root = parent;
    else subtree[this.#branch(subtree, grandparent)] = parent;
    parent.parent = grandparent.parent;
    grandparent.parent = parent;
    const siblingBranch = this.#sibling(parent, node);
    const sibling = parent[siblingBranch];
    grandparent[this.#branch(grandparent, parent)] = sibling;
    parent[siblingBranch] = grandparent;
    if (sibling !== null) sibling.parent = grandparent;
  }

  #npRotation(node) {
    const parentBranch = this.#branch(node.parent.parent, node.parent);
    const nodeBranch = this.#branch(node.parent, node);
    if (parentBranch === nodeBranch) return node;
    const parent = node.parent;
    const nodeChild = node[parentBranch];
    parent.parent[parentBranch] = node;
    node[parentBranch] = parent;
    node.parent = parent.parent;
    parent.parent = node;
    parent[nodeBranch] = nodeChild;
    if (nodeChild !== null) nodeChild.parent = parent;
    return parent;
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
    while (node.parent !== null && node.parent.color === RED) {
      const uncle = this.#uncle(node);
      if (this.#isBlack(uncle)) {
        node = this.#npRotation(node);
        this.#pgpRotation(node);
        break;
      } else {
        const parent = node.parent;
        const grandparent = parent.parent;
        parent.color = BLACK;
        uncle.color = BLACK;
        grandparent.color = RED;
        node = grandparent;
      }
    }
    this.#root.color = BLACK;
  }

  delete(value) {
    if (this.#root === null) return false;
    let node = this.#root;
    let moved = null;
    while (node !== null) {
      if (value === node.value) break;
      if (value < node.value) node = node.left;
      else if (value > node.value) node = node.right;
    }
    if (node === null) return false;
    if (node.left !== null && node.right !== null) {
      let successor = node.right;
      while (successor.left !== null) successor = successor.left;
      const successorParent = successor.parent;
      const parent = node.parent;
      moved = successor.right;
      if (parent === null) this.#root = successor;
      else parent[this.#branch(parent, node)] = successor;
      successor.left = node.left;
      node.left.parent = successor;
      if (successorParent !== null && successorParent !== node) {
        if (successor.right !== null) {
          successorParent.left = successor.right;
          successor.right.parent = successorParent;
        } else {
          successorParent.left = null;
        }
      }
      if (node.right !== successor) {
        successor.right = node.right;
        node.right.parent = successor;
      }
    } else {
      const parent = node.parent
      if (parent === null) {
        this.#root = moved = node.right ?? node.left;
      } else {
        (parent[this.#branch(parent, node)]
          = moved = node.right ?? node.left);
        if (moved !== null) node.parent = parent;
      }
    }
    if (node.color === RED) return true;
    if (moved === null) {
      // you need some way to know its parent during fixup. 
    }
    // 1. removed was black and moved is red then make moved black and exit.
    // 2. removed is black and moved is null, inspect the sibling:
    // 2.1 sibling is red - rotate moved branch around moved parent
    // and recolor sibling red to black, parent black to red
    // we continue with case 2.2
    /**
     * 
     *       10B                    20B
            /   \                  /   \
         moved   20R     ->      10R   30B
                / \              /  \
              15B 30B         moved  15B
     */
    // 2.2. sibling is black, both of its children are black,
    // recolor the sibling to red
    /**
     *       10B
            /   \
         moved   20B  -> 20R
                /   \
              15B    30B
     */
    // move problem upward, moved = 10.
    // look at moved.parent.parent if its root, exit
    // ??
    // 3. sibling is black, near (moved side - left) child is red, 
    // far (right, not moved side) child is black.
    /**
     *       10B                    
            /   \
         moved    20B 
                /   \
              15R    30B
     */
    // rotate
    /**
     *       10B
            /   \
         moved    15R -> recolor 15B
                   \
                   20B -> 20R
                     \
                     30B
     */
    // 4. sibling black, far child red
    /**
     *       10B
            /   \
         moved  15B
                   \
                   20R
                     \
                     30B
     */
    // rotate
    /**
     *       10B                    15B
            /   \                  /   \
         moved   15B      ->     10B   20B
                  \               /     \
                  20R         moved     30B
                    \
                    30B
     */

    // so if removed node had child, then moved is real node.
    // or if its null, node was a leaf

    // moved can be null only if delete target had 0 children

    //! stop here for a while
  }

  [Symbol.iterator]() {
    return inOrderIterator(this.#root);
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

  static red = RED;
  static black = BLACK;
}

const tree = new RedBlackTree();
tree.insert(10);
tree.insert(15);
tree.insert(12);
tree.delete(10);

module.exports = RedBlackTree;
