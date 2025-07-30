// morris 遍历

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

function morris(root: TreeNode | null) {
  if (root === null) {
    return
  }

  let cur = root
  let mostRight: TreeNode | null = null
  while (cur !== null) {
    // 先来到左子树
    mostRight = cur.left
    // 如果左子树不为空，那么找到最右节点
    if (mostRight !== null) {
      // 如果存在右节点且右节点的右指针不指向当前节点，那么一直向右移动
      while (mostRight.right && mostRight.right !== cur) {
        mostRight = mostRight.right
      }
      // 找到了最右节点
      // 如果mostRight的最右指针为空，那么让right指向当前节点，当前节点向左移动
      if (mostRight.right === null) {
        mostRight.right = cur
        console.log(cur.val)
        cur = cur.left
        continue
      } else {
        // 不为空则重新指向null
        mostRight.right = null
      }
    }
    console.log(cur.val)
    cur = cur.right
  }
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

morris(root)
export {}
