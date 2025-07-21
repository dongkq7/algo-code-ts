### 一、链表结构特性

链表也是存储元素的集合，数组在内存中是一段 连续 的空间，但是链表在内存中是 非连续 的空间。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752407484064-af8cc37d-0e0d-43ba-a299-f9441b61a679.png)

链表是由一个个节点连接起来的，节点中除了保存着数据外，还有一个next属性指向下一个节点。

- 通常我们会创建一个head属性指向第一个节点

获取第一个节点时只需要通过this.head来获取即可

- 最后一个节点的next指向null

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752407527268-8615c8b7-79c6-4b39-ae7b-788f76df470e.png)正因为这个特征，链表在查询、新增、删除方面刚好和数组相反。

- 数组

- 查找：速度很快，因为只需要偏移 xxx 个地址单位就可以获取值
- 新增和删除：就比较慢，后面所有的元素涉及到后移或者前移。

- 链表

- 查找：比较麻烦，需要从头节点一个一个进行查找
- 新增和删除：比较方便，直接修改节点的 next 值（内存地址的指向）就可以了。

并且数组和链表对应的是在内存中真实的存储数据的两种结构方式（物理结构）。

**链表常见的形式**

1. 单项链表：每个节点包含下一个节点的地址
2. 双向链表：每个节点会包含上一个节点和下一个节点的地址

### 二、链表结构的实现

实现链表结构，我们封装两个类

- 一个类用来创建链表中一个个节点实例，该类中保存两个属性：value和next

value属性用于保存节点中的数据

next属性用来保存下一个节点的指向（该属性值可能为null，因为最后一个节点的next指向null）

- 另一个类用于创建整个链表实例，该类中保存着head属性、以及封装一些链表常见操作方法

链表常见方法如下：

**append(value)** 向链表尾部添加一个新节点
**insert(position，value)** 向链表的特定位置插入一个新节点

**get(position)** 获取对应位置的节点数据
**indexOf(value)** 返回节点在链表中的索引，如果链表中没有该节点则返回-1（类似于数组中的indexOf）

**update(position，value)** 修改某个位置的节点
**removeAt(position)** 从链表的特定位置移除节点
**remove(value)** 从链表中移除该节点

**traverse()** 遍历输出链表中的节点内容
**isEmpty()** 链表中是否不包含节点  



**reverse()** 反转链表

**swap(index1, index2)** 链表的置换

**LinkedNode  (节点类)**

```typescript
class LinkedNode<T> {
  value: T
  next: LinkedNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}
```

**LinkedList（链表类）**

```typescript
class LinkedList<T> {
  head: LinkedNode<T> | null = null
  private size: number = 0

  // 方便通过.length来获取链表元素个数
  get length() {
    return this.size
  }
}
```

为了后续方便验证，可以首先来实现一下链表的遍历方法

- 创建一个临时变量cur指向this.head，如果head为空则表示链表为空不进行遍历
- 如果链表不为空则把cur指向的node中的value保存在一个数组中，并将重新复制为它的next，直至cur为空结束遍历

```typescript
class LinkedList<T> {
  head: LinkedNode<T> | null = null
  private size: number = 0
  // 遍历输出链表中的内容
  traverse() {
    // 临时变量
    let cur = this.head
    // 存放遍历到的节点
    const values: T[] = []
    while (cur) {
      values.push(cur.value)
      cur = cur.next
    }
    console.log(values.join('->') + '->null')
  }
}
```

链表相关方法过多，下面来逐一实现一下：

#### 向链表中添加节点的实现

向链表尾部追加数据需要考虑两种情况：

1. 链表本身为空，那么就要进创建一个节点并将head指针指向该节点
2. 链表不为空，那么就要创建一个追加在该链表的最后

**具体思路**

- 当链表的head为null时也就是这个链表为空，那么就直接创建一个新的节点，然后让this.head=创建的新节点即可。
- 当this.head不为null。要把新创建的节点追加在最后一个节点后面。那么如何拿到最后一个节点呢？

