// 找到搜索二叉树的后继节点
// https://leetcode.cn/problems/inorder-successor-in-bst/description/

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  parent: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
function inorderSuccessor(
  root: TreeNode | null,
  p: TreeNode | null
): TreeNode | null {
  let successor: TreeNode | null = null
  // 如果p有右子树，则找到其右子树上的最左节点
  if (p.right) {
    successor = p.right
    while (successor.left) {
      successor = successor.left
    }
    return successor
  }

  // 如果没有右子树，从根节点开始找
  let node = root
  while (node) {
    // 如果当前节点大于p的值，那么后继节点可能在其左子树上
    if (node.val > p.val) {
      successor = node // 将后继节点记录成当前节点
      node = node.left
    } else {
      // 否则可能再其右子树上
      node = node.right
    }
  }
  return successor
}

const root = new TreeNode(5)
const node1 = new TreeNode(3)
const node2 = new TreeNode(6)
const node3 = new TreeNode(2)
const node4 = new TreeNode(4)
const node5 = new TreeNode(1)
root.left = node1
root.right = node2
node1.left = node3
node1.right = node4
node3.left = node5
node4.left = node4.right = null
node5.left = node5.right = null

console.log(inorderSuccessor(root, node3).val)

export {}
