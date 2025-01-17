
## Heapsort

Before we get to Heapsort, consider for a moment the practicality of
using a Binary Search Tree for sorting. You could insert all of the
values to be sorted into the BST one by one, then traverse the completed
tree using an inorder traversal. The output would form a sorted list.
This approach is conceptually very similar to
[Quicksort], where
an internal node corresponds to the pivot, and the left (right) subtree
consists of the partition of values smaller (larger) than the pivot.

However, the approach has a number of drawbacks, including the extra
space required by BST pointers and the amount of time required to insert
nodes into the tree. Quicksort implements this same concept in a much
more efficient way. But there is also the possibility that the BST might
be unbalanced, leading to a $\Theta(n^2)$ worst-case running time. And
this is the same problem as Quicksort has with chosing a good pivot (see
the section "Quicksort Analysis" in the
[Quicksort] module).

Instead, a good sorting algorithm can be devised based on a tree
structure more suited to the purpose. In particular, we would like the
tree to be balanced, space efficient, and fast. The algorithm should
take advantage of the fact that sorting is a special-purpose application
in that all of the values to be stored are available at the start. This
means that we do not necessarily need to insert one value at a time into
the tree structure.

[Heapsort]{.term} is based on the
[heap]{.term} data structure.
Heapsort has all of the advantages just listed. The complete binary tree
is balanced, its array representation is space efficient, and we can
load all values into the tree at once, taking advantage of the efficient
`buildheap` function. The asymptotic performance of Heapsort when all of
the records have unique key values is $\Theta(n \log n)$ in the best,
average, and worst cases. It is not as fast as Quicksort in the average
case (by a constant factor), but Heapsort has special properties that
will make it particularly useful for
[external sorting](#external-sort){.term} algorithms, 
used when sorting data sets too large to fit in main memory.

<inlineav id="heapsortCON" src="Sorting/heapsortCON.js" script="DataStructures/binaryheap.js" name="Heapsort Slideshow"/>

A complete implementation is as follows.

```python
def heapsort(a):
    # Convert the array to a heap
    build_heap(a)

    # Repeatedly find and remove the minimum element
    heapsize = len(a)
    while heapsize > 0:
        a[0], a[heapsize - 1] = a[heapsize - 1], a[0]
        heapsize -= 1
        sift_down(a, heapsize, 0)

def build_heap(a):
    # Go backwards from the first non-leaf, sifting down each one
    for i in reversed(range(len(a)//2)):
        sift_down(a, len(a), i)

# Standard sift-down method for max heaps
def sift_down(a, heapsize, i):
    while left_child_index(i) < heapsize:
        l = left_child_index(i)
        r = right_child_index(i)

        if a[l] > a[i]:
            largest = l
        else:
            largest = i

        if r < heapsize and a[r] > a[largest]:
            largest = r

        if largest == i:
            return
        else:
            a[i], a[largest] = a[largest], a[i]
            i = largest

# Left and right child indexes.
def left_child_index(i):
    return 2*i+1

def right_child_index(i):
    return 2*i+2
```

```pseudocode
Algorithm 1 Heapsort(A)
    // Convert the array to a heap
    BuildHeap(A)

    // Repeatedly find and remove the minimum element
    heapsize = A.size
    while heapsize > 0
        Swap(A[0], A[heapsize - 1])
        heapsize -= 1
        SiftDown(A, 0)

// Standard sift-down method for max heaps
Algorithm 2 SiftDown(A, i)
    while Left-child-index(i) < heapsize
        l = Left-child-index(i)
        r = Right-child-index(i)
        if A[l] > A[i]
            largest = l
        else
            largest = i

        if r < heapsize and A[r] > A[largest]
            largest = r

        if largest = i
            return
        else
            Swap(A[i], A[largest])
            i = largest
```

```java
static void heapsort(int[] a) {
    // Convert the array to a heap
    buildHeap(a);

    // Repeatedly find and remove the minimum element
    int heapsize = a.length;
    while (heapsize > 0) {
        swap(a, 0, heapsize - 1);
        heapsize--;
        siftDown(a, heapsize, 0);
    }
}
    
static void buildHeap(int[] a) {
    // Go backwards from the first non-leaf, sifting down each one
    for (int i = a.length/2; i >= 0; i--)
        siftDown(a, a.length, i);
}

// Standard sift-down method for max heaps
static void siftDown(int[] a, int heapsize, int i) {
    while (leftChildIndex(i) < heapsize) {
        int l = leftChildIndex(i);
        int r = rightChildIndex(i);
        int largest;

        if (a[l] > a[i])
            largest = l;
        else
            largest = i;

        if (r < heapsize && a[r] > a[largest])
            largest = r;

        if (largest == i)
            return;
        else {
            swap(a, i, largest);
            i = largest;
        }
    }
}

static int leftChildIndex(int i) {
    return 2*i+1;
}

static int rightChildIndex(int i) {
    return 2*i+2;
}

// Swap index i and j
static void swap(int[] a, int i, int j) {
    int temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}
```



Here is a warmup practice exercise for Heapsort.

<avembed id="HeapsortStepPRO" src="Sorting/HeapsortStepPRO.html" type="ka" name="Heapsort RemoveMax Proficiency Exercise"/>

### Heapsort Proficiency Practice

Now test yourself to see how well you understand Heapsort. Can you
reproduce its behavior?

<avembed id="heapsortPRO" src="Sorting/heapsortPRO.html" type="pe" name="Heapsort Proficiency Exercise"/>

### Heapsort Analysis

This visualization presents the running time analysis of Heap Sort

<inlineav id="HeapSortAnalysisCON" src="Sorting/HeapSortAnalysisCON.js" script="DataStructures/binaryheap.js" name="Heapsort Analysis Slideshow" links="Sorting/HeapSortAnalysisCON.css"/>

While typically slower than Quicksort by a constant factor (because
unloading the heap using `removemax` is somewhat slower than
Quicksort's series of partitions), Heapsort has one special advantage
over the other sorts studied so far. Building the heap is relatively
cheap, requiring $\Theta(n)$ time. Removing the maximum-valued record
from the heap requires $\Theta(\log n)$ time in the worst case. Thus, if
we wish to find the $k$ records with the largest key values in an array,
we can do so in time $\Theta(n + k \log n)$. If $k$ is small, this is a
substantial improvement over the time required to find the $k$
largest-valued records using one of the other sorting methods described
earlier (many of which would require sorting all of the array first).
One situation where we are able to take advantage of this concept is in
the implementation of
[Kruskal's algorithm]{.term} for
[minimal-cost spanning trees](#minimal-cost-spanning-tree){.term}. 
That algorithm requires that edges be visited in ascending
order (so, use a min-heap), but this process stops as soon as the MST is
complete. Thus, only a relatively small fraction of the edges need be
sorted.

Another special case arises when all of the records being sorted have
the same key value. This represents the best case for Heapsort. This is
because removing the smallest value requires only constant time, since
the value swapped to the top is never pushed down the heap.

<avembed id="HeapsortSumm" src="Sorting/HeapsortSumm.html" type="ka" name="Heapsort Summary Exercise"/>