此时可以创建一个临时变量cur指向head，然后通过while循环找出最后一个节点，循环的结束条件为cur.next为空，如果cur.next不为空那么就让cur = cur.next一直让cur往后走，直到cur.next为空为止（此时cur就指向了最后一个节点了）。

```typescript
 // 向链表中追加节点
  append(value: T) {
  const newNode = new LinkedNode<T>(value)
  // 如果当前链表为空那么直接让head指向该新节点
  if (!this.head) {
    this.head = newNode
  } else {
    // 如果链表不为空，那么就在链表最后追加该节点（让链表的最后一个节点的next指向这个新节点）
    // 创建一个临时变量cur指向head，依次往后走，直到cur.next 为空则表示走到了最后一个节点的位置
    let cur = this.head
    while(cur.next) {
      cur = cur.next!
    }
    cur.next = newNode
  }
  // 链表中节点个数+1
  this.size++
}
```

#### 向特定位置插入节点的实现

向特定位置插入节点，我们需要接收到要插入的位置以及新节点的value。首先需要判断一下传入的position是否产生了越界：小于0或大于当前链表的size都属于越界。

- 等于0表示向链表的头部插入节点
- 等于size表示向链表的尾部插入节点

插入节点时也要考虑两种情况：

1. 向头部插入节点
2. 向其他位置插入节点

**具体思路**

- 当向头部插入节点时，首先根据传入的value创建一个新节点，然后将新节点的next指向原来的第一个节点，然后再将head指向当前的新节点

注意！一定要先让新节点指向原链表的第一个节点再让head指向新节点。而不是先让head指针指向新节点，这样由于新节点的next属性没有指向会导致原来的整个链表就断掉了。

