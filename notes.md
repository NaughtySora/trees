# Trees
**Connected acyclic graph with one node as a root**

## Key terms
- Height: number of edges on the longest path from root to a leaf.
- Depth: distance from root to a node.
- Leaf: node with no children.
- Degree: number of children a node has.
- Balance: how evenly spread the tree is.
- Subtree: node and its all descendants
- Children: closest descendants connected to node

# Binary tree
- up 2 children (left, right)

# Binary Search Trees (BST)

# Balanced Trees 
## Red-Black Tree
## AVL Tree
## Splay Tree

# Heaps

# B-Tree & Variants

# Tries

# Specialized Trees
- Segment Tree: range queries (min, max, sum over intervals).
- Fenwick Tree (BIT): efficient prefix sums.
- Interval Tree: store ranges (overlapping intervals).
- KD-Tree / QuadTree / Octree: spatial partitioning for geometry, games, AI.
- Merkle Tree: cryptography, blockchain (hashes in tree form).
- Treap: BST + heap (random priorities).
- Cartesian Tree: mix of heap and sequence.
- Van Emde Boas Tree: fast O(log log M) lookup for integers.

# General Purpose
- Balanced BSTs: general-purpose sets, maps.
- Heaps: priority queues.
- Tries: prefix-based search.
- B-Trees: databases, file systems.
- Segment Trees: range queries (competitive programming, analytics).
- Merkle Trees: cryptographic proofs.


Binary / BST-based named trees
AVL Tree – strict balance using heights
Red-Black Tree – balance with colors, flexible
Splay Tree – move accessed nodes to root
Treap – BST + heap property
Scapegoat Tree – rebuilds unbalanced subtrees
Weight-Balanced Tree – balance based on subtree sizes
AA Tree – simplified Red-Black variant
Bonsai Tree – memory-efficient, compact
Finger Tree – fast access near ends
Multiway / disk-oriented trees
B-Tree – multiway balanced search tree
B+ Tree – all values at leaves, fast range queries
B Tree* – variation of B+ tree, better node utilization
Heap / priority trees
Binary Heap (Min / Max) – array-based CBT
Fibonacci Heap – fast amortized operations
Pairing Heap – simpler heap variant
Binomial Heap – supports merge efficiently
Special-purpose trees
Segment Tree – range queries
Interval Tree – intervals and overlaps
Suffix Tree / Suffix Trie – substring search
Trie / Prefix Tree – string prefix storage
KD-Tree – multidimensional points, nearest neighbor
Octree / Quadtree – spatial partitioning (3D / 2D)
