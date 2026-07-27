# Segment Tree

* stores information about intervals
* each node range element
* root - a whole array, each parent halfs the range

## Efficient range calculation (sum, min, max, GCD) 

## Structure
* leaf - single element of the array
* nodes - aggregation information of their children
* can't insert a new value, basically inserting new value will break segmentation and aggregation, 
so it will be the same as rebuild the tree from the start

### Example
```js
const root = [1, 3, 5, 7, 9, 11];
const left = [1, 3, 5];
const right = [7, 9, 11];
//... till the single leaf element
```

### Benefits
* O(log n) range queries
* tree update will adjust aggregation info

### Observation 
The pattern when updating the element of the tree will adjust 
all the aggregation information reminds me of reactive programming.
Like spreadsheet will adjust formula when changing related row/column. 

Also reminds me of dynamic programming, 
breaking array and compute aggregation info into subtrees.