![img](https://cdn.nlark.com/yuque/0/2023/jpeg/22253064/1689525794506-bbd25f4c-5839-4cb8-ae97-dc80bd9f9bf0.jpeg)

- 向其他某个位置插入节点时。需要获取到该位置的节点以及该位置的上一个节点。让新节点的next指向该位置的节点，让上一个位置的节点的next指向新节点即可。

这里也同样需要注意一定先让新节点的next先指向原链表的节点，再让原链表节点的next指向新节点，不然整个链表就断掉了。

针对这种情况可以引入三个变量：i = 0; cur = this.head; pre = null; 分别记录循环到的索引位置、当前循环指向的节点以及当前循环的前一个节点。每次循环如果还未到达需要插入的位置，那么就让pre = cur; cur = cur.next。这样一次循环结束后就可以拿到该位置的节点以及该位置的上一个节点了。

![img](https://cdn.nlark.com/yuque/0/2023/jpeg/22253064/1689580130387-b10b7fcd-481b-4299-9003-0a4bb2acbe7d.jpeg)

```typescript
// 向某个位置插入节点
  insert(position: number, value: T): boolean {
  // 越界
  if (position < 0 || position > this.size) return false
  const newNode = new LinkedNode<T>(value)
  if (position === 0) {
    // 节点想插入到首位，那么就让新节点的next指向当前head所指向的节点
    // 再让head指向新节点即可
    newNode.next = this.head
    this.head = newNode
  } else {
    // 插入到其他位置
    // 那么就创建两个临时变量cur与pre分别记录想要插入位置的节点及该节点的前一个节点
    // 让新节点的next指向该节点，再让该节点的前一个节点的next指向新节点即可
    let cur = this.head
    let pre: LinkedNode<T> | null = null
    let i = 0
    while(i++ < position) {
      pre = cur!
      cur = cur!.next
    }
    newNode.next = cur
    pre!.next = newNode
  }
  this.size++
  return true
}
```

PS：也可以只获取当前位置的前一个节点pre，那么cur就直接通过pre.next来代替：

```typescript
let i = 0
let pre = this.head
// 找到position的前一个节点
while(i++ < position - 1) {
  pre = pre!.next
}
newNode.next = pre!.next
pre!.next = newNode
```

#### 获取指定位置的节点

首先判断一下传入的数字是否越界，然后定义一个临时变量来保存当前节点，cur一直走到指定位置返回对应节点的value即可

```typescript
 get(position: number): T | null {
  if (position < 0 || position >= this.size) return null

  let cur: LinkedNode<T> = this.head!
  let i = 0
  while(i++ < position) {
    cur = cur.next!
  }
  return cur.value
}
```

此时会发现，方法中几乎都使用到了根据索引获取当前节点的逻辑。可考虑将其封装为一个私有方法供其他方法使用：

```typescript
 // 根据索引获取该位置节点
  private getNode(position: number): LinkedNode<T> | null {
    let cur = this.head
    let i = 0
    while(i++ < position && cur) {
      cur = cur.next
    }
    return cur
  }
```

此时get方法就可以写成：

```typescript
get(position: number): T | null {
  if (position < 0 || position >= this.size) return null
  return this.getNode(position)?.value ?? null
}
```

??操作符：如果左侧表达式的值为null或者undefined则返回右侧的值，与||类似，只不过||针对的是假值，而??针对是的null和undefined

#### 移除特定位置的节点

当删除特定位置的节点时，首先需要判断一下传入的position是否产生了越界：小于0或大于等于当前链表的size都属于越界。

- 等于0表示删除头部的节点
- 等于size-1表示删除尾部的节点



删除指定节点时也要考虑两种情况：

1. 删除头部节点
2. 删除其他位置节点

**具体思路**

- 删除头部节点时，之需要让head指向当前节点的下一个节点即可

由于head指向的是第一个节点那么之需要：

this.head = this.head.next

- 删除其他位置节点时，需要让该节点的上一个位置的节点的next指向当前节点的下一个节点

同样也可以使用两个临时变量pre与cur来分别指向当前节点与当前节点的上一个节点，然后让pre.next = cur.next即可

![img](https://cdn.nlark.com/yuque/0/2023/jpeg/22253064/1689582337173-67f7c02b-979c-42ad-8f9e-e764fb8a2863.jpeg)

```typescript
// 删除特定位置的节点
  removeAt(position: number): T | null {
  // 越界
  if (position < 0 || position >= this.size) return null
  let cur: LinkedNode<T> = this.head!
  if (position === 0) {
    this.head = this.head!.next
  } else {
    let pre: LinkedNode<T> | null = null
    let i = 0
    while(i++ < position) {
      pre = cur
      cur = cur.next!
    }
    pre!.next = cur.next
  }
  this.size--
  return cur.value
}
```

PS：也可以只获取当前位置的前一个节点pre，那么cur就直接通过pre.next来代替：

```typescript
  // 删除特定位置的节点
removeAt(position: number) {
  if (position < 0 || position >= this.size) return null
  let current = this.head
  if (position === 0) {
    this.head = current?.next ?? null
  } else {
    const preNode = this.getNode(position - 1)
    current = preNode!.next
    preNode!.next = preNode!.next?.next ?? null
  }
  this.size--
  return current.value
}
```

#### 更新指定位置节点

首先判断传入索引是否越界，然后通过封装的私有方法getNode获取到节点，将该节点的内容修改为传入的内容即可。

```typescript
  // 更新某个位置的节点
  update(position: number, value: T): boolean {
    if (position < 0 || position >= this.size) return false
    const cur = this.getNode(position)
    cur!.value = value
    return true
	}
```

#### 获取节点所在位置

声明一个变量指向head，一个记录索引的变量i，让cur一直往后走，i++，直到找到该节点并返回索引位置；循环结束还未找到则返回-1。

```typescript
  indexOf(value: T): number {
    let cur = this.head
    let i = 0
    while(cur) {
      if (cur.value === value) return i
      i ++
      cur = cur.next
    }
    return -1
  }
```

#### 根据节点内容移除某个节点

可借助已经实现的indexOf与removeAt方法来实现：

```typescript
remove(value: T): T | null {
  const index = this.indexOf(value)
  return this.removeAt(index)
}
```



#### 链表置换

找到两个节点，并且交换两个节点的value

- 首先进行边界条件处理：如果index相同表示同一个节点不需要交换，如果其中一个index越界了也不交换
- 对链表进行循环去寻找对应位置的节点，如果都找到了则交换，有一个找不到则不进行交换

```javascript
/ 置换链表
  swap(index1: number, index2: number) {
    // 边界条件判断
    if (
      index1 === index2 ||
      index1 < 0 ||
      index1 >= this.size ||
      index2 < 0 ||
      index2 >= this.size
    ) {
      return false
    }

    let cur = this.head
    let i = 0
    let node1: LinkedNode<T> | null = null
    let node2: LinkedNode<T> | null = null

    while (cur) {
      if (index1 === i) {
        node1 = cur
      }
      if (index2 === i) {
        node2 = cur
      }
      // 都找到了，跳出循环
      if (node1 && node2) {
        break
      }
      i++
      cur = cur.next
    }

    // 有可能是遍历链表结束跳出了循环，所以这里也要判断一下
    if (node1 && node2) {
      let temp = node1.value
      node1.value = node2.value
      node2.value = temp
      return true
    }
    return false
  }
```



#### 反转链表

用循环的方式实现，需要在遍历链表的时候**将当前节点的next指向前一个节点**。

由于链表没有引用前一个节点，所以我们就要有一个变量来保存前一个节点。

并且在更改当前节点的next指向时要保存好其后一个节点。不然整个链表就断掉了：



![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753069987338-a607945b-be34-4115-988d-c2ca06fe14e0.png)

1. 准备三个变量，cur表示当前节点、pre表示前一个节点、next表示下一个节点。首先`cur = this.head`、`pre = null`、`next = null`

- 开始循环进行链表反转，直到cur为null时结束
- 第一轮循环，next先来到cur的下一个位置来记录下一个节点，防止反转后链表断掉
- 然后`cur.next = pre`，让当前节点的next指向pre，此时完成了第一个节点的反转
- 接着让`pre = cur`、`cur = next`开始准备第二个节点的反转

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753072587447-41a33a97-6c2a-4bf8-9297-6f457d4aba8b.png)

1. 此时cur来到了第二个节点的位置

- 同样，先让next指向当前节点的下一个节点，也就是第三个节点
- 接着让cur.next = pre、pre = cur、cur = next完成第二轮的链表反转

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753072604678-06da28be-3f7b-4d9c-9248-a1892c7a598f.png)

1. 重复这个步骤

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753072613846-f2f60b46-0fe4-4fd8-9c1d-e405703d3da4.png)

