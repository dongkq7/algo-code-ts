// 找到普通二叉树的后继节点，中序遍历方式

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
function getSuccessor(
  root: TreeNode | null,
  p: TreeNode | null
): TreeNode | null {
  let preNode = null
  let curNode = root
  const stack = []
  while (stack.length !== 0 || curNode) {
    // 不断将左子节点放入到stack中
    if (curNode) {
      stack.push(curNode)
      curNode = curNode.left
    } else {
      // 走到这里说明已经没有左子节点了开始从stack中取
      curNode = stack.pop()
      // 如果前一个节点是p则当前节点即后继节点
      if (preNode === p) {
        return curNode
      }
      preNode = curNode
      // 继续去右子树进行相同的操作
      curNode = curNode.right
    }
  }
  // 来到这里说明没有后继节点
  return null
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

console.log(getSuccessor(root, node3).val)

export {}
