// https://leetcode.cn/problems/sum-of-left-leaves/

/**
 * 给定二叉树的根节点 root ，返回所有左叶子之和。
 * 【注意】是左叶子节点，不是左子节点！
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

function sumOfLeftLeaves(root: TreeNode | null): number {
  if (!root) return 0
  let sum = 0
  // 如果当前节点是叶子节点则累加
  if (root.left && !root.left.left && !root.left.right) {
    sum += root.left.val
  } else {
    // 不是叶子节点则继续向左去寻找
    sum += sumOfLeftLeaves(root.left)
  }

  // 递归处理右子树，寻找右子树的左叶子节点
  sum += sumOfLeftLeaves(root.right)
  return sum
}

const root = new TreeNode(10)
const node1 = new TreeNode(5)
const node2 = new TreeNode(15)
const node3 = new TreeNode(1)
const node4 = new TreeNode(8)
const node5 = new TreeNode(7)
root.left = node1
root.right = node2
node1.left = node3
node1.right = node4
node2.left = node5
node2.right = null
node3.left = node3.right = null
node4.left = node4.right = null
node5.left = node5.right = null

console.log(sumOfLeftLeaves(root))
export {}
