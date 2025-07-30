# 二叉树节点遍历汇总

## 一、递归遍历方式的实现

### 先来看下什么是递归序

对于如下节点结构的二叉树

```typescript
class TreeNode<T> {
  value: T
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}
class BSTree<T> {
  root: TreeNode<T> | null = null
}
```

先来分析如下代码的递归序是如何的？假如有如下代码：

```typescript
function f(root: BSTree) {
  // 第一部分逻辑
  if (root === null) {
    return
  }
  console.log(root.value)
  // 第一部分逻辑
  f(root.left)
  // 第二部分逻辑
  console.log(root.value)
  f(root.right)
  // 第三部分逻辑
  console.log(root.value)
}
```

- 节点在遍历的时候首先会执行第一部分的逻辑
- 然后执行`f(root.left)`，由于执行完`f(root.left)`返回了之后，回到本体，才能执行`f(root.right)`所以会先执行第二部分逻辑
- 同理，执行`f(root.right)`，该函数返回之后回到本体，然后执行第三部分逻辑
- 也就是说一个节点在执行如上逻辑的时候，会回到自己三次
- 这个顺序就是递归序

假如二叉树如下：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753165641217-70141dad-36d2-4dc1-a428-8a24c66f3b62.png)



- 首先会来到1，调其left，来到2, 2还会调其left，来到4
- 此时4的left为空会直接返回，又来到了4，然后4去调其right，又为空又返回了，所以再次来到4
- 然后4执行完毕返回，来到了2，此时2的left执行完毕
- 2去调其right，来到了5
- 接下来5调其left为空直接返回，又来到了5。然后5调其right为空直接返回，再次来到5
- 此时5执行完毕，返回，来到了2
- 2此时执行完毕，返回来到了1，此时1的left执行完毕
- 1去调其right，来到了3
- 3调其left，来到了6
- 6调其left为空，返回，再次来到6。然后调其right为空，返回，又来到了6。此时6执行完毕，返回，来到了3
- 3调其right来到了7
- 7调其left为空，返回，再次来到7。然后调其right为空，返回，又来到了7。此时7执行完毕，返回，来到了3
- 3此时执行完毕返回，最后又来到了1
- 1此时执行完毕

**所以这棵树的递归序为：1 -> 2 -> 4 -> 4 -> 4 -> 2 -> 5 -> 5 -> 5 -> 2 -> 1 -> 3 -> 6 -> 6 -> 6 -> 3 -> 7 -> 7 -> 7 -> 3 -> 1**



### 三种顺序的遍历

在递归序的基础上可以加工出三种顺序的遍历

#### 先序遍历

- 先序 **对于每棵子树来说，都是先打印头节点，再打印左节点、最后打印右节点**

如何通过递归序来加工呢？即：第一次来到这个节点的时候打印，第二次与第三次来到这个节点的时候什么都不做

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753166579695-3f2eb554-9222-424d-909f-017949e0bc8e.png)

```typescript
function preOrderRecur(root: BSTree) {
  if (root === null) {
    return
  }
  // 只在第一次来到这个节点的时候打印
  console.log(root.value)
  
  preOrderRecur(root.left)
  preOrderRecur(root.right)
}
```

#### 中序遍历

- 中序 **对于每棵子树来说，都是先打印左节点，再打印头节点、最后打印右节点**

如何通过递归序来加工呢？即：第二次来到这个节点的时候打印，第一次与第三次来到这个节点的时候什么都不做



![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753166946701-8886edda-c418-4271-a903-0d90ead72c1f.png)

```typescript
function inOrderRecur(root: BSTree) {
  if (root === null) {
    return
  }
  inOrderRecur(root.left)
  // 只在第二次来到这个节点的时候打印
  console.log(root.value)
  inOrderRecur(root.right)
}
```

#### 后序遍历

- 后序 **对于每棵子树来说，都是先打印左节点，再打印右节点、最后打印头节点**

如何通过递归序来加工呢？即：第三次来到这个节点的时候打印，第一次与第二次来到这个节点的时候什么都不做

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753167090956-e764988f-d558-49d6-8130-98218100eca4.png)

```typescript
function posOrderRecur(root: BSTree) {
  if (root === null) {
    return
  }
  posOrderRecur(root.left)
  posOrderRecur(root.right)
  // 只在最后一次来到这个节点的时候打印
   console.log(root.value)
}
```

## 二、非递归遍历方式的实现

### 先序遍历

https://leetcode.cn/problems/binary-tree-preorder-traversal/description/

