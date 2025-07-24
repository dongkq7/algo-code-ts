// 判断一棵树是不是搜索二叉树
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

// 验证搜索二叉树递归方式

function isValidBST(root: TreeNode | null): boolean {
  const res = helper(root)
  return res === null ? true : res.isBST
}

function helper(
  root: TreeNode | null
): { isBST: boolean; min: number; max: number } | null {
  if (root === null) {
    return null
  }
  const leftInfo = helper(root.left)
  const rightInfo = helper(root.right)

  let isBST = true
  let min = root.val
  let max = root.val
  if (leftInfo !== null) {
    min = Math.min(leftInfo.min, min)
    max = Math.max(leftInfo.max, max)
  }

  if (rightInfo !== null) {
    min = Math.min(rightInfo.min, min)
    max = Math.max(rightInfo.max, max)
  }

  if (leftInfo !== null && (!leftInfo.isBST || leftInfo.max >= root.val)) {
    isBST = false
  }

  if (rightInfo !== null && (!rightInfo.isBST || rightInfo.min <= root.val)) {
    isBST = false
  }
  return { isBST, min, max }
}
// function isValidBST(root: TreeNode | null): boolean {
//   if (root !== null) {
//     const stack: TreeNode[] = []
//     let preVal = Number.NEGATIVE_INFINITY
//     while (stack.length !== 0 || root !== null) {
//       if (root !== null) {
//         stack.push(root)
//         root = root.left // root向左子树移动，将所有左子节点入栈
//       } else {
//         // 来到这里说明没有左子节点了则出栈
//         root = stack.pop()
//         if (root.val <= preVal) {
//           return false
//         }
//         preVal = root.val
//         // 再将右子数进行相同的处理
//         root = root.right
//       }
//     }
//   }
//   return true
// }

// const root = new TreeNode(1)
// const node1 = new TreeNode(2)
// const node2 = new TreeNode(3)
// const node3 = new TreeNode(4)
// const node4 = new TreeNode(5)
// const node5 = new TreeNode(6)
// const node6 = new TreeNode(7)
// root.left = node1
// root.right = node2
// node1.left = node3
// node1.right = node4
// node2.left = node5
// node2.right = node6
// node3.left = node3.right = null
// node4.left = node4.right = null
// node5.left = node5.right = null
// node6.left = node6.right = null

const root = new TreeNode(0)

console.log(isValidBST(root))

export {}
