// https://leetcode.cn/problems/recover-binary-search-tree/
/**
 * 给你二叉搜索树的根节点 root，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树。
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

function recoverTree(root: TreeNode | null): void {
  if (!root) return
  let cur: TreeNode | null = root
  let prev: TreeNode | null = null // 前一个节点
  let first: TreeNode | null = null // 第一个错误节点
  let second: TreeNode | null = null // 第二个错误节点
  let mostRight: TreeNode | null = null // 左子树的最右节点

  while (cur) {
    mostRight = cur.left
    if (mostRight) {
      // 找到左子树的最右节点
      while (mostRight.right && mostRight.right !== cur) {
        mostRight = mostRight.right
      }
      if (!mostRight.right) {
        mostRight.right = cur
        cur = cur.left
        continue
      } else {
        mostRight.right = null
      }
    }
    if (prev && prev.val >= cur.val) {
      if (!first) {
        first = prev
      }
      second = cur
    }
    prev = cur
    cur = cur.right
  }
  // 交换两个错误节点的值
  ;[first.val, second.val] = [second.val, first.val]
}

export {}
