// morris遍历判断是否是搜索二叉树
// https://leetcode.cn/problems/validate-binary-search-tree/description/

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

function isValidBST(root: TreeNode | null) {
  if (root === null) {
    return true
  }
  let cur = root
  let preValue = -Infinity
  let mostRight: TreeNode | null = null
  while (cur) {
    mostRight = cur.left
    if (mostRight !== null) {
      // 找到当前节点左子树的最右节点
      while (mostRight.right && mostRight.right !== cur) {
        mostRight = mostRight.right
      }
      // 来到这里说明找到了左子树的最右节点
      // 此时该节点的right要么为空要么为cur
      if (mostRight.right === null) {
        // 让左子树的最右节点的right指向cur，cur左移，继续
        mostRight.right = cur
        cur = cur.left
        continue
      } else {
        mostRight.right = null
      }
    }
    // 来到这里说明要么左子树为空，要么第二次来到了该节点，处理搜索二叉树判断逻辑
    if (preValue >= cur.val) return false
    preValue = cur.val
    // 向右移动
    cur = cur.right
  }
  return true
}
const root = new TreeNode(8)
const node1 = new TreeNode(6)
const node2 = new TreeNode(10)
const node3 = new TreeNode(4)
const node4 = new TreeNode(7)
const node5 = new TreeNode(9)
const node6 = new TreeNode(11)
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

console.log(isValidBST(root))
export {}
