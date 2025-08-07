// 循环队列

class CircularQueue<T> {
  private maxSize: number
  private queue: T[]
  private front: number
  private count: number

  constructor(k: number) {
    this.maxSize = k
    this.queue = new Array<T>(k)
    // 队首指针
    this.front = 0
    // 元素个数
    this.count = 0
  }
  // 入队
  enQueue(value: T): boolean {
    // 队列已满
    if (this.isFull()) return false
    // 计算插入的索引
    const index = (this.front + this.count) % this.maxSize
    this.queue[index] = value
    this.count++
    return true
  }
  // 出队
  deQueue(): boolean {
    if (this.isEmpty()) return false
    this.deQueue[this.front] = undefined
    // 重新计算队首索引
    this.front = (this.front + 1) % this.maxSize
    this.count--
    return true
  }
  // 返回队首元素
  Front(): T {
    return this.queue[this.front]
  }
  // 返回队尾元素
  Rear(): T {
    if (this.isEmpty()) return undefined
    const index = (this.front + this.count - 1) % this.maxSize
    return this.queue[index]
  }
  // 清空队列
  clear() {
    this.queue = new Array(this.maxSize)
    this.count = 0
    this.front = 0
  }

  isEmpty(): boolean {
    return this.count === 0
  }

  isFull(): boolean {
    return this.count === this.maxSize
  }

  print() {
    console.log(this.queue)
    for (let i = 0; i < this.count; i++) {
      const index = (this.front + i) % this.maxSize
      console.log(this.queue[index])
    }
  }
}

const queue = new CircularQueue<number>(5)
queue.enQueue(1)
queue.enQueue(2)
queue.print()
queue.enQueue(3)
queue.deQueue()
queue.deQueue()
queue.enQueue(4)
queue.enQueue(5)
queue.enQueue(6)
queue.enQueue(7)
queue.enQueue(8)
queue.print()
console.log(queue.Front())
console.log(queue.Rear())
console.log(queue.isFull())
export {}
