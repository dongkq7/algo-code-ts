# 单向循环链表

可以在之前实现的链表基础上去实现单向循环链表。

- 继承自之前封装的LinkedList，只实现差异化部分



## 接口抽象

IList.ts

```typescript
export default interface IList<T> {
  // 返回头节点值
  peek(): T | null
  // 判断链表是否为空
  isEmpty(): boolean
  // 节点个数
  size(): number
}
```

ILinkedList.ts

```typescript
import IList from '../../types/IList'

interface ILinkedList<T> extends IList<T> {
  append(value: T): void
  insert(position: number, value: T) : boolean
  removeAt(position: number): T | null
  remove(value: T): T | null
  get(positon: number): T | null
  update(position: number, value: T): boolean
  indexOf(value: T): number
  traverse(): void
}

export default ILinkedList
```

LinkedNode.ts

```typescript
export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T) {
    this.value = value
  }
}
```

## 重构单向链表类

基于当前单向链表实现循环链表的话，需要做如下重构：

### 修改属性类型

为了子类能够访问父类中的head、size属性，将这俩属性改为protected类型

### append重构

由于循环链表经常需要拿到最后一个节点，为了能够让循环链表能够方便的获取，可以向单向链表类中增加tail属性来指向最后一个节点。然后在append方法中为tail赋值。



```typescript
append(value: T) {
  const newNode = new Node(value)
  if (!this.head) {
    this.head = newNode
  } else {
    this.tail.next = newNode
  }
  this.tail = newNode
  
  this.length++
}
```

### insert重构

在插入的时候，需要考虑，如果插入的位置是在最后，那么要把tail的指向修改一下。

- 查询在头部与中间位置不用去修改tail，因为不影响tail

```typescript
insert(position: number, value: T): boolean {
  if (position < 0 || position > this.length) return false

  const newNode = new Node(value)
  if (position === 0) {
    newNode.next = this.head
    this.head = newNode
  } else {
    const preNode = this.getNode(position - 1)
    newNode.next = preNode.next
    preNode.next = newNode
    // 如果插入的最后，那么就需要变更下tail的指向
    if (position === this.length) {
      this.tail = newNode
    }
  }
  this.length++
  return true
}
```



### removeAt重构

- 如果删除的是第一个节点且只有一个节点的时候，让tail指向null
- 如果删除的是最后一个节点，那么要将tail的指向前一个节点

```typescript
removeAt(position: number): T  | null {
    if (position < 0 || position >= this.length) return null

    let cur = this.head
    if (position === 0) {
      this.head = cur.next ?? null

      // 删除的是头节点，如果此时只有这一个节点，那么将tail变成null
      if (this.length === 1) {
        this.tail = null
      }
    } else {
      const preNode = this.getNode(position - 1)
      cur = preNode.next
      preNode.next = preNode.next.next ?? null
      // 如果删除的是最后一个节点，那么就把tail指向前一个节点
      if (position === this.length - 1) {
        this.tail = preNode
      }
    }

    this.length--

    return cur.value
  }
```

### traverse重构

如果是循环链表，不重构traverse会发生无限循环。

- 避免无限循环
- 打印时为了能够容易判断出是循环链表，在最后如果tail.next===head（这样就证明时一个循环链表），那么就将head节点的值拼接在后面

```typescript
 traverse() {
  const values: T[] = []      
  let cur = this.head
  while(cur) {
    values.push(cur.value)
    // 防止循环链表无限循环
    if (cur === this.tail) {
      cur = null
    } else {
      cur = cur.next
    } 
  }
  // 如果是循环链表，那么就把头节点的值放在最后，便于看出是循环链表
  if(this.head && this.length > 1 && this.tail.next === this.head) {
    values.push(this.head.value)
  }
  console.log(values.join(' -> '))
}
```

### indexOf重构

indexOf是一个个去寻找的，如果是循环链表，不做额外判断会产生无限循环

- 所以当判断是尾节点的时候可以将current赋值为null避免无限循环

```typescript
indexOf(value: T): number {
  let i = 0
  let cur = this.head
  while(cur) {
    if (cur.value === value) return i
    if (this.isTail(cur)) {
      cur = null
    } else {
      cur = cur.next
    }
    i++
  }
  return -1
}
```



## 实现循环链表

### append

循环链表中append后，需要额外比单向链表多做一个操作：就是将尾节点的next指向头节点。

所以可以采用super(value)调取父类(单向链表)的append方法，然后再将tail.next = head即可。

### insert

调取父类的insert方法后需要做一些额外操作：

- 如果插入的是中间，不需要做额外操作
- 如果插入的是最后的位置，那么就要让尾部节点重新指向头节点（需要注意的是，调取父类后，此时length长度增加了1，所以判断是否插入的是最后一位，那么就看position是否等于length-1）
- 如果插入的是第一个位置，那么也要让尾部节点重新指向头节点



### removeAt

调取父类的removeAt后，也是需要做一些额外操作：

- 如果删除的是第一个节点和最后一个节点，那么就要重新让tail指向head
- 需要注意的是，如果就剩一个节点了，那么删除后tail和head都为null，所以在tail有值的情况下再进行额外操作


#  双向链表

双向链表：

- 既可以从头遍历到尾，又可以从尾遍历到头
- 一个节点既有向前连接的引用pre，也有一个向后连续的引用next

虽然双向链表比单向链表占用的内存空间大些，但是和使用方便程度相比是微不足道的

![img](https://cdn.nlark.com/yuque/0/2024/png/22253064/1735114107279-8debb8b7-58c8-4b37-bc12-4204db3fac15.png)

双向链表也可以基于之前封装的单向链表来实现。添加、删除相关方法实现和单向链表有较大区别，可以对这些方法进行重写：

- append
- insert
- removeAt

另外可以为双向链表类增加新的方法：

- prepend 在头部添加元素
- postTraverse 从尾部遍历所有节点

## 节点类封装

```typescript
export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  next: DoublyNode<T> | null = null
  prev: DoublyNode<T> | null = null
}
```

## 实现双向链表

### append

- 如果链表为空（this.head === null）那么就让head与tail指向新节点即可
- 如果链表不为空，那么就先让当前尾节点的next指向新节点，然后再让新节点的prev指向尾节点，最后修改尾节点指向即可

### prepend

- 如果链表为空（this.head === null）那么就让head与tail指向新节点即可
- 如果链表不为空，让新节点的next指向当前头节点，再让当前头部节点的prev指向新节点，最后改变头节点指向即可

### insert

- 首先是插入位置校验
- 如果插入位置是0（头部插入），直接调取prepend
- 如果向尾部插入，直接调取prepend
- 其他位置插入，那么获取当前位置的节点。让新节点的next指向当前节点，新节点的prev指向当前节点的prev，当前节点的上一个节点的next指向新节点，当前节点的prev指向新节点。（当前节点的prev指向最后修改，防止无法通过当前节点获取到上一个节点）

### removeAt

- 首先是删除位置的校验
- 如果删除的是头部节点且只有这一个，那么让head和tail为null即可。否则让head指向原头节点的next，在让头节点的prev指向null
- 如果删除的是尾节点，那么让tail指向原尾节点的prev，再让尾节点的next指向null
- 如果删除的是其他位置，那么先拿到这个位置的节点。让该节点的前一个节点的next指向该节点的next，让该节点的next的prev指向该节点的prev

