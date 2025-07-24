// 找到普通二叉树的后继节点

class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  parent: TreeNode | null
  constructor(
    val?: number,
    left?: TreeNode | null,
    right?: TreeNode | null,
    parent?: TreeNode | null
  ) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
    this.parent = parent === undefined ? null : parent
  }
}
function getSuccessor(
  root: TreeNode | null,
  p: TreeNode | null
): TreeNode | null {
  if (root === null) {
    return null
  }

  // 如果当前节点有右子树，则去拿其右子树的最左节点
  if (p.right !== null) {
    return getLeftMost(p.right)
  } else {
    // 如果没有右子树，那么就去沿着parent向上找，直到找到是左子节点的那个节点的父节点
    let parent = p.parent
    // 如果parent为空都没找到，说明这个节点是整棵树的最右节点
    while (parent !== null && parent.left !== p) {
      p = parent
      parent = p.parent
    }
    return parent
  }
}

function getLeftMost(node: TreeNode) {
  while (node.left !== null) {
    node = node.left
  }
  return node
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
root.parent = null
node1.left = node3
node1.right = node4
node1.parent = root
node2.left = node5
node2.right = node6
node2.parent = root
node3.left = node3.right = null
node3.parent = node1
node4.left = node4.right = null
node4.parent = node1
node5.left = node5.right = null
node5.parent = node2
node6.left = node6.right = null
node6.parent = node2

console.log(getSuccessor(root, node3).val)

export {}
