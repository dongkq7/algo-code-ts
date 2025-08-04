// https://leetcode.cn/problems/largest-bst-subtree/

/**
 * 给定一个二叉树，找到其中最大的二叉搜索树（BST）子树，并返回该子树的大小。其中，最大指的是子树节点数最多的。
 * 二叉搜索树（BST）中的所有节点都具备以下属性：
 * 左子树的值小于其父（根）节点的值
 * 右子树的值大于其父（根）节点的值
 * 注意：子树必须包含其所有后代
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

function largestBSTSubtree(root: TreeNode | null): number {
  return root ? process(root).maxSize : 0
}
function process(node: TreeNode | null): {
  min: number // 子树最小值（仅当是BST时有效）
  max: number // 子树最大值（仅当是BST时有效）
  isBST: boolean // 当前子树是否为BST
  maxSize: number // 子树中最大BST的节点数（合并了原size和maxSize）
} {
  if (!node) {
    return {
      min: Infinity,
      max: -Infinity,
      isBST: true,
      maxSize: 0, // 空节点作为BST的尺寸为0
    }
  }

  const left = process(node.left)
  const right = process(node.right)

  // 判断当前子树是否为BST
  const isBST =
    left.isBST && right.isBST && left.max < node.val && node.val < right.min

  // 计算当前子树的min和max（仅当是BST时有效）
  let min = node.val
  let max = node.val
  if (left.maxSize > 0) min = Math.min(min, left.min) // 左子树非空时取左min
  if (right.maxSize > 0) max = Math.max(max, right.max) // 右子树非空时取右max

  // 计算最大BST节点数：
  // 若当前是BST，则maxSize = 左BST尺寸 + 右BST尺寸 + 1（即原size）
  // 若不是BST，则maxSize = 左右子树中最大的BST尺寸（即原maxSize）
  const maxSize = isBST
    ? left.maxSize + right.maxSize + 1
    : Math.max(left.maxSize, right.maxSize)

  return { min, max, isBST, maxSize }
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
node2.left = null
node2.right = node5
node3.left = node3.right = null
node4.left = node4.right = null
node5.left = node5.right = null

console.log(largestBSTSubtree(root))
export {}