1. 至此，next走向了null，cur走向了null，pre走向了最后一个节点。完成了循环与链表的反转。**此时pre指向的便是新的头节点，**`this.head = pre`**即可**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753072622526-210dd623-99bf-4590-ba91-c0fe3431d5bd.png)



```typescript
  // 反转链表
  reverse() {
    if (!this.head || !this.head.next) return
    let cur = this.head
    let pre: LinkedNode<T> | null = null
    let next: LinkedNode<T> | null = null

    while (cur) {
      next = cur.next
      cur.next = pre
      pre = cur
      cur = next
    }

    this.head = pre
  }
```

#### 完整代码

```typescript
class LinkedNode<T> {
  value: T
  next: LinkedNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

class LinkedList<T> {
  head: LinkedNode<T> | null = null
  private size: number = 0

  // 方便通过.length来获取链表元素个数
  get length() {
    return this.size
  }

  // 根据索引获取该位置节点
  private getNode(position: number): LinkedNode<T> | null {
    let cur: LinkedNode<T> = this.head
    let i = 0
    while (i++ < position && cur) {
      cur = cur.next
    }
    return cur
  }

  // 向链表中追加节点
  append(value: T) {
    const newNode = new LinkedNode<T>(value)
    // 如果当前链表为空那么直接让head指向该新节点
    if (!this.head) {
      this.head = newNode
    } else {
      // 如果链表不为空，那么就在链表最后追加该节点（让链表的最后一个节点的next指向这个新节点）
      // 创建一个临时变量cur指向head，依次往后走，直到cur.next 为空则表示走到了最后一个节点的位置
      let cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = newNode
    }
    this.size++
  }

  // 向某个位置插入节点
  insert(position: number, value: T): boolean {

    // 1.越界的判断
    if (position < 0 || position > this.size) return false

    // 2.根据value创建新的节点
    const newNode = new LinkedNode(value)

    // 3.判断是否需要插入头部
    if (position === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      const previous = this.getNode(position - 1)
      newNode.next = previous!.next
      previous!.next = newNode
    }
    this.size++

    return true
  }

  // 删除特定位置的节点
  removeAt(position: number) {
    if (position < 0 || position >= this.size) return null
    let cur = this.head
    if (position === 0) {
      this.head = cur?.next ?? null
    } else {
      const preNode = this.getNode(position - 1)
      cur = preNode!.next
      preNode!.next = preNode!.next?.next ?? null
    }
    this.size--
    return cur.value
  }

  indexOf(value: T): number {
    let cur = this.head
    let i = 0
    while (cur) {
      if (cur.value === value) return i
      i++
      cur = cur.next
    }
    return -1
  }

  remove(value: T): T | null {
    const index = this.indexOf(value)
    return this.removeAt(index)
  }

  // 更新某个位置的节点
  update(position: number, value: T): boolean {
    if (position < 0 || position >= this.size) return false
    const cur = this.getNode(position)
    cur!.value = value
    return true
  }

  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null
    return this.getNode(position)?.value ?? null
  }

  // 反转链表
  reverse() {
    if (!this.head || !this.head.next) return
    let cur = this.head
    let pre: LinkedNode<T> | null = null
    let next: LinkedNode<T> | null = null

    while (cur) {
      next = cur.next
      cur.next = pre
      pre = cur
      cur = next
    }

    this.head = pre
  }

  // 置换链表
  swap(index1: number, index2: number) {
    // 边界条件判断
    if (
      index1 === index2 ||
      index1 < 0 ||
      index1 >= this.size ||
      index2 < 0 ||
      index2 >= this.size
    ) {
      return false
    }

    let cur = this.head
    let i = 0
    let node1: LinkedNode<T> | null = null
    let node2: LinkedNode<T> | null = null

    while (cur) {
      if (index1 === i) {
        node1 = cur
      }
      if (index2 === i) {
        node2 = cur
      }
      // 都找到了，跳出循环
      if (node1 && node2) {
        break
      }
      i++
      cur = cur.next
    }

    // 有可能是遍历链表结束跳出了循环，所以这里也要判断一下
    if (node1 && node2) {
      let temp = node1.value
      node1.value = node2.value
      node2.value = temp
      return true
    }
    return false
  }

  // 遍历输出链表中的内容
  traverse() {
    // 临时变量
    let cur = this.head
    // 存放遍历到的节点
    const values: T[] = []
    while (cur) {
      values.push(cur.value)
      cur = cur.next
    }
    console.log(values.join('->') + '->null')
  }

  isEmpty() {
    return this.size === 0
  }
}
```

