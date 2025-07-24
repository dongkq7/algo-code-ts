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
