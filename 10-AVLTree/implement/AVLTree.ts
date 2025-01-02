import BSTree, { TreeNode } from './BSTree'

class AVLTreeNode<T> extends TreeNode<T>{
  left: AVLTreeNode<T> | null = null
  right: AVLTreeNode<T> | null = null
  parent: AVLTreeNode<T> | null = null

  // 得到当前节点的高度值，高度值是看子树最大高度 + 1
  private getHeight(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0
    const rightHeight = this.right ? this.right.getHeight() : 0

    return Math.max(leftHeight, rightHeight) + 1
  }

  // 平衡因子（权重）
  private getBalanceFactor(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0
    const rightHeight = this.right ? this.right.getHeight() : 0
    
    return leftHeight - rightHeight
  }

  // 拿到更高的子节点，知道是哪边不平衡，方便进行旋转处理
  get higherChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left ? this.left.getHeight() : 0
    const rightHeight = this.right ? this.right.getHeight() : 0

    if (leftHeight > rightHeight) return this.left
    if (leftHeight < rightHeight) return this.right

    // 一般不会走到这里，处理这里的时候一般是如果当前节点是左子节点那么就返回其左子树，否则返回右子树
    // 这里只是为了防止返回null后产生的调用问题
    return this.isLeft ? this.left : this.right
  }

  get isBalanced(): boolean {
    const factor = this.getBalanceFactor()
    return factor >= -1 && factor <= 1
  }
  // 左旋转
  leftRotation() {
    const isLeft = this.isLeft
    // 左旋转的轴心节点为当前节点的右子节点，处理轴心节点
    const pivot = this.right
    pivot.parent = this.parent

    // 处理轴心节点的左子节点
    this.right = pivot.left
    if (pivot.left) {
      pivot.left.parent = this
    }

    // 处理当前节点
    pivot.left = this
    this.parent = pivot

    // 将处理好的轴心节点挂在对应父节点下
    if (!pivot.parent) {
      return pivot
    } else if (isLeft) {
      pivot.parent.left = pivot
    } else {
      pivot.parent.right = pivot
    }
    return pivot
  }

  // 右旋转
  rightRotation() {
    const isLeft = this.isLeft
    // 左旋转的轴心节点为当前节点的左子节点，处理轴心节点
    const pivot = this.left
    pivot.parent = this.parent

    // 因为后面要把pivot的右子节点变成当前节点，所以先处理轴心节点的右子节点
    this.left = pivot.right
    if (pivot.right) {
      pivot.right.parent = this
    }

    // 处理当前节点
    pivot.right = this
    this.parent = pivot

    // 将处理好的轴心节点挂在对应父节点下
    if (!pivot.parent) {
      return pivot
    } else if (isLeft) {
      pivot.parent.left = pivot
    } else {
      pivot.parent.right = pivot
    }
    return pivot
  }
}

class AVLTree<T> extends BSTree<T> {
      
  // 重写调用的createNode方法
  protected createNode(value: T): TreeNode<T> {
    return new AVLTreeNode(value)
  }

  protected checkBalance(node: AVLTreeNode<T>, isAdd = true) {
    let current = node.parent
    while(current) {
      if (!current.isBalanced) {
        this.rebalance(current)
        // 添加的情况是不需要进一步向上查找的, 直接break
        // 删除的情况是需要进一步向上查找的, 不能break
        if (isAdd) {
          break
        }
      }
      current = current.parent
    }
  }
  rebalance(root: AVLTreeNode<T>) {
    const pivot = root.higherChild
    const current = pivot.higherChild
    let resultNode: AVLTreeNode<T> | null = null

    if (pivot.isLeft) {
      if (current.isLeft) {
        // LL
        resultNode = root.rightRotation()
      } else {
        // LR
        pivot.leftRotation()
        resultNode = root.rightRotation()
      }
    } else {
      if (current.isRight) {
        // RR
        resultNode = root.leftRotation()
      } else {
        // RL
        pivot.rightRotation()
        resultNode = root.leftRotation()
      }
    }

    if (resultNode.parent === null) {
      this.root = resultNode
    }
  }
}

const avlTree = new AVLTree<number>()

console.log('=====插入数据======')
for(let i = 0; i < 20; i++) {
  avlTree.insert(Math.floor(Math.random() * 100))
}
avlTree.print()


const avlTree2 = new AVLTree<number>()
console.log('=====删除数据======')
avlTree2.insert(50)
avlTree2.insert(25)
avlTree2.insert(100)
avlTree2.insert(150)
avlTree2.insert(12)
avlTree2.print()
avlTree2.remove(25)
avlTree2.remove(12)
avlTree2.print()
