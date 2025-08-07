// https://leetcode.cn/problems/count-complete-tree-nodes/

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

// 求完全二叉树的节点个数
function countNodes(root: TreeNode | null): number {
  if (!root) return 0
  return nc(root, 1, mostLeftLevel(root, 1))

  // 递归计算以node为头的节点的完全二叉树的节点个数
  function nc(node: TreeNode | null, level: number, h: number): number {
    // 到了最后一层了，没有子节点了，直接返回1
    if (level === h) return 1

    if (mostLeftLevel(node.right, level + 1) === h) {
      // 如果右树的最大深度到达了h，说明左子树是满二叉树
      return (1 << (h - level)) + nc(node.right, level + 1, h)
    } else {
      // 否则说明右树是满二叉树
      return (1 << (h - level - 1)) + nc(node.left, level + 1, h)
    }
  }
  // node在level层，求以node为头的完全二叉树的最大深度
  function mostLeftLevel(node: TreeNode, level: number) {
    while (node !== null) {
      level++
      node = node.left
    }
    // 因为node到null的时候跳出循环多加了1，所以真实深度是level-1
    return level - 1
  }
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

console.log(countNodes(root))
export {}
