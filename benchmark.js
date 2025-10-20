'use strict';

const { misc } = require("naughty-util");
const SegmentTree = require('./lib/SegmentTree.js');

/** --noconcurrent_sweeping 
 * 
 *  after ~ 500 elements in array tree becoming faster than plain calculation
 */

const sum = (iter) => {
  let sum = 0;
  for (const i of iter) sum += i;
  return sum;
};

function* range(arr, from, to = from) {
  while (from <= to) yield arr[from++];
}

const arr = Array.from({ length: 50000 }, () => misc.random(10000, -10000));
const min = Math.floor(arr.length / 2);
const max = arr.length - 1;

const calculateFull = () => {
  gc();
  let c = 0;
  const start = misc.timestamp();
  const result = [];
  while (c++ !== 1000) {
    const from = misc.random(min, 0);
    const to = misc.random(max, min);
    result.push(sum(range(arr, from, to)));
  }
  gc();
  const end = start();
  console.log("full", end);
  return result;
};

const calculateTree = () => {
  gc();
  let c = 0;
  const tree = new SegmentTree(arr, sum);
  const start = misc.timestamp();
  const result = [];
  while (c++ !== 1000) {
    const from = misc.random(min, 0);
    const to = misc.random(max, min);
    result.push(tree.select(from, to));
  }
  gc();
  const end = start();
  console.log("tree", end);
  return result;
};

console.log(calculateFull().length);
console.log(calculateTree().length);
