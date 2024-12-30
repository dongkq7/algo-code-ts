
import Heap from '../../08-Heap/implement/Heap'


class PriorityQueue<T> {
  private heap = new Heap<T>()

  enqueue(value: T) {
    this.heap.insert(value)
  }

  dequeue(): T | undefined {
    return this.heap.extract()
  }

  peek(): T | undefined {
    return this.heap.peek()
  }

  size() {
    return this.heap.size()
  }

  isEmpty() {
    return this.heap.isEmpty()
  }
}



class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  valueOf() {
    return this.age
  }
}

const pQueue = new PriorityQueue<Person>()
pQueue.enqueue(new Person('zs', 13))
pQueue.enqueue(new Person('lisi', 18))
pQueue.enqueue(new Person('ww', 28))
while(!pQueue.isEmpty()) {
  console.log(pQueue.dequeue())
}