准备一个栈，先把头节点入栈

- 每次在栈中弹出一个节点cur，处理cur
- 先把cur右子节点入栈、再把cur左子节点入栈 （如果有的话）
- 重复这两步操作...

```typescript
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

function preorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []
  if (root !== null) {
    const stack = []
    stack.push(root)
    while (stack.length !== 0) {
      root = stack.pop()
      result.push(root.val)
      if (root.right !== null) {
        stack.push(root.right)
      }
      if (root.left !== null) {
        stack.push(root.left)
      }
    }
  }
  return result
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

console.log(preorderTraversal(root))
```

### 中序遍历

准备一个栈

- 如果root不为空，先将root进栈，然后将其左子节点的所有左子节点都进栈
- 然后从栈中弹出，弹出的节点的值进入到结果数组中
- 然后获得弹出节点的右子节点，再循环，将右子节点的左边界进栈...

只要有左节点就一直获得左子节点压进去，如果没有左子节点那么就窜到右边去继续压左子节点进去

为什么这样做就是中序遍历了呢？？

**因为任何一可棵子树都是先将左边界压进去的，顺序是先头再左，出来就是先左再头**

**然后头节点出来的时候又会继续将其右子数的所有左子节点入栈，周而复始。**

**所以大的顺序就是 左 头 右**

```typescript
// 中序遍历
// https://leetcode.cn/problems/binary-tree-inorder-traversal/description/

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

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []
  if (root !== null) {
    const stack: TreeNode[] = []
    while (stack.length !== 0 || root !== null) {
      if (root !== null) {
        stack.push(root)
        root = root.left // root向左子树移动，将所有左子节点入栈
      } else {
        // 来到这里说明没有左子节点了则出栈
        root = stack.pop()
        // 记录结果
        result.push(root.val)
        // 再将右子数进行相同的处理
        root = root.right
      }
    }
  }
  return result
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

console.log(inorderTraversal(root))

export {}
```





### 后序遍历

https://leetcode.cn/problems/binary-tree-postorder-traversal/description/

- 准备两个栈，其中一个作为收集栈
- 先将头节点压入栈中并弹出，记作cur，并将cur放入收集栈中
- 先压左节点再压右节点
- 重复这些操作
- 那么收集栈中弹出元素的顺序便是后序遍历节点的顺序

因为在第一个栈中弹出的顺序是头 -> 右 -> 左，所以在收集栈中弹出的顺序是左 -> 右 -> 头

```typescript
// 后序遍历
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

function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []
  if (root === null) return result
  
  const mainStack: TreeNode[] = []
  const collectStack: TreeNode[] = [] // 收集栈

  mainStack.push(root)
  while (mainStack.length !== 0) {
    root = mainStack.pop()
    collectStack.push(root)

    // 由于要先访问右子节点，所以先压左子节点
    if (root.left) {
      mainStack.push(root.left)
    }

    if (root.right) {
      mainStack.push(root.right)
    }
  }
  while (collectStack.length > 0) {
    result.push(collectStack.pop().val)
  }
  return result
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

console.log(postorderTraversal(root))
```

### 层序遍历

准备一个队列

- 先把头节点放入到队列中，弹出进行处理
- 然后将左子节点放入、再将右子节点放入
- 依次进行

扩展，如何知道是哪些节点是同一层的，并且拿到最大宽度？

- 定义几个变量`curend`（当前层最后一个节点）`nextend`（下一层最后一个节点）`curlevelnode`（当前层节点数）`max`（最大宽度）
- 首先，根节点进队列，此时`curend`为节点1，`nextend`为null，`curlevelnode`为0

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753236965327-480279ad-9906-4fa6-8711-8e21f4a3eacf.png)

- 接着节点1出队，然后节点1的左子节点2先入队，nextend变为节点2。然后右子节点3入队，nextend变为3。由于curend为节点1，所以至此节点1这一层遍历完毕，curlevel变为1。后面再也不可能回到这一层了，所以max捕获一下，变为1。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753236885827-4170d392-eda4-40f8-961a-04e6b4d0a32c.png)

- 现在该遍历一下层了，nextend拷贝上来变为curend，然后将nextend置为null，curlevel变为0

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753236792290-5e87f7e6-8a2f-42d8-90f9-6718c44de8fc.png)

