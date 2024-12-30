
import Heap from '../../08-Heap/implement/Heap'


class PriorityNode<T> {
  value: T
  priority: number
  constructor(value: T, priority: number) {
    this.value = value
    this.priority = priority
  }
  valueOf() {
    return this.priority
  }
}

class PriorityQueue<T> {
  private heap = new Heap<PriorityNode<T>>()

  enqueue(value: T, priority: number) {
    const pNode = new PriorityNode(value, priority)
    this.heap.insert(pNode)
  }

  dequeue(): T | undefined {
    return this.heap.extract()?.value
  }

  peek(): T | undefined {
    return this.heap.peek()?.value
  }

  size() {
    return this.heap.size()
  }

  isEmpty() {
    return this.heap.isEmpty()
  }
}



const pQueue = new PriorityQueue<string>()
pQueue.enqueue("aaa", 80)
pQueue.enqueue("bbb", 90)
pQueue.enqueue("ccc", 100)
while (!pQueue.isEmpty()) {
  console.log(pQueue.dequeue())
}