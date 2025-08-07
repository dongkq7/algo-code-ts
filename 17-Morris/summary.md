## 对比普通遍历

普通遍历的递归和非递归的解法，其实都使用了栈结构。在处理完二叉树某个节点后可以回到上层去。为什么从下层回到上层会如此难？**因为二叉树的结构如此，每个节点都有指向孩子节点的指针，所以从上层到下层容易，但是没有指向父节点的指针，所以从下层到上层需要用栈结构辅助完成。**

Morris遍历的是指就是避免用栈结构，而是让下层到上层有指针，**具体是通过让底层节点指向null的空闲指针指回上层的某个节点，从而完成下层到上层的移动。**我们知道，二叉树上的很多节点都有大量的空闲指针，比如，某些节点没有右孩子节点，那么这个节点的right指针就指向null，称为空闲状态，Morris遍历正式利用了这些空闲指针。

## Morris遍历过程

假设来到当前节点cur，初始时cur就是整棵树的头节点，根据以下标准让cur移动：

1. 如果cur为null，整个过程停止，否则继续下面的过程：
2. 如果cur没有左子树，cur向石移动`cur =cur.right`
3. 如果cur有左子树，找到左子树上最右的节点`mostRight`：

1. 如果mostRight的右指针指向空，让其指向cur，然后cur向左移动`cur = cur.left`

  b.如果mostRight的右指针指向cur，让其指向null，然后cur向右移动`cur = cur.right`

**遍历过程：**

首先cur来到头节点的位置，遍历到了1：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848124794-8f57b088-bb02-4c13-97f1-5eacf8826492.png)

然后cur有左孩子，所以找到左子树最右节点5，由于该节点右指针为null，所以让该节点的右指针指向当前节点，然后cur向左移动，遍历到了2：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848221630-309856c2-a250-462f-8b98-fed8c8140871.png)

2节点也是有左子树的，此时其左子树的最右节点是4，4的右指针是null，4的右指针指向2，然后cur向左移动来到了4，遍历到了4：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848341489-75db2f80-fcf4-42bc-ad9e-4f98b8f94f23.png)

4节点是没有左子树的，向右移动，由于4的右指针指向了2，所以此时回到了2：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848403659-9708044c-57ce-4aa2-9e4b-4c69951de582.png)

2节点是有左子树的，2节点左子树的最右节点时4，4的右指针此时不为空了指向了节点2（cur），那么让4指回空，cur再向右移动，来到了5，此时遍历到了5：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848530856-d7d84456-1d65-4d09-9f59-52173256438b.png)

5节点是没有左子树的，向右移动，此时5的右指针指向1，所以回到了1：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848593258-d6b3c1b5-f04d-49cd-892b-e6f782b74668.png)

1节点是有左子树的且左子树的最右节点是5，此时5的右指针指向cur，所以让其右指针重新指向null，然后cur向右移动遍历到了3：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848696636-8a5d1450-99f1-435d-a55d-1ae27127a83c.png)

节点3是有左子树的，且左子树的最右节点是6，由于6的右指针指向null，此时让其指向3，然后cur向左移动，遍历到了6：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848778535-978fd595-31b2-4d8c-83ff-0290357dc45d.png)

6节点没有左树，向右移动，回到了3：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848827761-3289ddb5-8746-40e8-bd99-86ec45eb4b19.png)

3的左子树的最右节点是6，6的右指针此时指向3，让其重新指回空，cur向右移动，遍历到了7：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753848888709-05531fe1-7857-42aa-b231-336d47212430.png)

7没有左子树，向右移动，来到了null，停止遍历

该遍历过程总的来说：

- 如果有左子树，这个节点会被访问2次（1、2、3）
- 可以根据该左子树的最右节点的右指针是否指向自己来知道是第几次来到了该节点
- 但是只能做到有左子树的情况下在左子树访问完了后回到该节点

## 时间复杂度

每个节点遍历的时候都要去找一下左子树的最右边界，是否会导致时间复杂度上升呢？

不会，为什么呢？

因为有左子树的节点遍历的左子树右边界中间所经过的节点时不同的，所以总代价是O(N)，即使遍历了2遍但是是常数级的，所以总体还是O(N)。

## 代码实现

```typescript
// morris 遍历
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

function morris(root: TreeNode | null) {
  if (root === null) {
    return
  }

  let cur = root
  let mostRight: TreeNode | null = null
  while (cur !== null) {
    // 先来到左子树
    mostRight = cur.left
    // 如果左子树不为空，那么找到最右节点
    if (mostRight !== null) {
      // 如果存在右节点且右节点的右指针不指向当前节点，那么一直向右移动
      while (mostRight.right && mostRight.right !== cur) {
        mostRight = mostRight.right
      }
      // 从上面的while里出来后，mostRight就是cur左子树上的最右的节点
      // 此时该节点的right要么为空要么为cur
      // 如果mostRight的最右指针为空，那么让right指向当前节点，当前节点向左移动
      if (mostRight.right === null) {
        mostRight.right = cur
        console.log(cur.val)
        cur = cur.left
        continue
      } else {
        // 不为空则重新指向null
        mostRight.right = null
      }
    }
    console.log(cur.val)
    // cur如果没有左子树，则向右移动
    // 或者cur左子树上的最右节点的右指针是指向cur的，则cur向右移动
    cur = cur.right
  }
}
const root = new TreeNode(1)
const node1 = new TreeNode(2)
const node2 = new TreeNode(3)
const node3 = new TreeNode(4)
const node4 = new TreeNode(5)
const node5 = new TreeNode(6)
const node6 = new TreeNode(7)
root.left = node1
root.right = node2
node1.left = node3
node1.right = node4
node2.left = node5
node2.right = node6
node3.left = node3.right = null
node4.left = node4.right = null
node5.left = node5.right = null
node6.left = node6.right = null

morris(root)
```

