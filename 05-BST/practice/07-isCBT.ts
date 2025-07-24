// 判断一棵树是不是完美二叉树

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

function isCBT(root: TreeNode | null): boolean {
  if (root === null) return true

  let isLeaf = false // 是否之后的节点都应该是叶子节点
  let l = null // 左子节点
  let r = null // 右子节点
  const queue: TreeNode[] = []
  queue.push(root)

  while (queue.length !== 0) {
    root = queue.shift()
    l = root.left
    r = root.right
    // 如果之后的节点都应该是叶子节点但是当前节点不是叶子节点直接返回false
    // 或者该节点有右子节点没有左子节点也直接返回false
    if ((isLeaf && (l !== null || r !== null)) || (l === null && r !== null)) {
      return false
    }
    if (l !== null) {
      queue.push(l)
    }
    if (r !== null) {
      queue.push(r)
    }

    // 节点不双全的情况下开启isLeaf
    if (l === null || r === null) {
      isLeaf = true
    }
  }
  return true
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

console.log(isCBT(root))

export {}
