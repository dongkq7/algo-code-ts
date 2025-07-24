// 二叉树的序列化与反序列化
// https://leetcode.cn/problems/h54YBf/description/

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
function serialize(root: TreeNode | null): string {
  if (!root) return '#_'
  let res = root.val + '_'
  res += serialize(root.left)
  res += serialize(root.right)
  return res
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  const strs = data.split('_')
  const nodeVals: string[] = []
  for (let i = 0; i < strs.length; i++) {
    nodeVals.push(strs[i])
  }
  return createTree(nodeVals)
}

function createTree(queue: string[]): TreeNode | null {
  if (queue.length === 0) return null
  const str = queue.shift()
  if (str === '#') {
    return null
  }
  const root = new TreeNode(Number(str))
  root.left = createTree(queue)
  root.right = createTree(queue)
  return root
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

const str = serialize(root)
console.log(str)
console.log(deserialize(str).val)

export {}
