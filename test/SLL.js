'use strict';

const { describe } = require("node:test");
const assert = require("node:assert/strict");
const SLL = require("../lib/SLL.js");

describe("SLL", () => {
  const list = new SLL();
  list.push(1);
  list.push(2);
  list.push(3);
  list.push(4);
  assert.equal(list.shift(), 1);
  assert.equal(list.shift(), 2);
  assert.equal(list.shift(), 3);
  assert.equal(list.shift(), 4);
  assert.equal(list.shift(), null);
});