// 中序遍历
// https://leetcode.cn/problems/binary-tree-inorder-traversal/description/

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

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = []
  if (root !== null) {
    const stack: TreeNode[] = []
    while (stack.length !== 0 || root !== null) {
      if (root !== null) {
        stack.push(root)
        root = root.left // root向左子树移动，将所有左子节点入栈
      } else {
        // 来到这里说明没有左子节点了则出栈
        root = stack.pop()
        // 记录结果
        result.push(root.val)
        // 再将右子数进行相同的处理
        root = root.right
      }
    }
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

console.log(inorderTraversal(root))

export {}
