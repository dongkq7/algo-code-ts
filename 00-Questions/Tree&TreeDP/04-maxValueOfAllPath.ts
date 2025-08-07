/**
 * 二叉树每个结点都有一个数值类型型权值，给定一棵二叉树，要求计算出从根结点到叶结点的所有路径中；权值和最大的值为多少。
 */

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

function maxValueOfAllPath(root: TreeNode | null) {
  if (!root) return 0
  return process(root)
}

function process(node: TreeNode | null): number {
  if (!node) return 0

  // 左树要信息
  let leftValue = process(node.left)
  let rightValue = process(node.right)

  // 路径和最大的信息为左树与右树较大的值+自身节点的值
  return Math.max(leftValue, rightValue) + node.val
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
console.log(maxValueOfAllPath(root))
export {}