- 节点2出队，然后左子节点4入队，nextend变为节点4，此时节点2不是curend，所以curlevelnode + 1 变为1
- 然后节点3出队，左子节点5入队，nextend变为节点5，右子节点6入队，nextend变为节点6，curlevelnode + 1变为2。由于节点3是curend，所以max捕获一下目前的curlevelnode，为2。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753237278046-706cb442-e609-41d4-941e-952c0343016a.png)

- 然后开始遍历下一层，nextend拷贝上来，curend变为节点6，依次类推...

```typescript
function levelOrder(root: TreeNode | null): number {
  if (root === null) return 0

  const queue: TreeNode[] = []
  // 根节点入栈
  queue.push(root)
  let curend = root
  let nextend = null
  let curlevelNode = 0 // 当前是第几层
  let max = 0
  while (queue.length !== 0) {
    root = queue.shift()
    curlevelNode++
    if (root.left) {
      // 存在左子节点，左子节点入队
      queue.push(root.left)
      nextend = root.left // nextend变为左子节点
    }
    if (root.right) {
      // 存在右子节点，右子节点入队
      queue.push(root.right)
      nextend = root.right // nextend变为右子节点
    }
    // 当前节点是本层最后一个节点
    if (curend === root) {
      max = Math.max(curlevelNode, max) // 开始遍历下一层了，层数+1
      curend = nextend // 改变当前层结束节点
      nextend = null // 下一层结束变为null
      curlevelNode = 0 // 重置当前层节点数
    }
  }
  return max
}
```

Leetcode上类似题目：

```typescript
// 层序遍历
// https://leetcode.cn/problems/binary-tree-level-order-traversal/description/

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

function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) return []
  const result: number[][] = []

  const queue: TreeNode[] = []
  // 根节点入栈
  queue.push(root)
  let curend = root
  let nextend = null
  let curlevel = 1 // 当前是第几层
  while (queue.length !== 0) {
    root = queue.shift()
    if (root.left) {
      // 存在左子节点，左子节点入队
      queue.push(root.left)
      nextend = root.left // nextend变为左子节点
    }
    if (root.right) {
      // 存在右子节点，右子节点入队
      queue.push(root.right)
      nextend = root.right // nextend变为右子节点
    }
    // 存储当前节点的遍历结果
    if (result[curlevel - 1]?.length) {
      result[curlevel - 1].push(root.val)
    } else {
      result[curlevel - 1] = [root.val]
    }
    // 当前节点是本层最后一个节点
    if (curend === root) {
      curlevel++ // 开始遍历下一层了，层数+1
      curend = nextend // 改变当前层结束节点
      nextend = null // 下一层结束变为null
    }
  }
  return result
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

console.log(levelOrder(root))

export {}
```

# 是不是搜索二叉树

根据搜索二叉树的特点：每棵子树都需要满足左子节点小于根节点的值，根节点的值小于右子节点的值

**所以通过中序遍历就可以改造，根据这个特点，中序遍历过程中搜索二叉树的值一定是升序的。**



## 递归方式

假设要求以X为根节点的树是否为搜索二叉树，那么必须满足以下条件

- 其左子树是搜索二叉树
- 其右子树是搜索二叉树
- 左子树最大值小于X的值
- 右子树的最小值大于X的值

那么基于以上条件，就得到了X需要的信息：

- 左子树是否是搜索二叉树、左子树的最大值
- 右子树是否是搜索二叉树、右子树的最小值

对于这个题目来说，就是向左子树与右子树要信息，但是信息不同，为了能够使用递归来解决，**那么信息结构体就要统一成：是否是搜索二叉树、该树最大值、该树最小值**

由于这里basecase（root === null）时 min与max返回什么都不太好，所以果断返回null，在进行处理的时候注意判断null的情况即可

```typescript
function isValidBST(root: TreeNode | null): boolean {
  const res = helper(root)
  return res === null ? true : res.isBST
}

function helper(
  root: TreeNode | null
): { isBST: boolean; min: number; max: number } | null {
  if (root === null) {
    return null
  }
  const leftInfo = helper(root.left)
  const rightInfo = helper(root.right)

  let isBST = true
  let min = root.val
  let max = root.val
  if (leftInfo !== null) {
    min = Math.min(leftInfo.min, min)
    max = Math.max(leftInfo.max, max)
  }

  if (rightInfo !== null) {
    min = Math.min(rightInfo.min, min)
    max = Math.max(rightInfo.max, max)
  }

  // 如果左子树不是搜索二叉树或者max大于等于val那么返回false
  if (leftInfo !== null && (!leftInfo.isBST || leftInfo.max >= root.val)) {
    isBST = false
  }
  // 如果右子树不是搜索二叉树或者min小于等于val那么返回false
  if (rightInfo !== null && (!rightInfo.isBST || rightInfo.min <= root.val)) {
    isBST = false
  }
  return { isBST, min, max }
}
```



