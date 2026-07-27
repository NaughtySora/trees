'use strict';

const { globSync } = require('node:fs');
const { resolve } = require('node:path');

const tests = globSync('*.js', { cwd: __dirname, exclude: ['index.js'] });

for (const test of tests) {
  require(resolve(__dirname, test));
}