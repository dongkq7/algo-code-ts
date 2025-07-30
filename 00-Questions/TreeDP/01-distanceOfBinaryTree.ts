// https://leetcode.cn/problems/diameter-of-binary-tree/description/
// 注意leetcode上的类似题目求的是边数，是最大距离-1
/**
 * 从二叉树的节点a出发，可以向上或者向下走，但沿途的节点只能经过一次
 * 到达节点b时路径上的节点个数叫作a到b的距离
 * 那么二叉树任何两个节点之问都有距离，求整棵树上的最大距离
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

function distanceOfBinaryTree(root: TreeNode | null): number {
  return process(root).maxDistance
}

function process(root: TreeNode | null) {
  if (root === null) {
    return { maxDistance: 0, height: 0 }
  }

  const leftInfo = process(root.left) // 左子树信息
  const rightInfo = process(root.right) // 右子树信息
  const p1 = leftInfo.maxDistance
  const p2 = rightInfo.maxDistance
  const p3 = leftInfo.height + 1 + rightInfo.height
  // 该节点整体最大距离为头节点参与的距离与左树最大距离、右树最大距离中的最大值
  const maxDistance = Math.max(p1, p2, p3)
  const height = Math.max(leftInfo.height, rightInfo.height) + 1
  return { maxDistance, height }
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

console.log(distanceOfBinaryTree(root))
export {}