### 三、相关题目

#### 删除节点

题目链接：https://leetcode.cn/problems/delete-node-in-a-linked-list/description/

有一个单链表的 head，我们想删除它其中的一个节点 node。

给你一个需要删除的节点 node 。你将 无法访问 第一个节点 head。

链表的所有值都是 唯一的，并且保证给定的节点 node 不是链表中的最后一个节点。

删除给定的节点。注意，删除节点并不是指从内存中删除它。这里的意思是：

给定节点的值不应该存在于链表中。

链表中的节点数应该减少 1。

node 前面的所有值顺序相同。

node 后面的所有值顺序相同。

![img](https://cdn.nlark.com/yuque/0/2023/png/22253064/1689653982928-73fd2988-1dd1-4969-9fe0-5e93b5ecf6cd.png)

**具体思路**

既然无法访问head节点，那就意味着我们只能访问到要删除节点的后面的节点。题目中所说这里的删除并不是指从内存中删除**，那么我们就可以将待删除节点的val变为它后一个节点的val，然后再让当前节点的next变为它的next的next即可：**

![img](https://cdn.nlark.com/yuque/0/2023/jpeg/22253064/1689654470985-e8710164-6016-40a0-a3fb-12aef62a1d1e.jpeg)

```typescript
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }
}

function deleteNode(node: ListNode | null): void {
  node!.val = node!.next!.val
  node!.next = node!.next!.next
};

export {}
```