## 非递归方式

```typescript
// 判断一棵树是不是搜索二叉树
// https://leetcode.cn/problems/validate-binary-search-tree/description/

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

function isValidBST(root: TreeNode | null): boolean {
  if (root !== null) {
    const stack: TreeNode[] = []
    let preVal = Number.NEGATIVE_INFINITY
    while (stack.length !== 0 || root !== null) {
      if (root !== null) {
        stack.push(root)
        root = root.left // root向左子树移动，将所有左子节点入栈
      } else {
        // 来到这里说明没有左子节点了则出栈
        root = stack.pop()
        if (root.val <= preVal) {
          return false
        }
        preVal = root.val
        // 再将右子数进行相同的处理
        root = root.right
      }
    }
  }
  return true
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

// const root = new TreeNode(0)

console.log(isValidBST(root))

export {}
```

# 是不是完全二叉树

使用层序遍历

- 任何一个节点有右子节点无左子节点直接返回false
- 在满足上一点的情况下，如果遇到了第一个左右叶子节点不双全的情况下，那么接下来的所有节点均为叶子节点，否则不是完全二叉树

如下图，节点6满足第一点，有左子节点，但是没有右子节点，那么接下来的节点7 8 9 10 11 12都必须是叶子节点

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753244624285-5ce2aed5-528e-4c99-be77-36a1230f8f9e.png)

```typescript
// 判断一棵树是不是完美二叉树

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

function isCBT(root: TreeNode | null): boolean {
  if (root === null) return true

  let isLeaf = false // 是否之后的节点都应该是叶子节点
  let l = null // 左子节点
  let r = null // 右子节点
  const queue: TreeNode[] = []
  queue.push(root)

  while (queue.length !== 0) {
    root = queue.shift()
    l = root.left
    r = root.right
    // 如果之后的节点都应该是叶子节点但是当前节点不是叶子节点直接返回false
    // 或者该节点有右子节点没有左子节点也直接返回false
    if ((isLeaf && (l !== null || r !== null)) || (l === null && r !== null)) {
      return false
    }
    if (l !== null) {
      queue.push(l)
    }
    if (r !== null) {
      queue.push(r)
    }

    // 节点不双全的情况下开启isLeaf
    if (l === null || r === null) {
      isLeaf = true
    }
  }
  return true
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

console.log(isCBT(root))
```

# 是不是平衡二叉树

平衡二叉树是指，对于任何一棵子树，左树与右树的高度差不超过1

## 具体思路

假设要求以X为根节点的树是否为平衡二叉树，那么必须满足以下条件

- 其左子树是平衡二叉树
- 其右子树是平衡二叉树
- 左子树与右子树高度差不超过1

那么基于以上条件，就得到了X需要的信息：

- 左子树是否是平衡二叉树，左子树高度是多少
- 右子树是否是平衡二叉树，右子树高度是多少

对于这个题目来说，就是向左子树与右子树要信息，并且要的信息是一样的，那么信息结构体就确定了（都是要拿到是否是平衡二叉树、子树高度多少），使用递归来解就可以了

## 代码

```typescript
// 判断一棵树是不是平衡
// https://leetcode.cn/problems/balanced-binary-tree/

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
function isBalanced(root: TreeNode | null): boolean {
  return helper(root).isBalanced
}

function helper(root: TreeNode | null): {
  isBalanced: boolean
  height: number
} {
  if (root === null) {
    return { isBalanced: true, height: 0 }
  }
  const leftInfo = helper(root.left)
  const rightInfo = helper(root.right)

  const height = Math.max(leftInfo.height, rightInfo.height) + 1
  const isBalanced =
    leftInfo.isBalanced &&
    rightInfo.isBalanced &&
    Math.abs(leftInfo.height - rightInfo.height) < 2
  return { isBalanced, height }
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

console.log(isBalanced(root))
```

# 是不是满二叉树

【方案1】

- 统计节点个数 N
- 统计最大深度 L
- 满足`N=2L - 1`即为满二叉树

【方案2】

采用递归方式，那么就需要向左子树与右子树要如下信息

- 节点个数
- 高度

然后再进行加工：`当前树的高度=Math.max(左子树高度,右子树高度) + 1`、`当前树节点个数=左子树节点个数+右子树节点个数+1`

