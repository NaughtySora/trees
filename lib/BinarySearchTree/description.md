# Binary Search Tree (BST)
A balanced binary tree that maintains an ordering invariant.

order:
left < parent < right

## Categories
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

#### filling
follows exactly one root-to-leaf path. 
It never visits unrelated branches.

- start from the root
- if new value < current node, go left
- if new value > current node, go right
- find an empty place, insert there

#### traversal
Has one specific traversal order - In-order,
cause it produces sorted output.
```
        8
       / \
      3   10
     / \
    1   6
in-order:
1 3 6 8 10
```

But can be any of in,pre,post orders and bft.

#### deletion
1. Find the node (the same as 'search')
2. Remove it
3. Repair the links so the BST rule remains valid

##### Repairing
1. Node has no children - remove the node
2. Node has one child - connect Node parent and this one node
- remove 3
```
      8       8
     /       /
    [3] ->  1
   /
  1
```
3. Node has two children
- Successor
Find smallest value in the right subtree (4),
replace with the delete target [3].
```
          8                   8
        /   \               /   \
      [3]    10           (4)    10
      / \      \          / \      \
     1   6      14  ->   1   6      14 
        / \                   \             
      (4)  7                   7
```
- Predecessor
Find largest value in the left subtree (1)
replace with the delete target [3].
```
          8                   8
        /   \               /   \
      [3]    10            1     10
      / \      \            \      \
    (1)  6      14  ->       6      14 
        / \                 / \             
        4  7               4   7
```
