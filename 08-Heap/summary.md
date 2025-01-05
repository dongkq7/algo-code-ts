## 什么是堆结构

堆的本质是一种特殊的树形数据结构，使用**完全二叉树**来实现：

- 堆可以进行很多分类，但是使用的基本都是二叉堆
- 二叉堆又可以分为最大堆和最小堆

最大堆和最小堆

- 最大堆：堆中每一个节点都小于等于它的所有子节点
- 最大堆：堆中的每一个节点都大于等于它的所有子节点

![img](https://cdn.nlark.com/yuque/0/2024/png/22253064/1735194784310-55ab3a8e-6d59-42f6-9762-d3e84dcde43b.png)

## 为什么需要堆结构

如果有一个集合，希望获取里面的最大值或者最小值，有哪些方案？

- 数组/链表：获取最大或者最小都是O(n)级别（可以进行排序，但是我们只是获取最大值或最小值而已，排序本身也是消耗性能的）
- 二叉搜索树：获取最大或者最小值是O(logn)级别（而且二叉搜索出还需要维护，树是平衡的才是O(logn)



针对这种场景，就需要堆结构来解决



## 堆结构

堆结构通常用来解决 Top k问题：

- Top k问题是指 在一组数据中，找出最前面的k个最大/最小元素
- 常用的解决方案有排序算法、快速选择算法、堆结构等

堆结构我们通常指的是二叉堆，是一棵**完全二叉树**，底层用**数组**来实现

![img](https://cdn.nlark.com/yuque/0/2024/png/22253064/1735193928376-70959313-e2c7-4c8d-9c49-e0ac614b5734.png)

### 特点

每个节点在数组中对应的索引有如下规律：

- 如果i = 0那么它是根节点
- 父节点对应的索引：`Math.floor((i - 1) / 2)`（比如节点3，它的父节点对应的索引是floor((4-1) / 2）= 1也就是节点19）
- 左子节点：`2i + 1`
- 右子节点：`2i + 2`
- 第一个非叶子节点对应索引：`Math.floor(length / 2 - 1)`



## 实现堆结构

### 常见属性

data: 存储堆中的元素，通常使用数组来实现

size：堆中当前元素的数量

### 常见方法

- insert(value)：在堆中插入一个新元素。 
- extract()/delete()：从堆中删除最大/最小元素。 
- peek()：返回堆中的最大/最小元素。 
- isEmpty()：判断堆是否为空。
- buildHeap(list)：通过一个列表来构造堆。



#### insert

以最大堆为例

先将新元素先直接添加到数组的最后位置，然后检测是否符合最大堆的特性，进行上滤操作：

上滤操作步骤：

- 将新元素和父元素进行比较，新元素索引位置`index = data.length - 1`，父元素的索引位置`floor((index - 1) / 2)`
- 如果当前新元素是小于等于父元素的，那么直接break
- 否则当前新元素同父元素进行交换，并将index改为父元素的索引，然后和新的父元素进行对比，依次进行......（最差要对比logn次，即使是一百万个数据也就是对比20多次，所以效率是非常快的）
- 当index <= 0时循环终止，也就是说循环条件是index > 0



```typescript
class Heap<T> {
  data: T[] = []
  private length: number = 0

  // 交换两个数据
  private swap(index1: number, index2: number) {
    let temp = this.data[index1]
    this.data[index1] = this.data[index2]
    this.data[index2] = temp
  }
  // 插入新元素
  insert(value: T) {
    // 将元素先插入到最后
    this.data.push(value)
    this.length++

    // 进行上滤操作
    // 新元素索引
    let index = this.data.length - 1
    while(index > 0) {
      // 对应的父元素索引
      const pIndex = Math.floor((index - 1) / 2)
      if (value <= this.data[pIndex]) {
        break
      } else {
        this.swap(index, pIndex)
        index = pIndex
      }
    }
  }
}


const arr = [19, 100, 36, 17, 3, 25, 1, 2, 20]

const heap = new Heap<number>()
for (const item of arr) {
  heap.insert(item)
}

console.log(heap.data)
```

#### extract

- 如果没有元素直接返回undefined
- 如果有一个元素那么需要将length--然后shift或pop即可。
- 其他情况就要考虑堆重构了。

删除操作也需要考虑删除元素后的堆重构，这种向下替换元素的策略叫作下滤：

需要注意的是一定不要使用shift进行删除，这样的话数组内的每个元素的索引都会往前移，打乱了原来的位置就一定不符合最大堆性质了（这样其他位置的元素依旧保持最大堆的性质）。

那么我们可以：

1. 先让一个元素不符合最大堆，让最后一个位置的元素先放到index=0的位置（保证中间不要有元素空出来）
2. 将提上来的最后一个元素进行下滤操作

1. 首先index = 0。拿到左子节点索引 2 * 0 + 1 = 1，右子节点索引 2 * 0  + 2 = 2。
2. 比较左子节点与右子节点找到较大的值的索引（需要注意右子节点可能是不存在的，所以可以先让较大值索引等于左子节点的索引，然后如果右子节点存在的话再进行比较）

1. 如果该元素值大于等于较大值，那么直接break
2. 否则，交换位置，并更新索引index

1. 依次循环...直到该位置没有左子节点的时候（因为没有左子节点就一定没有右子节点了，有右子节点可能还会有下一个左子节点）也就是2*index + 1 >= length，所以循环条件是2 * index + 1 < length

```typescript
class Heap<T> {
  data: T[] = []
  private length: number = 0

  // 交换两个数据
  private swap(index1: number, index2: number) {
    let temp = this.data[index1]
    this.data[index1] = this.data[index2]
    this.data[index2] = temp
  }

  // 从堆中移除最大/最小元素
  extract(): T {
    if(!this.length) return undefined
    if (this.length === 1) {
      this.length--
      return this.data.pop()
    }

    const topValue = this.data[0]
    // 先拿最后一个位置的元素放上来
    this.data[0] = this.data.pop()
    this.length--

    // 再进行下滤操作
    let index = 0
    while(2 * index + 1 < this.length) {
      // 左节点索引
      const lIndex = index * 2 + 1
      // 右节点索引
      const rIndex = lIndex + 1

      // 找到左节点与右节点中值较大的那个节点索引
      // 可以先让较大值索引为左节点索引，如果右节点存在并且值比较大，那么再让该索引等于右节点索引
      let curIndex = lIndex
      if (rIndex < this.length && this.data[curIndex] < this.data[rIndex]) {
        curIndex = rIndex
      }
      
      if (this.data[index] >= this.data[curIndex]) {
        break
      }
      // 交换
      this.swap(index, curIndex)
      index = curIndex
    }
    return topValue
  }
}


const arr = [19, 100, 36, 17, 3, 25, 1, 2, 20]

const heap = new Heap<number>()
for (const item of arr) {
  heap.insert(item)
}

console.log(heap.data)
console.log(heap.extract())
console.log(heap.data)
```

#### buildHeap

原地建堆，是指建立堆的过程中，**不使用额外内存空间，直接在原有数组上进行操作**。

具体思路：

从第一个非叶子节点开始，进行下滤操作。

- 第一个非叶子节点索引：Math.floor((length - 1) / 2)
- 找到之后进行循环，每次循环之后让索引减1，依次往前进行下滤操作

```typescript
class Heap<T> {
  data: T[] = []
  private length: number = 0

  // 交换两个数据
  private swap(index1: number, index2: number) {
    let temp = this.data[index1]
    this.data[index1] = this.data[index2]
    this.data[index2] = temp
  }
  // 原地建堆
  buildHeap(arr: T[]) {
    if (!arr.length) return

    this.data = arr
    this.length = arr.length

    let start = Math.floor(this.length / 2 - 1)
    // 从第一个非叶子节点开始，依次进行下滤操作
    for(let i = start; i >= 0; i--) {
      this.heapifyDown(i)
    }
  }
   private heapifyDown(start = 0) {
    let index = start
    while(2 * index + 1 < this.length) {
      // 左节点索引
      const lIndex = index * 2 + 1
      // 右节点索引
      const rIndex = lIndex + 1

      // 找到左节点与右节点中值较大的那个节点索引
      // 可以先让较大值索引为左节点索引，如果右节点存在并且值比较大，那么再让该索引等于右节点索引
      let curIndex = lIndex
      if (rIndex < this.length && this.data[curIndex] < this.data[rIndex]) {
        curIndex = rIndex
      }
      
      if (this.data[index] >= this.data[curIndex]) {
        break
      }
      // 交换
      this.swap(index, curIndex)
      index = curIndex
    }
  }

}


const arr = [19, 100, 36, 17, 3, 25, 1, 2, 20]

const heap = new Heap<number>()
heap.buildHeap(arr)
console.log('arr建堆后=>', arr)
```

也可以将通过构造函数的方式去执行原地建堆。