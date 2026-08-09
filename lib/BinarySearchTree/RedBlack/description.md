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
3. Every missing child is considered black.
4. A red node cannot have a red child.
5. Every path from a node down to its a leaf contains the same number of black nodes.