
## Implementing Tree Traversals

Recall that any recursive function requires the following:

> 1.  The base case and its action.
> 2.  The recursive case and its action.

In this module, we will talk about some details related to correctly and
clearly implementing recursive tree traversals.

### Base Case

In binary tree traversals, most often the base case is to check if we
have an empty tree. A common mistake is to check the child pointers of
the current node, and only make the recursive call for a non-null child.

Recall the basic preorder traversal function.

```python
def preorder(node):
    if node is None: return  # Empty subtree - do nothing
    visit(node)                # Visit root node
    preorder(node.left())    # Process all nodes in left
    preorder(node.right())   # Process all nodes in right
```

```java
static <E> void preorder(BinNode<E> node) {
    if (node == null) return;  // Empty subtree - do nothing
    visit(node);               // Visit root node
    preorder(node.left());     // Process all nodes in left
    preorder(node.right());    // Process all nodes in right
}
```



Here is an alternate design for the preorder traversal, in which the
left and right pointers of the current node are checked so that the
recursive call is made only on non-empty children.

```python
# This is a bad idea
def preorder2(node):
    visit(node)
    if node.left() is not None: preorder2(node.left())
    if node.right() is not None: preorder2(node.right())
```

```java
// This is a bad idea
static <E> void preorder2(BinNode<E> node) {
    visit(node);
    if (node.left()  != null) preorder2(node.left());
    if (node.right() != null) preorder2(node.right());
}
```



At first, it might appear that `preorder2` is more efficient than
`preorder`, because it makes only half as many recursive calls (since it
won't try to call on a null pointer). On the other hand, `preorder2`
must access the left and right child pointers twice as often. The net
result is that there is no performance improvement.

Perhaps the writer of `preorder2` wants to protect against the case
where the root is `null`. But `preorder2` has an error. While
`preorder2` insures that no recursive calls will be made on empty
subtrees, it will fail if the original call from outside passes in a
null pointer. This would occur if the original tree is empty. Since an
empty tree is a legitimate input to the initial call on the function,
there is no safe way to avoid this case. So it is necessary that the
first thing you do on a binary tree traversal is to check that the root
is not `null`. If we try to fix `preorder2` by adding this test, then
making the tests on the children is completely redundant because the
pointer will be checked again in the recursive call.

The design of `preorder2` is inferior to that of `preorder` for a deeper
reason as well. Looking at the children to see if they are `null` means
that we are worrying too much about something that can be dealt with
just as well by the children. This makes the function more complex,
which can become a real problem for more complex tree structures. Even
in the relatively simple `preorder2` function, we had to write two tests
for `null` rather than the one needed by `preorder`. This makes it more
complicated than the original version. The key issue is that it is much
easier to write a recursive function on a tree when we only think about
the needs of the current node. Whenever we can, we want to let the
children take care of themselves. In this case, we care that the current
node is not `null`, and we care about how to invoke the recursion on the
children, but we do **not** have to care about how or when that is done.

### The Recursive Call

The secret to success when writing a recursive function is to not worry
about how the recursive call works. Just accept that it will work
correctly. One aspect of this principle is not to worry about checking
your children when you don't need to. You should only look at the
values of your children if you need to know those values in order to
compute some property of the current node. Child values should not be
used to decide whether to call them recursively. Make the call, and let
their own base case handle it.

:::: topic
#### Example {-}

Consider the problem of incrementing the value for each node in a binary
tree. The following solution has an error, since it does redundant
manipulation to the left and the right children of each node.

```python
def ineff_BTinc(root);
    if root is not None:
        root.setValue(root.value() + 1)
        if root.left() is not None:
            root.left().setValue(root.left().value() + 1)
            ineff_BTinc(root.left().left())
        if root.right() is not None:
            root.right().setValue(root.right().value() + 1)
            ineff_BTinc(root.right().right())
```

```java
static void ineff_BTinc(BinNode root) {
  if (root != null) {
      root.setValue((int)(root.value()) + 1);
    if (root.left() != null) {
      root.left().setValue((int)(root.left().value()) + 1);
      ineff_BTinc(root.left().left());
    }
    if (root.right() != null) {
      root.right().setValue((int)(root.right().value()) + 1);
      ineff_BTinc(root.right().right());
    }
  }
}
```

```java
static void ineff_BTinc(BinNode<Integer> root) {
    if (root != null) {
        root.setValue(root.value() + 1);
        if (root.left() != null) {
            root.left().setValue(root.left().value() + 1);
            ineff_BTinc(root.left().left());
        }
        if (root.right() != null) {
            root.right().setValue(root.right().value() + 1);
            ineff_BTinc(root.right().right());
        }
    }
}
```



The efficient solution should not explicitly set the child values that
way. Changing the value of a node does not depend on the child values.
So the function should simply increment the root value, and make
recursive calls on the children.
::::

In rare problems, you might need to explicitly check if the children are
null or access the child values for each node. For example, you might
need to check if all nodes in a tree satisfy the property that each node
stores the sum of its left and right children. In this situation, you
must look at the values of the children to decide something about the
current node. You do **not** look at the children to decide whether to
make a recursive call.

### Binary Tree Increment By One Exercise

::: {.extrtoolembed workout_id="80"}
'Binary Tree Increment By One Exercise'
:::
