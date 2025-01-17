
## Insertion Sort

What would you do if you have a stack of phone bills from the past two
years and you want to order by date? A fairly natural way to handle this
is to look at the first two bills and put them in order. Then take the
third bill and put it into the right position with respect to the first
two, and so on. As you take each bill, you would add it to the sorted
pile that you have already made. This simple approach is the inspiration
for our first sorting algorithm, called
[Insertion Sort]{.term}.

Insertion Sort iterates through a list of records. For each iteration,
the current record is inserted in turn at the correct position within a
sorted list composed of those records already processed. Here is an
implementation. The input is an array named `A` that stores $n$ records.

:::: {#introduction}
```python
def insertionSort(A):
    for i in range(len(A)):  # Insert i'th record
        j = i
        while j > 0 and A[j] < A[j-1]:
            swap(A, j, j-1)
            j -= 1
```

```java
public static <T extends Comparable<T>> void insertionSort(T[] A) {
    for (int i = 1; i < A.length; i++) {
        // Insert i'th record.
        int j = i;
        while (j > 0 && A[j].compareTo(A[j-1]) < 0) {
            Util.swap(A, j, j-1);
            j--;
        }
    }
}
```


::::

::: {#practice}
(Note that to make the explanation for these sorting algorithms as
simple as possible, our visualizations will show the array as though it
stored simple integers rather than more complex records. But you should
realize that in practice, there is rarely any point to sorting an array
of simple integers. Nearly always we want to sort more complex records
that each have a [key]{.term} value. In such cases we must have a way
to associate a key value with a record. The sorting
algorithms will simply assume that the records are
[comparable]{.term}.)
:::

Here we see the first few iterations of Insertion Sort.

<inlineav id="insertionsortCON" src="Sorting/insertionsortCON.js" name="Insertion Sort Slideshow"/>

This continues on with each record in turn. Call the current record $x$.
Insertion Sort will move it to the left so long as its value is less
than that of the record immediately preceding it. As soon as a key value
less than or equal to $x$ is encountered, `insertionSort` is done with
that record because all records to its left in the array must have
smaller keys.

<avembed id="insertionsortAV" src="Sorting/insertionsortAV.html" type="ss" name="Insertion Sort Visualization"/>

<avembed id="InssortPRO" src="Sorting/InssortPRO.html" type="ka" name="Insertion Sort Proficiency Exercise"/>

### Insertion Sort Analysis

<inlineav id="InsertionSortWorstCaseCON" src="Sorting/InsertionSortWorstCaseCON.js" name="Insertion Sort Worst Case Slideshow" links="Sorting/InsertionSortWorstCaseCON.css"/>

| 

<inlineav id="InsertionSortBestCaseCON" src="Sorting/InsertionSortBestCaseCON.js" name="Insertion Sort Best Case Slideshow" links="Sorting/InsertionSortBestCaseCON.css"/>

| 

<inlineav id="InsertionSortAverageCaseCON" src="Sorting/InsertionSortAverageCaseCON.js" name="Insertion Sort Average Case Slideshow" links="Sorting/InsertionSortAverageCaseCON.css"/>

While the best case is significantly faster than the average and worst
cases, the average and worst cases are usually more reliable indicators
of the "typical" running time. However, there are situations where we
can expect the input to be in sorted or nearly sorted order. One example
is when an already sorted list is slightly disordered by a small number
of additions to the list; restoring sorted order using Insertion Sort
might be a good idea if we know that the disordering is slight. And even
when the input is not perfectly sorted, Insertion Sort's cost goes up
in proportion to the number of inversions. So a "nearly sorted" list
will always be cheap to sort with Insertion Sort. Examples of algorithms
that take advantage of Insertion Sort's near-best-case running time are
[Shellsort]{.term} and [Quicksort](#quicksort).

Counting comparisons or swaps yields similar results. Each time through
the inner `for` loop yields both a comparison and a swap, except the
last (i.e., the comparison that fails the inner `for` loop's test),
which has no swap. Thus, the number of swaps for the entire sort
operation is $n-1$ less than the number of comparisons. This is 0 in the
best case, and $\Theta(n^2)$ in the average and worst cases.

Later we will see algorithms whose growth rate is much better than
$\Theta(n^2)$. Thus for larger arrays, Insertion Sort will not be so
good a performer as other algorithms. So Insertion Sort is not the best
sorting algorithm to use in most situations. But there are special
situations where it is ideal. We already know that Insertion Sort works
great when the input is sorted or nearly so. Another good time to use
Insertion Sort is when the array is very small, since Insertion Sort is
so simple. The algorithms that have better asymptotic growth rates tend
to be more complicated, which leads to larger constant factors in their
running time. That means they typically need fewer comparisons for
larger arrays, but they cost more per comparison. This observation might
not seem that helpful, since even an algorithm with high cost per
comparison will be fast on small input sizes. But there are times when
we might need to do many, many sorts on very small arrays. You should
spend some time right now trying to think of a situation where you will
need to sort many small arrays. Actually, it happens a lot.

<avembed id="InssortSumm" src="Sorting/InssortSumm.html" type="ka" name="Insertion Sort Summary Exercise"/>

See for a discussion on how the relative costs of search and insert can
affect what is the best sort algorithm to use.

See [Computational Fairy Tales: Why Tailors Use Insertion Sort][FAIRYTALES] for a discussion on how the relative costs of
search and insert can affect what is the best sort algorithm to use.

[FAIRYTALES]: http://computationaltales.blogspot.com/2011/04/why-tailors-use-insertion-sort.html

