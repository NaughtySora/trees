'use strict';

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const BinaryTree = require("../main");

describe("BinaryTree", () => {
  describe("NodeLike", () => {
    it("insert", () => {
      const tree = new BinaryTree();
      const values = [1, 2, 3];
      values.forEach((v) => tree.insert(v));
      const pre = [];
      tree.pre(v => pre.push(v));
      assert.deepEqual(pre, values);
    });

    describe("pre-order traversal", () => {
      it('filling', () => {
        const tree = new BinaryTree();
        const values = [10, 5, 15, 3, 7, 12, 18];
        values.forEach(v => tree.insert(v));
        const result = [];
        tree.pre(v => result.push(v));
        assert.deepEqual(result, [10, 5, 3, 7, 15, 12, 18]);
      });

      it('one', () => {
        const tree = new BinaryTree();
        tree.insert(42);
        const result = [];
        tree.pre(v => result.push(v));
        assert.deepEqual(result, [42]);
      });

      it('empty', () => {
        const tree = new BinaryTree();
        const result = [];
        tree.pre(v => result.push(v));
        assert.deepEqual(result, []);
      });
    });

    describe("in-order traversal", () => {
      it('filling', () => {
        const tree = new BinaryTree();
        const values = [4, 2, 6, 1, 3, 5, 7];
        values.forEach(v => tree.insert(v));
        const result = [];
        tree.in(v => result.push(v));
        assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7]);
      });

      it('one', () => {
        const tree = new BinaryTree();
        tree.insert(42);
        const result = [];
        tree.in(v => result.push(v));
        assert.deepEqual(result, [42]);
      });

      it('empty', () => {
        const tree = new BinaryTree();
        const result = [];
        tree.in(v => result.push(v));
        assert.deepEqual(result, []);
      });
    });

    describe("post-order traversal", () => {
      it('filling', () => {
        const tree = new BinaryTree();
        const values = [8, 4, 12, 2, 6, 10, 14];
        values.forEach(v => tree.insert(v));
        const result = [];
        tree.post(v => result.push(v));
        assert.deepEqual(result, [2, 6, 4, 10, 14, 12, 8]);
      });

      it('one', () => {
        const tree = new BinaryTree();
        tree.insert(42);
        const result = [];
        tree.post(v => result.push(v));
        assert.deepEqual(result, [42]);
      });

      it('empty', () => {
        const tree = new BinaryTree();
        const result = [];
        tree.post(v => result.push(v));
        assert.deepEqual(result, []);
      });
    });

    describe("bft", () => {
      it('filling', () => {
        const tree = new BinaryTree();
        const values = [1, 2, 3, 4, 5, 6, 7];
        values.forEach(v => tree.insert(v));
        const result = [];
        tree.bft(v => result.push(v));
        assert.deepEqual(result, values);
      });

      it('one', () => {
        const tree = new BinaryTree();
        tree.insert(42);
        const result = [];
        tree.bft(v => result.push(v));
        assert.deepEqual(result, [42]);
      });

      it('empty', () => {
        const tree = new BinaryTree();
        const result = [];
        tree.bft(v => result.push(v));
        assert.deepEqual(result, []);
      });
    });
  });

  describe("ArrayLike", () => {
    it("insert", () => {
      const tree = new BinaryTree({ representation: "array" });
      const values = [1, 2, 3];
      values.forEach((v) => tree.insert(v));
      const pre = [];
      tree.bft(v => pre.push(v));
      assert.deepEqual(pre, values);
    });

    // describe("pre-order traversal", () => {
    //   it('filling', () => {
    //     const tree = new BinaryTree();
    //     const values = [10, 5, 15, 3, 7, 12, 18];
    //     values.forEach(v => tree.insert(v));
    //     const result = [];
    //     tree.pre(v => result.push(v));
    //     assert.deepEqual(result, [10, 5, 3, 7, 15, 12, 18]);
    //   });

    //   it('one', () => {
    //     const tree = new BinaryTree();
    //     tree.insert(42);
    //     const result = [];
    //     tree.pre(v => result.push(v));
    //     assert.deepEqual(result, [42]);
    //   });

    //   it('empty', () => {
    //     const tree = new BinaryTree();
    //     const result = [];
    //     tree.pre(v => result.push(v));
    //     assert.deepEqual(result, []);
    //   });
    // });

    // describe("in-order traversal", () => {
    //   it('filling', () => {
    //     const tree = new BinaryTree();
    //     const values = [4, 2, 6, 1, 3, 5, 7];
    //     values.forEach(v => tree.insert(v));
    //     const result = [];
    //     tree.in(v => result.push(v));
    //     assert.deepEqual(result, [1, 2, 3, 4, 5, 6, 7]);
    //   });

    //   it('one', () => {
    //     const tree = new BinaryTree();
    //     tree.insert(42);
    //     const result = [];
    //     tree.in(v => result.push(v));
    //     assert.deepEqual(result, [42]);
    //   });

    //   it('empty', () => {
    //     const tree = new BinaryTree();
    //     const result = [];
    //     tree.in(v => result.push(v));
    //     assert.deepEqual(result, []);
    //   });
    // });

    // describe("post-order traversal", () => {
    //   it('filling', () => {
    //     const tree = new BinaryTree();
    //     const values = [8, 4, 12, 2, 6, 10, 14];
    //     values.forEach(v => tree.insert(v));
    //     const result = [];
    //     tree.post(v => result.push(v));
    //     assert.deepEqual(result, [2, 6, 4, 10, 14, 12, 8]);
    //   });

    //   it('one', () => {
    //     const tree = new BinaryTree();
    //     tree.insert(42);
    //     const result = [];
    //     tree.post(v => result.push(v));
    //     assert.deepEqual(result, [42]);
    //   });

    //   it('empty', () => {
    //     const tree = new BinaryTree();
    //     const result = [];
    //     tree.post(v => result.push(v));
    //     assert.deepEqual(result, []);
    //   });
    // });

    describe("bft", () => {
      it('filling', () => {
        const tree = new BinaryTree({ representation: "array" });
        const values = [1, 2, 3, 4, 5, 6, 7];
        values.forEach(v => tree.insert(v));
        const result = [];
        tree.bft(v => result.push(v));
        assert.deepEqual(result, values);
      });

      it('one', () => {
        const tree = new BinaryTree({ representation: "array" });
        tree.insert(42);
        const result = [];
        tree.bft(v => result.push(v));
        assert.deepEqual(result, [42]);
      });

      it('empty', () => {
        const tree = new BinaryTree({ representation: "array" });
        const result = [];
        tree.bft(v => result.push(v));
        assert.deepEqual(result, []);
      });
    });
  });
});