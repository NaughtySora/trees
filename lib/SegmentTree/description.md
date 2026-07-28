# Segment Tree
Stores information about intervals.
Each node range element.
Root is a whole array, each parent halfs the range.

## Efficient range calculation (sum, min, max, GCD) 

## Structure
- leaf - a single element of the array.
- nodes - an aggregation information of their children.

### Example
1, 3, 5, 7, 9, 11
```
       [1, 3, 5, 7, 9, 11]
           /        \
      [1, 3, 5]  [7, 9, 11]
        /   \       /   \
     [1, 3] [5]  [7, 9] [11]
     /  \         /  \
   [1]  [3]     [7]  [9]
```

### Benefits
- O(log n) range queries
- tree update will adjust aggregation info

### Observation 
The pattern when updating the element of the tree will adjust 
all the aggregation information reminds me of reactive programming.

Close to spreadsheet it will adjust formula when changing related row/column. 

Also reminds me of dynamic programming, 
breaking array and compute aggregation info into subtrees.