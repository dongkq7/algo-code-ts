# 双端队列

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

# 优先级队列

优先级队列(Priority Queue)是一种比普通队列更加高效的数据结构。 

- 它每次**出队的元素都是具有最高优先级的**，可以理解为元素按照关键字进行排序。 
- 优先级队列可以用数组、链表等数据结构来实现，但是**堆是最常用的实现方式**。

同普通队列一样，也包含以下方法：

**enqueue(element)** 向队列尾部添加一个元素

**dequeue()** 移除队列排在队列最前面元素，并返回被移除的元素。  						

**peek()** 返回队列最先被添加进去的（位于队首）元素。 不移除该元素，只返回元素信息。  			

**isEmpty()** 队列中是否不存在任何元素。				

**size()** 返回队列包含的元素个数。 

## 实现方式一

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

## 实现方式二

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

# 循环队列

循环队列是一种利用 **固定大小** 的数组实现队列操作的数据结构，**但它采用了“环形”思想**，**使得数组的末尾与开头相连，从而充分利用了所有存储空间**。



**普通队列与循环队列的差异**

1. 普通队列：使用数组来实现，随着元素不断出队，数组前面部分就空闲了（特别是像 Java、C++ 这一类有标准数组数据结构的语言）。当然，可以将后面的元素往前面移动，但是这里又涉及到了移动相关的操作。
2. 循环队列：利用环形结构，队尾到达数组末尾之后，**新的入队操作会自动写入到数组起始的位置。**

## 循环队列特点

1. 固定容量与环形结构

- 固定容量
- **环形思想：实际上都是通过模运算来计算新入队的元素的下标位置**

1. 指针管理：通常使用两个变量：

- 队头指针（front）：指向队列的第一个元素
- 元素计数（rear/count）：记录当前队列有多少个元素，方便后面做模运算
- 模运算，使得指针在数组边界“循环”，避免了普通队列中出队后前部空间无法再利用的问题。

1. 高效操作，入队和出队时间复杂度都是O(1)，普通队列元素出队后，后面的元素还得向前移动。



## 具体示例

假设有一个大小为 5 的队列，我们依次对队列执行以下操作：

### 普通队列

基于固定数组，未使用循环策略

1. 入队操作：将元素 A、B、C 依次入队

```plain
[A, B, C, _, _]
```

1. 出队操作：出队两次，把 A 和 B 出队

```plain
[_, _, C, _, _]
```

现在随着 A 和 B 的出队，前面两个位置就空出来了

1. 再次入队操作：入队 D 和 E 元素

```plain
[_, _, C, D, E]
```

现在这个结构就没有办法再入队新元素，已经满了。除非将后面的元素全部往前面移动：

```plain
[C, D, E, _, _]
```

### 循环队列

同样大小为 5 的循环队列，进行相同的操作：

1. 入队操作：将元素 A、B、C 依次入队

```plain
[A, B, C, _, _]
```

- frontIndex：0
- count：3
- maxSize：5

1. 出队操作：出队两次，把 A 和 B 出队

```plain
[_, _, C, _, _]
```

这里就会更新队首指针（每次有元素出队都重新计算）：`**新队首指针 = (旧队首指针 + 1) % maxSize**`

- A元素出队的时候：新队首指针 = (0 + 1) %  5 = 1
- B元素出队的时候：新队首指针 = (1 + 1)  % 5 = 2

1. 之后新元素入队，放入位置的计算公式 `**(队首指针 + count) % maxSize**`

- 新元素 D 入队：(2 + 1) % 5 = 3

```plain
[_, _, C, D, _]
```

- frontIndex：2
- count : 2

- 新元素 E 入队：(2 + 2) % 5 = 4

```plain
[_, _, C, D, E]
```

- count：3

- 新元素 F 入队：(2 + 3) % 5 = 0

```plain
[F, _, C, D, E]
```

- count: 4

- 新元素G 入队：(2 + 4) % 5 = 1

```plain
[F, G, C, D, E]
```

- count: 5

通过循环队列这种计算方式，就不需要将后面的元素全部往前面移动，可以通过模运算计算出每次新元素应该入队的正确位置。

## 循环队列实现

```javascript
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
```

# 双端循环队列

## 代码实现

```typescript
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
```

## 注意

在双端循环队列中，向队头插入元素时，计算新队头位置的公式 `(this.front - 1 + this.capacity) % this.capacity` 是为了**实现指针的 “循环左移”**，确保在边界情况下（如队头指针已在数组起始位置）仍能正确定位。

具体原因如下：

### 1. 核心需求：队头指针左移一位

向队头插入元素时，新元素应放在当前队头的**前一个位置**，因此需要将 `front` 指针左移一位。例如：

- 若当前 `front = 2`，左移后应变为 `1`。
- 若当前 `front = 0`（数组起始位置），左移后应绕回数组末尾（如 `capacity = 5` 时，应变为 `4`）。

### 2. 为什么需要 `+ this.capacity`？

直接计算 `(this.front - 1) % this.capacity` 看似可行，但在 `this.front = 0` 时会出现问题：

- `0 - 1 = -1`，此时 `(-1) % 5` 在 JavaScript/TypeScript 中结果为 `4`（看似正确）。

- 但如果 `capacity` 是其他值（如 `3`），`(-1) % 3` 结果为 `2`，数学上正确，但**负数取模的行为在不同语言中可能不一致**，存在兼容性隐患。

  

加上 `this.capacity` 后：

- 确保计算前的数值为正数（`0 - 1 + 5 = 4`），再对 `capacity` 取模，结果更稳定。

### 3. 为什么需要 `% this.capacity`？

取模操作是为了实现 “循环” 特性：

- 当 `front` 不是边界值时（如 `front = 2`，`capacity = 5`）：
  `(2 - 1 + 5) % 5 = 6 % 5 = 1`（正确左移一位）。
- 当 `front` 是边界值时（如 `front = 0`，`capacity = 5`）：
  `(0 - 1 + 5) % 5 = 4 % 5 = 4`（正确绕回数组末尾）。

### 举例说明

假设 `capacity = 5`（数组索引 `0~4`）：

| **当前 front** | **计算过程** `**(front - 1 + 5) % 5**` | **新 front** | **含义**             |
| -------------- | -------------------------------------- | ------------ | -------------------- |
| 2              | `(2 - 1 + 5) % 5 = 6 % 5 = 1`          | 1            | 左移一位             |
| 0              | `(0 - 1 + 5) % 5 = 4 % 5 = 4`          | 4            | 从头部绕回尾部       |
| 4              | `(4 - 1 + 5) % 5 = 8 % 5 = 3`          | 3            | 左移一位（未到边界） |

### 总结

公式 `(this.front - 1 + this.capacity) % this.capacity` 的作用是：

1. 通过 `-1` 实现指针左移。
2. 通过 `+ this.capacity` 避免负数，确保计算稳定性。
3. 通过 `% this.capacity` 实现循环特性，让指针在数组边界处正确绕回。

这是循环队列中处理指针移动的标准写法，能兼容所有边界情况。