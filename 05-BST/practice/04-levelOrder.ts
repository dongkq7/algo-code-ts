// 层序遍历
// https://leetcode.cn/problems/binary-tree-level-order-traversal/

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