拿到当前树的信息后，通过节点个数是否等于2的高度次方-1

```typescript
// 判断一棵树是不是满二叉树

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
function isFull(root: TreeNode | null): boolean {
  if (root === null) return true
  const info = helper(root)
  // 将数字 1 向左移动 info.height 位，相当于计算 2 的 info.height 次幂（即 2^info.height）
  return info.nodes === (1 << info.height) - 1
}

function helper(root: TreeNode | null): {
  nodes: number
  height: number
} {
  if (root === null) {
    return { nodes: 0, height: 0 }
  }
  const leftInfo = helper(root.left)
  const rightInfo = helper(root.right)

  // 加工信息
  const height = Math.max(leftInfo.height, rightInfo.height) + 1
  const nodes = leftInfo.nodes + rightInfo.nodes + 1
  return { nodes, height }
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

console.log(isFull(root))

export {}
```

# 找到最近公共祖先

给定两个二叉树的节点node1和node2，找到它们的最近公共祖先

如下图

- E和K的最近公共祖先为E
- D与K的最近公共祖先为B
- D与G的最近公共祖先为A

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753251700567-89a0b4b6-868a-4303-b544-f64995c7d327.png)

## 具体思路

先来看node1与node2可能的情况有哪些？

- 情况1：node1直接就是node2的最近公共最先，或者node2直接就是node1的最低公共祖先

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753252390290-d491e0ef-b5bb-4c1d-af9c-c2625732cd10.png)

- 情况2：node1与node2不互为最近公共祖先，需要通过汇聚的方式来找到它们的最近公共祖先

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753252456093-7ea1aa46-cda2-4a4b-9b81-81b6ad97c7f7.png)

一共就这两中情况

- 先来看第一种情况，不妨设node1就是node2的最近公共祖先

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753252578519-bccac8d4-2f50-43cc-980d-0106c7be4cd2.png)

如上这种情况就需要返回E。

1. 首先这棵树如果是null那么就直接返回null，如果不为null那么就看左子树与右子树，如果某个子树上不存在node1也不存在node2，那么直接返回null，因为这样这棵子树上就不肯定不会存在node1和node2的最近公共祖先。
2. 对于另一个子树上如果遇到node1或者node2就直接返回，那么最终根节点拿到的就是node1或者node2，那么对于这中情况来说就是对的，因为这样最终根节点拿到的结果就是E，而E就是E和K的最近公共祖先。
3. 综上，对于根节点A来说，左子树拿到的是E，右子树拿到的是null，最终答案为E



- 再来看第二种情况

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753253332854-51ef2743-e046-4962-8fe1-378b680270b0.png)

如上这种情况要返回B

1. 首先根节点A向左子树与右子树要答案

- 右子树没有node1也没有node2，得到null

1. A向左子树要答案过程如下

- 首先到B
- B也向左树要答案
- 到D，D也像左树要答案，拿到node1，向右树要答案得到null。对于D来说左树为node1，右树为null，那么最终返回node1
- 那么B将拿到左子树返回的node1G
- 然后B向右访问，B右树返回值取决于E，E取决于F，F左子树会返回K，右子树会返回null，所以最终拿到node2 K。然后返回给E，由于E的左子树拿到null，右子树拿到node2，所以E会将node2返回给B，那么B拿到右子树的返回值node2 K 
- **那么对于B来说，左子树拿到了node1，右子树拿到了node2，那么说明B就是node1与node2的最近公共祖先那么就返回自己给根节点**

1. 对于根节点A来说，左子树拿到的是节点B，右子树拿到的是null，所以汇总为节点B，就得到了最终答案

## 代码

```typescript
// 找到两个节点的最近公共祖先
// https://leetcode.cn/problems/er-cha-shu-de-zui-jin-gong-gong-zu-xian-lcof/description/

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
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {

  // 如果节点为空或者找到了p或者找到了q直接返回
  if (root === null || root === p || root === q) {
    return root
  }
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)

  // 如果左子树拿到了，右子树也拿到了那么就说明当前节点就是最近公共祖先，直接返回
  if (left !== null && right !== null) {
    return root
  }
  // 左子树不为空返回左子树内容，否则返回右子树内容
  return left !== null ? left : right
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

console.log(lowestCommonAncestor(root, node3, node1).val)
```

# 找到后继节点

后继节点即中序遍历中的一个节点的下一个节点

比如下图

- 对于B的后继节点就是E，E的后继节点是A，A的后继节点是F，G后继节点是null，因为后面没了

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753254521827-4e4c03e6-666b-4eaa-a536-46dbde4b5b22.png)

