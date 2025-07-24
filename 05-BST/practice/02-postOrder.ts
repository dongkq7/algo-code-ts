// 后序遍历
// https://leetcode.cn/problems/binary-tree-postorder-traversal/description/

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

function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []
  if (!root) return result
  const mainStack: TreeNode[] = []
  const collectStack: TreeNode[] = []

  mainStack.push(root)
  while (mainStack.length !== 0) {
    root = mainStack.pop()
    collectStack.push(root)

    // 由于要先访问右子节点，所以先压左子节点
    if (root.left) {
      mainStack.push(root.left)
    }

    if (root.right) {
      mainStack.push(root.right)
    }
  }
  while (collectStack.length > 0) {
    result.push(collectStack.pop().val)
  }
  return result
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

console.log(postorderTraversal(root))

export {}
