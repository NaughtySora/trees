# Red-Black Tree - Self-balancing BST
Stores extra information: a color, red or black.

It Gives every node a color state and maintains 
some structural rules that prevent the tree degeneration.

Less strict height policy.\
Less cost for insert/delete.

#### Good for
When modifications are significant part of the workload.

#### Concepts
1. Every node is either red or black.
2. The root is black.
3. Every missing child (null) is considered black.
4. A red node cannot have a red child.
5. Every path from a node down to its end contains the same number of black nodes.

Black nodes server as structural markers.
The rules forces every route to have the same amount of black markers.
Red nodes are allowed to sit between black nodes.

#### Rotation - When parent and child are both red
Look at parent other side (uncle), if its black, rotate

1. Check if tree LR or RL, turn it into LL or RR, otherwise skip this step.
example rotation from LR to LL
```
      10(B)           10(B)
      /   \            /  \
    1(R)  r1   ->    5(R)  r1
    / \             / \
  l2   5(R)      1(R)  r3
      / \         / \
    l3  r3      l2   l3 
```
2. Turn LL or RR into proper balanced tree 
```
    10(B)               5(B)
    / \                 / \
  5(R) null(B)  ->    1(R) 10(R)
  /                         \
1(R)                     null(B)
```

2. If both parent and uncle are red, doesn't rotate.
Recolor both of them, and move red color up to grandparent.
If grandparent is root, skip recoloring.
Advance rebalancing up to grandparent.
```
     5(B)             5(R)   
     / \              / \ 
  1(R) 10(R)        1(B) 10(B) 
   /                /
-1(R)            -1(R)
```