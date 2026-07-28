'use strict';

const { misc } = require("naughty-util");
const SegmentTree = require('./lib/SegmentTree/index.js');

const sum = iter => {
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

const search = Array.from({ length: 1000 }, () => ({
  from: misc.random(min, 0),
  to: misc.random(max, min),
}));

const sequential = () => {
  const start = misc.timestamp();
  const result = [];
  for (const params of search) {
    result.push(sum(range(arr, params.from, params.to)));
  }
  const end = start();
  return { result, end };
};

const tree = () => {
  const tree = new SegmentTree(arr, sum);
  const start = misc.timestamp();
  const result = [];
  for (const params of search) {
    result.push(tree.select(params.from, params.to));
  }
  const end = start();
  return { result, end };
};

console.log({
  tree: tree().end.seconds,
  sequential: sequential().end.seconds,
});
