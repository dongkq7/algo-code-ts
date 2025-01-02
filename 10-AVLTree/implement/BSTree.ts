import { btPrint } from 'hy-algokit'

export class TreeNode<T> {
  value: T
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  // 当前节点的父节点
  parent: TreeNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }
  // 当前节点是否为父节点的左子节点
  get isLeft() { 
    return !!(this.parent && this.parent.left === this)
  }
  // 当前节点是否为父节点的右子节点
  get isRight() {
    return !!(this.parent && this.parent.right === this)
  }
}

export default class BSTree<T> {
  root: TreeNode<T> | null = null

  protected createNode(value: T): TreeNode<T> {
    return new TreeNode(value)
  }
  insert(value: T) {
    const newNode = this.createNode(value)
    // 如果树为空，那么新节点则作为根节点
    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }

    this.checkBalance(newNode)
  }

  protected checkBalance(node: TreeNode<T>, isAdd = true) {}

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    // 如果新节点的value比原节点value要小，那么就去左子树去找
    if (newNode.value < node.value) {
      // 如果左子树为空，则将当前节点作为左子树节点
      if (node.left === null) {
        node.left = newNode
        newNode.parent = node
      } else {
        // 如果不为空，那么则继续寻找合适的位置
        this.insertNode(node.left, newNode)
      }
    } else {
      // 如果新节点的value比原节点value要大，那么就去右子树去找
      if (node.right === null) {
        node.right = newNode
        newNode.parent = node
      } else {
        this.insertNode(node.right, newNode)
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

  // 获取最大值
  max() {
    if (!this.root) return null
    let currentNode = this.root
    while(currentNode && currentNode.right) {
      currentNode = currentNode.right
    }
    return currentNode.value
  }
  // 获取最小值
  min() {
    if (!this.root) return null
    let currentNode = this.root
    while(currentNode && currentNode.left) {
      currentNode = currentNode.left
    }
    return currentNode.value
  }

  // 搜索指定数据
  search(value: T): boolean {
    return !!this.searchNode(value)
  }
  private searchNode(value: T): TreeNode<T> | null {
    let currentNode = this.root
    let parentNode: TreeNode<T> | null = null
    while(currentNode) {
      if (currentNode.value === value) return currentNode

      parentNode = currentNode
      if (currentNode.value > value) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
      if (currentNode) currentNode.parent = parentNode
    }
    return null
  }

  // 获取当前节点（删除节点）的后继节点
  private getSuccessor(delNode: TreeNode<T>): TreeNode<T> {
    
    let current = delNode.right
    let successor: TreeNode<T> | null = null
    while(current) {
      successor = current
      current = current.left
      if (current) {
        current.parent = successor
      }
    }
    // 如果后继节点不是删除节点的right，那么需要将删除节点的right给后继节点
    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right
      // 变更后继节点的右子节点的父节点指向，保证checkBalance时能够正确找到parent
      if (successor.right) {
        successor.right.parent = successor.parent
      }
      // successor!.right = delNode.right
    } else {
      delNode.right = successor.right
      if (successor.right) {
        successor.right.parent = delNode
      }
    }
    // 将删除节点的left给后继节点的left
    // successor!.left = delNode.left
    return successor!
  }
  // 删除指定节点
  remove(value: T): boolean {
    const currentNode = this.searchNode(value)
    // 如果没有找到指定节点直接返回false
    if (!currentNode) return false

    // 记录被删除的节点
    let delNode: TreeNode<T> | null = currentNode
    
    // 需要被替换上去的节点
    let replaceNode: TreeNode<T> | null = null
    // 如果删除的是叶子节点
    if (currentNode.left === null && currentNode.right === null) {
      replaceNode = null
    } else if (currentNode.right === null) {
      // 如果删除的节点只有一个左子节点
      replaceNode = currentNode.left
    } else if (currentNode.left === null) {
      // 如果删除的节点只有一个右子节点
      replaceNode = currentNode.right
    } else {
      // 如果删除的有两个子节点
      const successor = this.getSuccessor(currentNode)
      // 不去直接删除delNode，而是将delNode的value替换为successor的value，移除的node实际上是successor
      currentNode.value = successor.value
      delNode = successor
      this.checkBalance(delNode, false)
      return true
    }
    if (this.root === currentNode) {
      this.root = replaceNode
    } else if (currentNode.isLeft) {
      currentNode.parent!.left = replaceNode
    } else {
      currentNode.parent!.right = replaceNode
    }

    // 如果被删除的节点有子节点，那么将子节点的父节点指向被删除节点的父节点，保证checkBalance时能够正确找到parent
    if (replaceNode && replaceNode.parent) {
      replaceNode.parent = currentNode.parent
    }

    this.checkBalance(delNode, false)
    return true
  }

  print() {
    btPrint(this.root)
  }
}