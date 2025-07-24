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

export {}
