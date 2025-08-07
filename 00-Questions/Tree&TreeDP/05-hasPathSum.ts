// https://leetcode.cn/problems/path-sum/

/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum
 * 判断该树中是否存在 根节点到叶子节点 的路径
 * 这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true
 * 否则，返回 false
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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  // 空树直接返回 false
  if (!root) return false

  // 减去当前节点值
  const remaining = targetSum - root.val

  // 若为叶节点，检查剩余值是否为 0
  if (!root.left && !root.right) {
    return remaining === 0
  }

  // 递归检查左子树和右子树
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining)
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

console.log(hasPathSum(root, 11))
export {}
