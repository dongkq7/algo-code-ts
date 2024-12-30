## 双端队列

队列结构是一种受限的线性结构。

双端队列在单向队列的基础上解除了一部分限制：允许在队列的两端入队以及出队。

![img](https://cdn.nlark.com/yuque/0/2024/png/22253064/1735283572694-54cc2ccb-fb36-44e1-a5ee-6447e0a7cb29.png)

可以结合之前实现的单向队列结构来实现双端队列，增加addFront以及removeBack方法

```typescript
interface IQueue<T> {
  enqueue(element: T): void
  dequeue(): T | undefined
  peek(): T | undefined
  isEmpty(): boolean
  size(): number
}

export default IQueue
import IQueue from './IQueue'
class ArrayQueue<T> implements IQueue<T> {
  private data: T[] = []
  enqueue(element: T): void {
    this.data.push(element)
  }
  dequeue(): T | undefined {
    return this.data.shift()
  }
  peek(): T | undefined {
    return this.data[0]
  }
  isEmpty(): boolean {
    return this.data.length === 0
  }
  size() {
    return this.data.length
  }
}
export default ArrayQueue
import ArrayQueue from '.........'

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
```

## 优先级队列

优先级队列(Priority Queue)是一种比普通队列更加高效的数据结构。 

- 它每次**出队的元素都是具有最高优先级的**，可以理解为元素按照关键字进行排序。 
- 优先级队列可以用数组、链表等数据结构来实现，但是**堆是最常用的实现方式**。

同普通队列一样，也包含以下方法：

**enqueue(element)** 向队列尾部添加一个元素

**dequeue()** 移除队列排在队列最前面元素，并返回被移除的元素。  						

**peek()** 返回队列最先被添加进去的（位于队首）元素。 不移除该元素，只返回元素信息。  			

**isEmpty()** 队列中是否不存在任何元素。				

**size()** 返回队列包含的元素个数。 

### 实现方式一

创建优先级节点，保存在堆结构中。

PriorityNode（优先级节点）包含两个属性：

- value（节点值）
- priority（优先级）

```typescript
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
```

添加valueOf方法以便堆结构比较节点大小时按照priority进行比较。

然后结合堆结构进行实现。

```typescript
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
```

### 实现方式二

自定义节点类，并实现valueOf，结合堆结构进行实现队列方法。

```typescript
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
```