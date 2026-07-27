# Binary Tree

#### variations
1. Full Binary Tree / Strict binary tree
Every node has 0 or 2 children. 
Mostly static.
Can be dynamic, need to maintain fullness.
```
       A
      / \
     B   C
        / \
       D   E
```

2. Complete Binary Tree 
All levels are full except possibly the last.
The last level is filled left-to-right.
```
        A
       / \
      B   C
     / \
    D   E
```

3. Perfect Binary Tree
All internal nodes have 2 children, and all leaves are on the same level.
```
        A
       / \
      B   C
     / \ / \
    D  E F  G
```

4. Balanced Binary Tree 
The height difference between subtrees is controlled.
Rearranges nodes to maintain minimum height when remove/inserting nodes.

5. Degenerate / skewed tree
Basically a linked list, worst case for BST.
```
A
 \
  B
   \
    C
```

##### Height-balanced tree
A more general term for trees that keep height small.