【扩展】前驱节点即中序遍历中一个节点的前一个节点

如果用中序遍历来做，每次都要中序遍历一遍才能得到，代价太大了，这样需要时间复杂度为O(N)。那么可以为每个节点设置上parent来指向父节点，这样比如拿D的后继节点，直接通过parent就能找到B。如果拿E的后继节点只需要通过parent的parent就可以拿到了。也就是节点X与节点Y直接的距离假如为K，那么时间复杂度就可以优化到O(K)了。

TreeNode结构如下：



下面就要分情况来看如何找到后继节点了。

## 具体思路

假如要找到节点X的后继节点

- 情况1，节点X有右子树，那么其后继节点就是右子树的最左节点，**对于普通二叉树来说就是中序遍历中X对应的下一个节点，因为打印完X就该打印其右子树上的最左节点了（对于搜索二叉树来说，也就是右子树的最小值）**
- 情况2，节点X无右子树，那么就通过parent往上找，看其是不是parent的左子节点，如果不是那么就继续往上，直到找到该节点是其父节点的左子节点的那个父节点，这个父节点就是X的后继节点。**因为对于Y来说X是其左子树的最右节点，这样对于普通二叉树来说就是中序遍历中X对应的下一个节点，因为X是Y左子树上最后打印的那个节点，打印完X肯定就是Y了（对于搜索二叉树来说就是左子树的最大值）**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753255496206-fa2c20f0-ee82-4384-b8ea-8ac328acd4b8.png)

- 对于整棵树的最右节点来说就没有后继节点了，为null，因为它不是任何树的左子树上的最右节点

## 代码实现1

```typescript
// 找到后继节点

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  parent: TreeNode | null
  constructor(
    val?: number,
    left?: TreeNode | null,
    right?: TreeNode | null,
    parent?: TreeNode | null
  ) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
    this.parent = parent === undefined ? null : parent
  }
}
function getSuccessor(
  root: TreeNode | null,
  p: TreeNode | null
): TreeNode | null {
  if (root === null) {
    return null
  }

  // 如果当前节点有右子树，则去拿其右子树的最左节点
  if (p.right !== null) {
    return getLeftMost(p.right)
  } else {
    // 如果没有右子树，那么就去沿着parent向上找，直到找到是左子节点的那个节点的父节点
    let parent = p.parent
    // 如果parent为空都没找到，说明这个节点是整棵树的最右节点
    while (parent !== null && parent.left !== p) {
      p = parent
      parent = p.parent
    }
    return parent
  }
}

function getLeftMost(node: TreeNode) {
  while (node.left !== null) {
    node = node.left
  }
  return node
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
root.parent = null
node1.left = node3
node1.right = node4
node1.parent = root
node2.left = node5
node2.right = node6
node2.parent = root
node3.left = node3.right = null
node3.parent = node1
node4.left = node4.right = null
node4.parent = node1
node5.left = node5.right = null
node5.parent = node2
node6.left = node6.right = null
node6.parent = node2

console.log(getSuccessor(root, node3).val)
```

## 代码实现2（无parent，纯中序遍历实现）

为了找到树中的节点 p 的中序后继，最直观的方法是中序遍历。由于只需要找到节点 p 的中序后继，因此不需要维护完整的中序遍历序列，**只需要在中序遍历的过程中维护上一个访问的节点和当前访问的节点。如果上一个访问的节点是节点 p，则当前访问的节点即为节点 p 的中序后继。**

如果节点 p 是最后被访问的节点，则不存在节点 p 的中序后继，返回 null。

```typescript
function inorderSuccessor(
  root: TreeNode | null,
  p: TreeNode | null
): TreeNode | null {
  let preNode = null
  let curNode = root
  const stack = []
  while (stack.length !== 0 || curNode) {
    // 不断将左子节点放入到stack中
    if (curNode) {
      stack.push(curNode)
      curNode = curNode.left
    } else {
      // 走到这里说明已经没有左子节点了开始从stack中取
      curNode = stack.pop()
      // 如果前一个节点是p则当前节点即后继节点
      if (preNode === p) {
        return curNode
      }
      preNode = curNode
      // 继续去右子树进行相同的操作
      curNode = curNode.right
    }
  }
  // 来到这里说明没有后继节点
  return null
}
```

## 扩展-找到搜索二叉树的后继节点（不利用parent）



二叉搜索树的一个性质是中序遍历序列单调递增，因此二叉搜索树中的节点 p 的中序后继满足以下条件：

