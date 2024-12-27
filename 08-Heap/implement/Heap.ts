class Heap<T> {
  private data: T[] = []
  private length: number = 0
  // 是否是最大堆
  private isMaxHeap: boolean

  constructor(arr: T[], isMaxHeap = true) {
    this.isMaxHeap = isMaxHeap
    if (arr.length) {
      this.buildHeap(arr)
    }
  }
  // 交换两个数据
  private swap(index1: number, index2: number) {
    let temp = this.data[index1]
    this.data[index1] = this.data[index2]
    this.data[index2] = temp
  }

  private compare(index1: number, index2: number) {
    if (this.isMaxHeap) {
      return this.data[index1] >= this.data[index2]
    } else {
      return this.data[index1] <= this.data[index2]
    }
  }
  // 插入新元素
  insert(value: T) {
    // 将元素先插入到最后
    this.data.push(value)
    this.length++

    // 进行上滤操作
    this.heapifyUp()
  }

  // 上滤
  private heapifyUp() {
    // 新元素索引
    let index = this.data.length - 1
    while(index > 0) {
      // 对应的父元素索引
      const pIndex = Math.floor((index - 1) / 2)
      if (this.compare(pIndex, index)) {
        // 如果父元素值大于等于当前元素值，那么就不需要进行交换
        break
      } else {
        this.swap(index, pIndex)
        index = pIndex
      }
    }
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
    this.heapifyDown()

    return topValue
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
      if (rIndex < this.length && this.compare(rIndex, curIndex)) {
        curIndex = rIndex
      }
      
      if (this.compare(index, curIndex)) {
        break
      }
      // 交换
      this.swap(index, curIndex)
      index = curIndex
    }
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

  // 返回堆中的最大/最小元素
  peek() {
    return this.data[0]
  }
  
  isEmpty() {
    return this.length === 0
  }

  print() {
    console.log(this.data)
  }
}


const arr1 = [19, 100, 36, 17, 3, 25, 1, 2, 20]
const arr2 = [19, 100, 36, 17, 3, 25, 1, 2, 20]

const maxHeap = new Heap<number>(arr1)

maxHeap.print()
console.log(maxHeap.extract())
maxHeap.print()

const minHeap = new Heap<number>(arr2, false)
minHeap.print()
console.log(minHeap.extract())
minHeap.print()
