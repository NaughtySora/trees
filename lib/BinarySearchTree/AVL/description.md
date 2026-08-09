# AVL - Self-balancing BST

Every node has balance factor.
height left - height right.
valid values: -1 | 0 | 1.

left, no child nodes = 0 height
empty child = -1 height

#### advantages
Great look up complexity O(log n)

#### disadvantages
Balance costs for insert/delete cause of strict balance rules.

#### Good for
Many searches, few modifications

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

#### Rebalancing
Change the shape of the subtree so that it becomes balanced, 
while preserving the BST ordering.

#### Rotation
- detect violation |left.height - right.height| > 1
- detect which side is heavy 
left.height > right.height, otherwise its right
- take node and detect its heavy side
- now we have 4 cases to rotate.
1. LL (Left-left heavy)
```
              A               B
             / \             / \
            B   Y    ->     X   A
           / \             /   / \
          X   C           D   C   Y
         /
        D
```
- Rotate A right, make B parent of A

2. LR (Left-right heavy)
The violation is at A.\
It means rotate B to the left and A to the right.\
Rotate the subtree whose root is B so that B right child moves up
and B moves down to the left.
```
          A
         / \
        B   Y 
       / \
      X   C 
         / \
        D   E
```
- rotate B to the left, make C parent of B

```
                            A
                           / \
                          C   Y
                         / \
                        B   E
                       / \
                      X   D
```
- We made LL, now rotate A right, make C parent of A
```
          C
         / \
        B   A
       / \ / \
      X  D E  Y
```

3. RL (Right-left heavy)
```
          A   
         / \          
        X   B  
           / \ 
          C   Y                      
         / \
        D   E
```
Rotate B right, C becomes parent B
```
     A
    / \
   X   C
      / \ 
     D   B
        / \
       E   Y
```
Rotate A left, C becomes parent of A
```
     C
    / \
   A   B
  / \ / \
 X  D E  Y
```

4. RR (Right-right heavy)
```
      A                           B
     / \                         / \
    X   B          ->           A   Y
       / \                     / \   \
      C   Y                   X   C   D
           \
            D
```
- Rotate A left, make B parent of A