## 如何改成先序遍历

- 如果一个节点只能达到一次，直接打印
- 如果一个节点可以到达两次，那么第一次打印

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753858403690-00ebf65c-e2db-48f8-8103-7728b5e4c510.png)

## 如何改成中序遍历

- 如果一个节点只能达到一次，直接打印
- 如果一个节点可以到达两次，那么第二次打印

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753858614144-8870c099-baf9-4c0c-868c-642fbb539a2a.png)

## 如何改成后序遍历

- 只处理能够第二次访问到的节点
- 当第二次访问到该节点的时候逆序打印该节点**左树的右边界，**如下图，逆序打印3节点左树的右边界，就是9、8、6

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753859358171-fe0a00b2-8f4d-40b6-9d99-9de1c0acda9a.png)

- 最后打印整棵树的**右边界，**如上图就是7、3、1

如何做到空间复杂度是O(1)用有限几个变量来逆序打印右边界呢？

相当于去进行链表的逆序与恢复，首先将左子树的最右节点的right指向null，然后依次将节点节点的right指针指向父节点，然后打印完了之后恢复即可。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1754554273876-d9b12f0a-34b3-4ab4-b71b-9df3262d7a56.png)![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1754554363345-7ea8a229-086b-459b-80f0-2dc4273ad9be.png)

```typescript
// morris 遍历改后序

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

function morrisPost(root: TreeNode | null) {
  if (root === null) {
    return
  }

  let cur = root
  let mostRight: TreeNode | null = null
  while (cur !== null) {
    // 先来到左子树
    mostRight = cur.left
    // 如果左子树不为空，那么找到最右节点
    if (mostRight !== null) {
      // 如果存在右节点且右节点的右指针不指向当前节点，那么一直向右移动
      while (mostRight.right && mostRight.right !== cur) {
        mostRight = mostRight.right
      }
      // 找到了最右节点
      // 如果mostRight的最右指针为空，那么让right指向当前节点，当前节点向左移动
      if (mostRight.right === null) {
        mostRight.right = cur
        cur = cur.left
        continue
      } else {
        // 不为空则重新指向null
        mostRight.right = null
        // 第二次来到这个节点时，逆序打印其左子树的右边界
        printEdge(cur.left)
      }
    }
    cur = cur.right
  }
  // 最后逆序打印整棵树的右边界
  printEdge(root)
}
// 逆序打印
function printEdge(node: TreeNode) {
  const tail = reverseEdge(node)
  let cur = tail
  while (cur) {
    console.log(cur.val)
    cur = cur.right
  }
  // 打印完后再还原回来
  reverseEdge(tail)
}

// 逆序边界节点：让节点的右指针指向上一个节点
function reverseEdge(from: TreeNode) {
  let pre: TreeNode | null = null
  let next: TreeNode | null = null
  while (from) {
    next = from.right // 防止断掉，先指向下一个节点
    from.right = pre
    pre = from
    from = next
  }
  return pre
}
const root = new TreeNode(1)
const node1 = new TreeNode(2)
const node2 = new TreeNode(3)
const node3 = new TreeNode(4)
const node4 = new TreeNode(5)
const node5 = new TreeNode(6)
const node6 = new TreeNode(7)
root.left = node1
root.right = node2
node1.left = node3
node1.right = node4
node2.left = node5
node2.right = node6
node3.left = node3.right = null
node4.left = node4.right = null
node5.left = node5.right = null
node6.left = node6.right = null

morrisPost(root)
```

## 使用morris遍历判断是否是搜索二叉树

- 声明一个变量保存之前的值
- 在中序遍历处理的地方去判断当前值是否小于等于之前的值，如果是则返回false；否则将当前值变为前一个值，最后如果都没有返回false的情况，返回true。

https://leetcode.cn/problems/validate-binary-search-tree/description/

```typescript
 // 使用morris遍历判断
function isValidBST(root: TreeNode | null) {
    if (root === null) {
        return true
    }
    let cur = root
    let preValue = -Infinity
    let mostRight: TreeNode | null = null
    while(cur) {
        mostRight = cur.left
        if (mostRight !== null) {
            // 找到当前节点左子树的最右节点
            while(mostRight.right && mostRight.right !== cur) {
                mostRight = mostRight.right
            }
            // 来到这里说明找到了左子树的最右节点
            // 此时该节点的right要么为空要么为cur
            if (mostRight.right === null) {
                // 让左子树的最右节点的right指向cur，cur左移，继续
                mostRight.right = cur
                cur = cur.left
                continue
            } else {
                mostRight.right = null
            }
        }
        // 来到这里说明要么左子树为空，要么第二次来到了该节点，处理搜索二叉树判断逻辑
        if (preValue >= cur.val) return false
        preValue = cur.val
        // 向右移动
        cur = cur.right
    }
    return true
}
```

## 总结

1. 如果一个题目必须需要左树与右树信息后回到该节点才能进行处理那么这种只能使用递归
2. 如果一个题目不需要左树右树信息的强整合，比如遍历、判断是否是搜索二叉树，那么morris遍历就是最优解