- **中序后继的节点值大于 p 的节点值；**

- **中序后继是节点值大于 p 的节点值的所有节点中节点值最小的一个节点。**

利用二叉搜索树的性质，可以在不做中序遍历的情况下找到节点 p 的中序后继。

- 如果节点 p 的右子树不为空，则节点 p 的中序后继在其右子树中，在其右子树中定位到最左边的节点，即为节点 p 的中序后继。

- 如果节点 p 的右子树为空，则需要从根节点开始遍历寻找节点 p 的祖先节点。

将答案初始化为 null。用 node 表示遍历到的节点，初始时 node=root。每次比较 node 的节点值和 p 的节点值，执行相应操作：

- **如果 node 的节点值大于 p 的节点值，则 p 的中序后继可能是 node 或者在 node 的左子树中，**因此用 node 更新答案，并将 node 移动到其左子节点继续遍历；
- **如果 node 的节点值小于或等于 p 的节点值，则 p 的中序后继可能在 node 的右子树中，**因此将 node 移动到其右子节点继续遍历。

由于在遍历过程中，当且仅当 node 的节点值大于 p 的节点值的情况下，才会用 node 更新答案，因此当节点 p 有中序后继时一定可以找到中序后继，当节点 p 没有中序后继时答案一定为 null。



```typescript
// 找到搜索二叉树的后继节点
// https://leetcode.cn/problems/inorder-successor-in-bst/description/

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  parent: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
function inorderSuccessor(
  root: TreeNode | null,
  p: TreeNode | null
): TreeNode | null {
  let successor: TreeNode | null = null
  // 如果p有右子树，则找到其右子树上的最左节点
  if (p.right) {
    successor = p.right
    while (successor.left) {
      successor = successor.left
    }
    return successor
  }

  // 如果没有右子树，从根节点开始找
  let node = root
  while (node) {
    // 如果当前节点大于p的值，那么后继节点可能在其左子树上
    if (node.val > p.val) {
      successor = node // 将后继节点记录成当前节点
      node = node.left
    } else {
      // 否则可能再其右子树上
      node = node.right
    }
  }
  return successor
}

const root = new TreeNode(5)
const node1 = new TreeNode(3)
const node2 = new TreeNode(6)
const node3 = new TreeNode(2)
const node4 = new TreeNode(4)
const node5 = new TreeNode(1)
root.left = node1
root.right = node2
node1.left = node3
node1.right = node4
node3.left = node5
node4.left = node4.right = null
node5.left = node5.right = null

console.log(inorderSuccessor(root, node3).val)

export {}
```

# 二叉树的序列化和反序列化

二叉树的序列化和反序列化就是内存里的一棵树如何变成字符串形式，又如何从字符串形式变成内存里的树

- 不限制变成什么样的字符串，只需要能表示一个完整的树并能够还原

## 具体思路

使用先序、中序、后序、层序都可以

拿先序遍历为例，假如有如下两棵树

- 如果以val + _的方式来表示节点的值，#_的方式来表示空节点的内容，那么对于以下两棵树的先序遍历的序列化结果如下

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753262974972-9328aa18-52ad-4899-a3d1-4e5f3e0992bb.png)



## 代码实现

```typescript
// 二叉树的序列化与反序列化
// https://leetcode.cn/problems/h54YBf/description/

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  parent: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
function serialize(root: TreeNode | null): string {
  if (!root) return '#_'
  let res = root.val + '_'
  res += serialize(root.left)
  res += serialize(root.right)
  return res
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const strs = data.split('_')
  const nodeVals: string[] = []
  for (let i = 0; i < strs.length; i++) {
    nodeVals.push(strs[i])
  }
  return createTree(nodeVals)
}

function createTree(queue: string[]): TreeNode | null {
  if (queue.length === 0) return null
  const str = queue.shift()
  if (str === '#') {
    return null
  }
  const root = new TreeNode(Number(str))
  root.left = createTree(queue)
  root.right = createTree(queue)
  return root
}

const root = new TreeNode(5)
const node1 = new TreeNode(3)
const node2 = new TreeNode(6)
const node3 = new TreeNode(2)
const node4 = new TreeNode(4)
const node5 = new TreeNode(1)
root.left = node1
root.right = node2
node1.left = node3
node1.right = node4
node3.left = node5
node4.left = node4.right = null
node5.left = node5.right = null

const str = serialize(root)
console.log(str)
console.log(deserialize(str).val)
```

