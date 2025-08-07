// 判断一个树是否是完全二叉树
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

function isCBT(root: TreeNode | null) {
  if (!root) return true
  const nodeQueue: TreeNode[] = []
  let curNode: TreeNode | null = null
  // 左节点
  let l: TreeNode | null = null
  // 右节点
  let r: TreeNode | null = null

  let leaf = false // 是否接下来的节点需要叶子节点
  nodeQueue.push(root)
  // 层序遍历
  while (nodeQueue.length !== 0) {
    curNode = nodeQueue.shift()
    l = curNode.left
    r = curNode.right
    // 如果接下来的节点必须是叶子节点但是不满足或者没有左子节点有右子节点直接返回false
    if ((leaf && (l !== null || r !== null)) || (l === null && r !== null)) {
      return false
    }
    if (l !== null) {
      nodeQueue.push(l)
    }
    if (r !== null) {
      nodeQueue.push(r)
    } else {
      // 右子节点为空，则接下来所有节点需要均为叶子节点
      leaf = true
    }
  }
  return true
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

console.log(isCBT(root))
export {}
