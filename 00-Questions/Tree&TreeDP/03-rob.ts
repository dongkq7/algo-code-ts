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

function rob(root: TreeNode | null): number {
  const [maxVal1, maxVal2] = process(root)
  return Math.max(maxVal1, maxVal2)
}

function process(root: TreeNode | null): number[] {
  if (!root) {
    return [0, 0]
  }
  // 盗取root节点时
  let maxVal1 = root.val
  // 不盗取root节点时
  let maxVal2 = 0
  const [leftVal1, leftVal2] = process(root.left)
  const [rightVal1, rightVal2] = process(root.right)
  // 盗取root节点时的金额 = 节点金额 + 不盗取左子树金额+不盗取右子树金额
  maxVal1 = maxVal1 + leftVal2 + rightVal2
  maxVal2 =
    maxVal2 + Math.max(leftVal1, leftVal2) + Math.max(rightVal1, rightVal2)
  return [maxVal1, maxVal2]
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
console.log(rob(root))
export {}
