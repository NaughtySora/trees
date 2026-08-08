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

## Categories
1. Unbalanced
- No extra rules
2. Balanced
- Adds a rule that keeps height controlled.

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

#### Balanced
Concept: Keep the trees height reasonably small.
Each rule for balanced represents its own tree.

Why balanced even needed:
1. BST can become too tall.
valid BST:
```
      8
       \
       10
         \
         12
           \
           14
```
2. Need a policy to control height.
What shapes are considered acceptable?
For example: 
left subtree and right subtree height must not differ by n.
3. Detect violation
After an operation tree checks is balancing rule is still satisfied.
insert/delete -> is balanced -> (yes -> exit) | (no -> fix)
4. Restructure with rotations
Rotation preserves sorted order, but changes the shape of the tree.

## AVL - Self-balancing BST
Every node has balance factor.
height left - height right.
valid values: -1 | 0 | 1.

#### Heigh-balanced
Height of the left and right subtrees can be different by at most 1.

#### Process
- Insert
1. insert as BST.
2. go up the same path you came to the node.
3. check violations of subtree by comparing heights
4. if violated, repair, repair will update heights
5. exit, cause insertion can at most make 1 imbalance, every node after it is fine.

- Delete
For deletion, you cannot necessarily stop after the first repair.
Deletion can reduce subtree height, 
which can cause ancestors farther up to become unbalanced too.

#### Parent node
There are 2 ways to maintain parent while inserting/deleting
1. Keep parent in child node
2. Keep parent on the stack/recursion call