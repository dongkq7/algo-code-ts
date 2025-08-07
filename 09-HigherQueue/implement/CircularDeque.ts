// 双端循环队列
class CircularDeque {
  private queue: number[]
  private count: number // 目前有多少个元素
  private maxSize: number // 最大容量
  private front: number // 队首索引

  constructor(k: number) {
    this.queue = new Array(k)
    this.count = 0
    this.maxSize = k
    this.front = 0
  }

  // 将元素插入到双端队列头部
  insertFront(value: number): boolean {
    if (this.isFull()) return false

    const index = (this.front - 1 + this.maxSize) % this.maxSize
    this.queue[index] = value
    this.front = index
    this.count++
    return true
  }

  // 将元素插入到双端队列尾部
  insertLast(value: number): boolean {
    if (this.isFull()) return false

    const index = (this.front + this.count) % this.maxSize
    this.queue[index] = value
    this.count++
    return true
  }

  // 从头部删除一个元素
  deleteFront(): boolean {
    if (this.isEmpty()) return false
    this.queue[this.front] = undefined
    // 更新front索引
    this.front = (this.front + 1) % this.maxSize
    this.count--
    return true
  }

  // 从尾部删除一个元素
  deleteLast(): boolean {
    if (this.isEmpty()) return false
    const index = (this.front + this.count - 1) % this.maxSize
    this.queue[index] = undefined
    // 从队尾删除不需要更新front
    this.count--
    return true
  }

  // 获取头部元素
  getFront(): number {
    if (this.isEmpty()) return -1

    return this.queue[this.front]
  }

  // 获取尾部元素
  getRear(): number {
    if (this.isEmpty()) return -1

    const index = (this.front + this.count - 1) % this.maxSize
    return this.queue[index]
  }

  isEmpty(): boolean {
    return this.count === 0
  }

  isFull(): boolean {
    return this.count === this.maxSize
  }
}

const queue = new CircularDeque(3)
queue.insertFront(1)
queue.insertFront(2)
queue.insertFront(3)
console.log(queue.isFull())
console.log(queue.getFront())
console.log(queue.getRear())
queue.insertLast(4)
console.log(queue.getRear())
queue.deleteFront()
queue.insertLast(4)
console.log(queue.getFront())
console.log(queue.getRear())

export {}
