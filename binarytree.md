- in order traversal - sort, bst
- pre order - copy, build, serialize
- post order - delete, aggregate, evaluate


* traversal methods are the same, insert methods are different, make insert methods pluggable
* change traversal method to support inner and outer usage

* ! Methods
* 
* height() -> number of edges on the longest path
* size() total nodes
* isEmpty()
* remove
* search
* isBalanced
* clone
* toArray

* '*' or '_' start
* in _/\
* post _\
* pre /*\

*  Binary trees
* 
* [full] - every node has 0 or 2 children, mostly conceptual, uses complete tree to fill tree as 'full', 
* mostly static, can we dynamic, need to maintain fullness
* 
* [complete] - all level filled expect last, left to right.
* 
* [perfect] - all internal nodes have 2 children and all leaves at same level
* every level should be filled 'perfectly'
* 
* [balanced]- height difference <= 1 for every node, 
* keep rearrange nodes to maintain minimum height when remove/inserting nodes
* 
* search (bst) - left < node < right ?
* threaded - empty child pointers replaced by traversal links
* expression/syntax - internal nodes = operators, leaves = operands
* decision tree - nodes = tests/conditions, leaves decisions 
* heap - complete + comparator
* huffman - weight-based