# 树形PD汇总

在求解如下问题的时候都可以使用树形DP（递归）来解决

- 一棵树是否是搜索二叉树
- 一棵树是否是平衡二叉树
- 一棵树是否是满二叉树

因为以上三个问题都可以归为这一类：**通过向左子树要信息与右子树要信息便可以得到解决。像类似于这种问题的，都可以使用树形DP来解决。**

## 是否是搜索二叉树？

假设要求以X为根节点的树是否为搜索二叉树，那么必须满足以下条件

- 其左子树是搜索二叉树
- 其右子树是搜索二叉树
- 左子树最大值小于X的值
- 右子树的最小值大于X的值

那么基于以上条件，就得到了X需要的信息：

- 左子树是否是搜索二叉树、左子树的最大值
- 右子树是否是搜索二叉树、右子树的最小值

对于这个题目来说，就是向左子树与右子树要信息，但是信息不同，为了能够使用递归来解决，**那么信息结构体就要统一成：是否是搜索二叉树、该树最大值、该树最小值**

```typescript
function isValidBST(root: TreeNode | null): boolean {
  const res = helper(root)
  return res === null ? true : res.isBST
}

function helper(
  root: TreeNode | null
): { isBST: boolean; min: number; max: number } | null {
  if (root === null) {
    return null
  }
  const leftInfo = helper(root.left)
  const rightInfo = helper(root.right)

  let isBST = true
  let min = root.val
  let max = root.val
  if (leftInfo !== null) {
    min = Math.min(leftInfo.min, min)
    max = Math.max(leftInfo.max, max)
  }

  if (rightInfo !== null) {
    min = Math.min(rightInfo.min, min)
    max = Math.max(rightInfo.max, max)
  }

  // 如果左子树不是搜索二叉树或者max大于等于val那么返回false
  if (leftInfo !== null && (!leftInfo.isBST || leftInfo.max >= root.val)) {
    isBST = false
  }
  // 如果右子树不是搜索二叉树或者min小于等于val那么返回false
  if (rightInfo !== null && (!rightInfo.isBST || rightInfo.min <= root.val)) {
    isBST = false
  }
  return { isBST, min, max }
}
```

## 是否是平衡二叉树

假设要求以X为根节点的树是否为平衡二叉树，那么必须满足以下条件

- 其左子树是平衡二叉树
- 其右子树是平衡二叉树
- 左子树与右子树高度差不超过1

那么基于以上条件，就得到了X需要的信息：

- 左子树是否是平衡二叉树，左子树高度是多少
- 右子树是否是平衡二叉树，右子树高度是多少

对于这个题目来说，就是向左子树与右子树要信息，并且要的信息是一样的，那么信息结构体就确定了（都是要拿到是否是平衡二叉树、子树高度多少），使用递归来解就可以了

```typescript
function isBalanced(root: TreeNode | null): boolean {
  return helper(root).isBalanced
}

function helper(root: TreeNode | null): {
  isBalanced: boolean
  height: number
} {
  if (root === null) {
    return { isBalanced: true, height: 0 }
  }
  const leftInfo = helper(root.left)
  const rightInfo = helper(root.right)

  const height = Math.max(leftInfo.height, rightInfo.height) + 1
  const isBalanced =
    leftInfo.isBalanced &&
    rightInfo.isBalanced &&
    Math.abs(leftInfo.height - rightInfo.height) < 2
  return { isBalanced, height }
}
```

## 是否是满二叉树

采用递归方式，那么就需要向左子树与右子树要如下信息

- 节点个数
- 高度

然后再进行加工：`当前树的高度=Math.max(左子树高度,右子树高度) + 1`、`当前树节点个数=左子树节点个数+右子树节点个数+1`

拿到当前树的信息后，通过节点个数是否等于2的高度次方-1

```typescript
function isFull(root: TreeNode | null): boolean {
  if (root === null) return true
  const info = helper(root)
  // 将数字 1 向左移动 info.height 位，相当于计算 2 的 info.height 次幂（即 2^info.height）
  return info.nodes === (1 << info.height) - 1
}

function helper(root: TreeNode | null): {
  nodes: number
  height: number
} {
  if (root === null) {
    return { nodes: 0, height: 0 }
  }
  const leftInfo = helper(root.left)
  const rightInfo = helper(root.right)

  // 加工信息
  const height = Math.max(leftInfo.height, rightInfo.height) + 1
  const nodes = leftInfo.nodes + rightInfo.nodes + 1
  return { nodes, height }
}
```