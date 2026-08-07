# Binary Search Tree (BST)
A balanced binary tree that maintains an ordering invariant.

order:
left < parent < right

#### example
8 3 1 6 4 7 10 14

```
         8
       /   \
      3     10
     / \      \
    1   6      14
       / \
      4   7
```

8 > 3, 1, 6, 4, 7
8 < 10, 14

#### duplicates policies
- skip it
- put always either left or right 
1. left <= node < right
2. left < node <= right
3. store as count
instead of:
```
    5
   / \
  5   5
```
store value: 5, count: 3


#### categories
1. Unbalanced
- No extra rules
2. Balanced
Adds a rule that keeps height controlled.

#### Balanced
1. Height-balanced
- left and right subtree heights cannot differ too much.
2. Weight-balanced
Balance based on number of nodes instead of height.
left subtree size ~= right subtree size
3. Self-adjusting
Instead of maintaining strict balance, it changes shape based on usage.
Frequently accessed nodes move closer to the root.
4. Self-balancing
Keep the tree balanced after insert/delete.
5. Randomized
Uses randomness to keep expected balance.
6. Augmented
Extra information stored in nodes.
7. Persistent
Keeps old versions after modification.
8. Threaded
Adds links between nodes to make traversal easier.

#### filling
follows exactly one root-to-leaf path. 
It never visits unrelated branches.

- start from the root
- if new value < current node, go left
- if new value > current node, go right
- find an empty place, insert there

