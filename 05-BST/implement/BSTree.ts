class TreeNode<T> {
  value: T
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

class BSTree<T> {
  root: TreeNode<T> | null = null
  insert(value: T) {
    const newNode = new TreeNode(value)
    // 如果树为空，那么新节点则作为根节点
    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    // 如果新节点的value比原节点value要小，那么就去左子树去找
    if (newNode.value < node.value) {
      // 如果左子树为空，则将当前节点作为左子树节点
      if (node.left === null) {
        node.left = newNode
      } else {
        // 如果不为空，那么则继续寻找合适的位置
        this.insertNode(node.left, newNode)
      }
    } else {
      // 如果新节点的value比原节点value要大，那么就去右子树去找
      if (newNode.value > node.value) {
        if (node.right === null) {
          node.right = newNode
        } else {
          this.insertNode(node.right, newNode)
        }
      }
    }
  }

  // 先序遍历
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root)
  }

  private preOrderTraverseNode(treeNode: TreeNode<T> | null) {
    if (treeNode) {
      console.log(treeNode.value)
      this.preOrderTraverseNode(treeNode.left)
      this.preOrderTraverseNode(treeNode.right)
    }
  }

  // 中序遍历
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root)
  }
  private inOrderTraverseNode(treeNode: TreeNode<T> | null) {
    if (treeNode) {
      this.inOrderTraverseNode(treeNode.left)
      console.log(treeNode.value)
      this.inOrderTraverseNode(treeNode.right)
    }
  }

  // 后序遍历
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root)
  }
  private postOrderTraverseNode(treeNode: TreeNode<T> | null) {
    if (treeNode) {
      this.postOrderTraverseNode(treeNode.left)
      this.postOrderTraverseNode(treeNode.right)
      console.log(treeNode.value)
    }
  }

  // 层序遍历
  levelOrderTraverse() {
    if (!this.root) return
    // 创建一个队列用于存放要出队的树节点
    const nodeQueue: TreeNode<T>[] = []
    nodeQueue.push(this.root)
    while(nodeQueue.length !== 0) {
      const currentNode = nodeQueue.shift()!
      console.log(currentNode.value)

      // 放入左子节点
      if (currentNode.left) {
        nodeQueue.push(currentNode.left)
      }
      // 放入右子节点
      if (currentNode.right) {
        nodeQueue.push(currentNode.right)
      }
    }
  }
}

// test
const bsTree = new BSTree()
bsTree.insert(11)
bsTree.insert(7)
bsTree.insert(15)
bsTree.insert(5)
bsTree.insert(3)
bsTree.insert(9)
bsTree.insert(8)
bsTree.insert(10)
bsTree.insert(13)
bsTree.insert(12)
bsTree.insert(14)
bsTree.insert(20)
bsTree.insert(18)
bsTree.insert(25)
bsTree.insert(6)
// bsTree.preOrderTraverse()
// bsTree.inOrderTraverse()
// bsTree.postOrderTraverse()
bsTree.levelOrderTraverse()
