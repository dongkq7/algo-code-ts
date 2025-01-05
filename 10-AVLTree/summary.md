AVL树（Adelson-Velsky and Landis Tree）是由G.M. Adelson-Velsky和E.M. Landis在1962年发明的 

- 它是一种自（Self）平衡二叉搜索树。 
- 它是二叉搜索树的一个变体，**在保证二叉搜索树性质的同时，通过旋转操作保证树的平衡**。 

在AVL树中，每个节点都有一个权值，该权值代表了以该节点为根节点的子树的高度差。 

- 在AVL树中，任意节点的权值只有1或-1或0，因此AVL树也被称为高度平衡树。 

![img](https://cdn.nlark.com/yuque/0/2024/png/22253064/1735295709869-71c1079a-f86c-460c-9ab5-6a0bd29b36c9.png)

- 对于每个节点，它的左子树和右子树的高度差不超过1。 

![img](https://cdn.nlark.com/yuque/0/2024/jpeg/22253064/1735295858287-7c5b8f6b-c582-487d-ae34-48e3405b31f4.jpeg)

这使得AVL树具有比普通的二叉搜索树更高的查询效率。 

当插入或删除节点时，AVL树可以通过旋转操作来重新平衡树，从而保证其平衡性。 

AVL树的插入和删除操作与普通的二叉搜索树类似，但是在插入或者删除之后，需要继续保持 

树的平衡。 

## 维持平衡方式

AVL树需要通过旋转操作来维护平衡。 

- 有四种情况旋转操作：左左情况、右右情况、左右情况和右左情况双旋。 具体使用哪一种旋转，要根据不同的情况来进行区分和判断。 

由于AVL树具有自平衡性，因此其最坏情况下的时间复杂度仅O(log n)

## AVLTree的实现

AVLTree的实现可借助之前实现的BST来进一步封装

### AVLTreeNode封装

节点中需要包含：

- 获取节点高度
- 获取平衡因子（权重）
- 判断该节点是否平衡
- 获取更高的子节点
- 旋转处理



#### 获取节点高度

当前节点的高度 = 当前节点左子树与右子树之间的最大值 + 1



#### 获取平衡因子

平衡因子 = 当前节点左子树高度 - 右子树高度



#### 判断该节点是否平衡

平衡因子大于等于-1且小于等于1



#### 获取更高的子节点（知道到底是哪边不平衡后，方便进行旋转处理）

如果左边高度大于右边那么返回其左子树，否则返回其右子树





```typescript
import { TreeNode } from './BSTree'

class AVLTreeNode<T> extends TreeNode<T>{
  left: AVLTreeNode<T> | null = null
  right: AVLTreeNode<T> | null = null

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
}
```

#### 旋转处理



![img](https://cdn.nlark.com/yuque/0/2024/jpeg/22253064/1735530188780-1c34d213-5162-4648-bc38-661b23694cbe.jpeg)

如上图，节点10是不平衡的，其平衡因子为-2。

此时就需要以节点12为轴心进行旋转，旋转后依旧满足一个二叉搜索树（左子节点值小于父节点值，右子节点值大于父节点值）

旋转方式是固定的（设计AVL树时就已经定下来了）

比如上图这种是以不平衡节点的右子节点为轴心进行旋转的，不平衡节点要往左进行旋转，称为左旋转。

同理还有要以不平衡节点的左子节点为轴心向右旋转的情况，称为右旋转。

##### 左旋转

![img](https://cdn.nlark.com/yuque/0/2024/jpeg/22253064/1735547141349-17e32628-9393-450d-8344-4ee2faa393a6.jpeg)

1. 首先找到pivot（轴心）

1. 轴心节点就是不平衡节点的right节点
2. 轴心节点的父节点变为当前节点(this)的父节点

1. 处理pivot的左子节点

1. pivot的左子节点变为当前节点的右子节点
2. 如果pivot左子节点有值的话，它的parent变为当前节点

1. 处理当前节点

1. pivot节点的左子节点变为当前节点
2. 当前节点的父节点变为pivot

1. 处理当前pivot节点应该挂在哪里

- 情况一 如果pivot.parent为undefined或者null，那么就让avl树的根节点直接指向pivot节点
- 情况二 如果pivot是父节点的左子节点（要看当前节点是原父节点的左子节点还还是右子节点），那么pivot.parent.left = pivot
- 情况三 如果pivot是父节点的右子节点（要看当前节点是原父节点的右子节点还还是左子节点），那么pivot.parent.right = pivot

总得来说就是先找到轴心节点，改变其父节点后，再处理轴心节点的左子节点，因为后面左旋要把轴心节点的左子节点变为当前节点，所以要把轴心节点的左子节点先给到当前节点的右子节点处。处理好轴心节点的左子节点后，就要改变当前节点了。最后再把旋转完毕后的节点挂到该挂的位置即可。对于旋转后的根节点的父节点为空的情况直接返回处理后的根节点，然后在树的平衡操作中进行修改。

```typescript
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
```



##### 右旋转

![img](https://cdn.nlark.com/yuque/0/2024/jpeg/22253064/1735546972439-386f089a-3e55-47ca-89dc-9d78c357fa58.jpeg)

1. 首先找到pivot（轴心）

1. 轴心节点就是不平衡节点的left节点
2. 轴心节点的父节点变为当前节点(this)的父节点

1. 处理pivot的右子节点

1. pivot的右子节点变为当前节点的左子节点
2. 如果pivot右子节点有值的话，它的parent变为当前节点

1. 处理当前节点(this)

1. pivot节点的右子节点变为当前节点
2. 当前节点的父节点变为pivot

1. 处理当前pivot节点应该挂在哪里

- 情况一 如果pivot.parent为undefined或者null，那么就让avl树的根节点直接指向pivot节点
- 情况二 如果pivot是父节点的左子节点（要看当前节点是原父节点的左子节点还还是右子节点），那么pivot.parent.left = pivot
- 情况三 如果pivot是父节点的右子节点（要看当前节点是原父节点的右子节点还还是左子节点），那么pivot.parent.right = pivot

```typescript
rightRotation() {
  const isLeft = this.isLeft
  // 左旋转的轴心节点为当前节点的左子节点，处理轴心节点
  const pivot = this.left
  pivot.parent = this.parent
  
  // 处理轴心节点的右子节点
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
```

### AVLTree实现

#### 需要旋转的四种情况

除了上面的左左情况以及右右情况外，还有左右情况以及右左情况

![img](https://cdn.nlark.com/yuque/0/2024/png/22253064/1735550816621-e08aa619-113d-484b-b445-df20528286f8.png)

如果是左右以及右左的情况就需要进行双旋转了：

【左右情况】

- 先让轴心节点作为root，对齐进行左旋（比如上图，5是不平衡节点，3为5的轴心节点，那么要先对3进行左旋，3对应的轴心节点为4，也就是对于3来说，要以4为轴心进行左旋）
- 然后再将当前节点作为root进行右旋（经过上一轮左旋后，当前树就变成了以5为root的左左情况，所以现在要以节点4为轴心进行右旋）

【右左情况】

- 先让轴心节点作为root，对齐进行右旋（比如上图，3是不平衡节点，5为3的轴心节点，那么要先对5进行右旋，5对应的轴心节点为4，也就是对于5来说，要以4为轴心进行右旋）
- 然后再将当前节点作为root进行左旋（经过上一轮右旋后，当前树就变成了以3为root的右右情况，所以现在要以节点4为轴心进行左旋）

##### 实现思路

1. 首先拿到当前root节点的pivot节点，pivot节点实际就是当前节点最高的子节点，所以可以通过root.higherChild获取
2. 拿到pivot节点的最高子节点，方便去判断四种不同情况
3. 根据pivot节点是左右节点的情况进行具体判断，来区分四种不同的情况

- LL（左左）情况，进行root节点的右旋即可
- LR（左右）情况，先进行pivot节点的左旋，再进行root节点的右旋
- RR（右右）情况，进行root节点的左旋节课
- RL（右左）情况，先进行pivot节点的右旋，再进行root节点的左旋

1. 最后需要处理旋转返回的节点的父节点值为null的情况，此时需要将树的根节点重新设置为旋转后处理好的节点即可

```typescript
class AVLTree<T> extends BSTree<T> {
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
```

#### 不同情况下的平衡调整

插入以及删除节点都可能导致树的不平衡，所以在插入以及删除节点时需要判断树是否还是平衡的，不平衡的话需要进行调整。

##### 插入节点后的平衡调整

在每次插入节点后，都需要对新插入的节点进行平衡检查，从新插入节点的父节点开始依次向上查找，遇到不平衡的节点时进行rebalance操作。

此时需要对父类BSTree调整，在insert方法中去进行checkBalance。

由于父类BSTree中的insert创建的节点类型和子类的不同，所以可以采用 模板模式 的方式来让父类的insert方法创建不同类型的节点：

```typescript
export default class BSTree<T> {
  //...

  protected createNode(value: T): TreeNode<T> {
    return new TreeNode(value)
  }
  insert(value: T) {
    const newNode = this.createNode(value)
    // ...
  }
}

class AVLTree<T> extends BSTree<T> {
  // 重写调用的createNode方法
  protected createNode(value: T): TreeNode<T> {
    return new AVLTreeNode(value)
  }
}
```

由于子类AVLTree中重写了父类中的createNode的方法，在父类执行insert时，调取的createNode便是子类中重写的createNode方法。这样就实现了父类insert方法中创建的节点类型是AVLTreeNode类型。

在insert方法里，还要对新插入的节点进行是否平衡的检测，所以依旧是要在父类的insert方法中去进行操作，同样也可以采用模板模式，在父类中写对应的方法，子类中去重写，然后父类的insert方法中去调取该方法即可。

```typescript
export default class BSTree<T> {
  insert(value: T) {
    const newNode = this.createNode(value)
    // 如果树为空，那么新节点则作为根节点
    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
    // 检测是否平衡
    this.checkBalance(newNode)
  }
  // 不需要去实现，在子类中去实现即可
  protected checkBalance(node: TreeNode<T>) {}
}

class AVLTree<T> extends BSTree<T> {
  
  // 子类重写checkBalance并实现具体逻辑
  protected checkBalance(node: AVLTreeNode<T>) {
    let current = node.parent
    while(current) {
      if (!current.isBalanced) {
        this.rebalance(current)
      }
      current = current.parent
    }
  }
}
```

##### 删除节点后的平衡调整

删除节点后的平衡性是要通过删除节点的父节点依次去检查。

删除节点后平衡调整的关键是，要考虑删除节点后，替换节点的父节点的指向问题，**因为要保持树的平衡就要通过其父节点依次判断节点的平衡性**。

- 如果删除的节点是只有一个子节点，那么替换节点就是该子节点，如果删除的节点存在父节点，此时需要要将该子节点的父节点设置为删除节点的父节点

![img](https://cdn.nlark.com/yuque/0/2025/jpeg/22253064/1735797757117-aa184f09-2e39-4d69-9e6a-bd0a2d79e177.jpeg)

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735801504888-d71ed19b-cb44-419d-9d78-03793214d088.png)

- 如果删除的节点是有两个叶子节点，那么就要去寻找该节点的前驱/后继节点，在实现BSTree时这个情况需要将删除节点替换为后继/前驱节点，但这种方式需要改动太多parent。所以此时可以这样考虑：将删除节点的value替换会后继节点的value，变化删除节点的右子节点以及后继节点的子节点parent的指向，这样就不用去考虑太多parent的指向问题了。

此时需要考虑两种场景：

1. 一种是删除节点的后继节点不是其右子节点，如下图

![img](https://cdn.nlark.com/yuque/0/2025/jpeg/22253064/1735800356900-3b89e972-791a-4ac2-aa74-eb105a555f5b.jpeg)

比如删除节点11，找到其后继节点12，然后做如下操作：

- 如果后继节点存在右子节点
  - 将后继节点12的父节点15的left变为12的右子节点14
  - 此时将14的parent指向后继节点12的parent


2. 一种是删除节点的后继节点正好是其右子节点，如下图：

![img](https://cdn.nlark.com/yuque/0/2025/jpeg/22253064/1735800634816-c46b7daf-362e-4354-9d9d-11aa651c9da6.jpeg)

- 如果后继节点刚好是右子节点
- 那么删除节点的right赋值为后继节点的right
  - 如果后继节点存在右子节点，那么将后继节点的右子节点的parent指向删除节点


![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735801399152-5f87fee1-6532-4c21-a514-0f8912245287.png)

这样，移除的位置实际上是后继节点，只需要从后继节点的父节点向上去检测平衡性即可。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735801476919-4c701daa-c35f-4386-8da0-0c3b77fa3324.png)

优化checkBalance：

- 插入节点时，再平衡后不需要继续去判断后续节点是否需要平衡
- 删除节点时，再平衡后需要继续判断后续节点是否需要平衡

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735801650754-8e1e25cd-c79f-4188-9718-abb057671601.png)