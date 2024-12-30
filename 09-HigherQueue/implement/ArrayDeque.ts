import ArrayQueue from '../../02-Queue/implement/ArrayQueue'

class ArrayDeque<T> extends ArrayQueue<T> {
  addFront(value: T) {
    this.data.unshift(value)
  }
  removeBack(): T | undefined {
    return this.data.pop()
  }
}

const deque = new ArrayDeque<string>()
deque.enqueue("aaa")
deque.enqueue("bbb")
deque.enqueue("ccc")
deque.addFront("ddd")
deque.addFront("eee")
while (!deque.isEmpty()) {
  console.log(deque.removeBack())
}