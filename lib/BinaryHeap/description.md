# BinaryHeap
Priority queue

# General properties
- Complete binary tree
- each parent >= children

Heap is not sorted.

#### Removing
Remove root.
Put last node first and push it down till it first its place.

#### Insert
Put last, lift up

#### Heapify
Create new tree by combining 2 arrays.
Count amount of parent nodes: (length - 2) / 2
Sink each parent node.