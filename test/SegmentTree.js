'use strict';

const { describe } = require("node:test");
const SegmentTree = require("../lib/SegmentTree.js");

describe.only('SegmentTree', () => {
  const array = [1, 2, 3, 4, 5];
  const tree = new SegmentTree(array, (arr) => Math.max(...arr));
});