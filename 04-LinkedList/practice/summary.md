# 一、反转链表



https://leetcode.cn/problems/reverse-linked-list/?envType=study-plan-v2&envId=top-100-liked

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753075597696-d08025cb-8768-4b60-8178-ed517b680062.png)

- 当前要反转的节点初始为头节点，cur = head
- 再准备两个变量pre 与next，分别代表前一个节点和后一个节点，pre与next初始为null
- 进入循环，循环的终止条件是cur为null
- 循环时首先把next指向cur.next，`**next = cur.next**`防止链表断掉
- 然后`**cur.next = pre**`完成反转
- 再将pre向后移动、cur向后移动，`**pre = cur**` `**cur = next**`

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseList(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) return head

    let cur = head
    let pre: ListNode | null = null
    let next: ListNode | null = null

    while(cur) {
        next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};
```



# 二、回文链表

https://leetcode.cn/problems/palindrome-linked-list/description/?envType=study-plan-v2&envId=top-100-liked

给定一个单链表的头节点head，判断链表是否为回文结构：

- 1 -> 2 -> 1，返回true
- 1 -> 2 -> 2 -> 1，返回true
- 15 -> 6 -> 15，返回true
- 1 -> 2 -> 3，返回false

要求时间复杂度O(N)，额外空间复杂度O(1)



# 具体思路



使用快慢指针的方式

1. 使用快慢指针（n1快指针，n2慢指针），快指针一次两步，慢指针一次走一步，快指针走完时，慢指针来到中点

```typescript
 // 快指针一次走一步，慢指针一次走两步
  while (n1.next !== null && n1.next.next !== null) {
    n1 = n1.next.next
    n2 = n2.next
  }
```

来看下为什么通过这个while循环可以让慢指针来到中点的位置：

当节点数是奇数时，通过这个while循环，正好可以让快指针走到尾节点处，慢指针走到中点位置

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753079831779-f3ca728c-ff27-489d-aa69-573d3414bad8.png)

当节点数是偶数的时候，正好慢指针走到对称轴的前一个节点的位置，快指针走到尾节点的前一个节点处：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753087514179-9eb80037-83db-49d8-8def-a57d2ae8f858.png)

1. 接下来将后半段链表逆序

```typescript
let n3: ListNode | null = null // 作为前一个节点
  // 此时慢指针来到了中点的位置，开始逆序
  while (n2 !== null) {
    n1 = n2.next
    n2.next = n3
    n3 = n2
    n2 = n1
  }
```

- 以1 -> 2 -> 3 -> 5 -> 3 -> 2 -> 1为例，n2目前指向了待反转的第一个节点，此时声明一个变量n3指向null
- 第一轮，让n1指向n2的next位置`n1=n2.next`（防止链表断掉），然后`n2.next = n3``n3 = n2` `n2 = n1`

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753088227989-23393f80-257d-4403-82c4-c2f62243765a.png)

- 第二轮，重复这个操作，首先让`n1 = n2.next`，然后让`n2.next = n3`、`n3 = n2`、`n2 = n1`

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753088266048-abdcf7c1-1694-4f7a-a27f-58c770547ea2.png)

- 依次重复直到n2节点为null

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753088301017-2c12eb0d-d3d1-4bc1-8071-60d6806b243c.png)

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753088357225-fea18a0a-5187-4012-8c01-91d413913a76.png)

1. 原链表的头节点与尾节点分别用个变量记住，然后依次向中间走，边走边比对，如果每一步都一样即是回文

- 此时n3来到了尾节点的位置，让`n1 = head``n2 = n3`，n1与n2分别通过`.next`向中间走，边走边去对比，如果n1.val与n2.val不相等，则直接退出循环

【注意】循环的终止条件是`**n1 !== null && n2 !== null**`**而不是**`n1.next !== null && n2.next !== null`，因为在n1和n2走到5这个节点的时候也需要去对比一下，如果是偶数个节点那么对比的分别是对称轴两侧的节点。对比完5后n1和n2变为null退出循环，或者两个节点值不相等退出循环

```typescript
  let result = true
  while (n1 !== null && n2 !== null) {
    if (n1.val !== n2.val) {
      result = false
      break
    }
    n1 = n1.next
    n2 = n2.next
  }
```

1. 然后再将右半部分链表恢复成原来的样子

- **此时n3作为第一个要反转的节点**，先把n2 = null，作为n3反转时所要链接的next节点，首先n1指向n3的next节点防止链表断掉，然后`n3.next = n2`完成反转，接着n2 = n3、n3 = n1 向前走，依次进行，直到n3指向null

【TIP】反转链表时

- 初始，有一个变量指向第一个要反转的节点，然后还要有一个变量指向null，作为前一个节点（也就是反转节点要链接的节点）
- 循环结束条件为当前要反转节点为null
- 进入循环，首先有一个变量指向当前反转节点的下一个节点，防止链表断掉
- 然后进行反转
- 反转后将当前节点与当前节点的前一个节点向下移动

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753088667981-df95c228-7b0d-497e-a302-6e9976b46e50.png)

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753088938122-a1f15099-f78a-478a-9d4e-a9d72d97e2ca.png)

1. 最后再返回true或false



# 代码实现

```typescript
// 判断是否为回文链表
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function isPalindrome(head: ListNode | null): boolean {
  // 如果是空链表或者只有一个节点返回true
  if (head === null || head.next === null) return true

  let n1 = head // 快指针
  let n2 = head // 慢指针

  // 快指针一次走一步，慢指针一次走两步
  while (n1.next !== null && n1.next.next !== null) {
    n1 = n1.next.next
    n2 = n2.next
  }

  let n3: ListNode | null = null // 作为前一个节点
  // 此时慢指针来到了中点的位置，开始逆序
  while (n2 !== null) {
    n1 = n2.next
    n2.next = n3
    n3 = n2
    n2 = n1
  }
  // 此时完成了后半部分链表的反转，开始进行对比
  n1 = head
  n2 = n3

  let result = true
  while (n1 !== null && n2 !== null) {
    if (n1.val !== n2.val) {
      result = false
      break
    }
    n1 = n1.next
    n2 = n2.next
  }

  // 对后半部分节点进行反转回来
  n2 = null
  while (n3 !== null) {
    n1 = n3.next
    n3.next = n2
    n2 = n3
    n3 = n1
  }
  return result
}

// const node1 = new ListNode(1)
// const node2 = new ListNode(2)
// const node3 = new ListNode(3)
// const node4 = new ListNode(5)
// const node5 = new ListNode(3)
// const node6 = new ListNode(2)
// const node7 = new ListNode(1)
// node1.next = node2
// node2.next = node3
// node3.next = node4
// node4.next = node5
// node5.next = node6
// node6.next = node7
// node7.next = null
// console.log(isPalindrome(node1))

// const node1 = new ListNode(1)
// const node2 = new ListNode(2)
// const node3 = new ListNode(2)
// const node4 = new ListNode(1)
// node1.next = node2
// node2.next = node3
// node3.next = node4
// node4.next = null
// console.log(isPalindrome(node1))

// const node1 = new ListNode(1)
// const node2 = new ListNode(2)
// node1.next = node2
// node2.next = null
// console.log(isPalindrome(node1))

const node1 = new ListNode(1)
const node2 = new ListNode(1)
const node3 = new ListNode(2)
const node4 = new ListNode(1)
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = null
console.log(isPalindrome(node1))
```

# 三、单链表调整排序

https://leetcode.cn/problems/partition-list/ （注意，这道题是小于区域放左，大于等于区域放右）

将单向链表按某值划分成左边小、中间相等、右边大的形式

给定一个单链表的头节点head，节点值类型都是整型，再给定一个整数pivot。实现一个调整链表的函数，将链表调整为左部分都是值小于pivot的节点，中间部分都是等于pivot的节点，有部分都是大于pivot的节点。

# 具体思路

- 要求调整后所有节点相对顺序一样
- 时间复杂度为O(N)，额外空间复杂度O(1)

准备六个变量：

- `SH`、`ST`小于基准值的头和尾，一开始指向null
- `EH`、`ET`等于基准值的头和尾，一开始指向null
- `BH`、`BT`大于基准值的头和尾，一开始指向null

然后依次遍历链表，将遍历到的节点按照值的大小放到对应变量指向的位置，最后将六个变量指向的节点串起来即可。

假如有如下链表，基准值为5：

1. 第一个节点为4，小于基准值，然后看小于区域的头和尾，都是null，所以此时头和尾都要指向4节点`SH=4`、`ST=4`

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752028675894-3c537bf9-1499-4ae0-8efe-f88660a5ee47.png)

1. 接下来到6这个节点了，大于基准值，此时大于区域的头节点尾节点都是null，让BH和BT都指向6节点

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752028733493-2bf5e3bd-4680-42b5-a389-87a837113331.png)

1. 然后是3，小于区域的头和尾不是空了，说明发现过小于5的节点，那么就让此时`ST`（尾节点）指向节点的next指向3，也就是4节点指向3，再让`ST`指向3即可，现在尾节点指向了3：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752028974786-7c038b08-dd0f-4f25-8dc2-c800b532365e.png)

1. 接下来是5，将EH和ET指向5：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752029057714-4369a70a-79cd-4f5a-a58a-771662d53b97.png)

1. 接下来是8，让`BT`指向的节点的next指向8，再让`BT`指向8：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752029118461-06622d16-ca4c-426e-bd85-5ef2e75e79ac.png)

1. 然后是5，让`ET`指向的节点的next指向5，再让`ET`指向新的5节点：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752029197830-b6ac032a-f967-4539-bd78-b7a985674648.png)

1. 最后到了2，然`ST`的next指向2，最后更新`ST`指向，指向2：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752029286755-4b2690de-f78a-4e1e-bd31-b3890ad490cb.png)

1. 最后小于区域的尾连等于区域的头，等于区域的尾连大于区域的头：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1752029398380-1e4809ac-650d-4710-b06d-6d78815b0f36.png)

要注意边界问题，万一某个区域没有节点，那么是null，null不能做连接

# 代码实现

```typescript
// 分割链表
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function partition(head: ListNode | null, x: number): ListNode | null {
  let sH: ListNode | null = null // small head
  let sT: ListNode | null = null // small tail
  let eH: ListNode | null = null // equal head
  let eT: ListNode | null = null // equal tail
  let mH: ListNode | null = null // big head
  let mT: ListNode | null = null // big tail

  let next = null
  while (head !== null) {
    next = head.next
    head.next = null
    if (head.val < x) {
      if (sH === null) {
        sH = head
        sT = head
      } else {
        sT.next = head
        sT = head
      }
    } else if (head.val === x) {
      if (eH === null) {
        eH = head
        eT = head
      } else {
        eT.next = head
        eT = head
      }
    } else {
      if (mH === null) {
        mH = head
        mT = head
      } else {
        mT.next = head
        mT = head
      }
    }
    head = next
  }

  // 如果有小于区域
  if (sT !== null) {
    sT.next = eH // 小于区域尾链接等于区域头
    eT = eT === null ? sT : eT // 如果没有等于区域，那么小于区域的尾作为等于区域的尾去链接大于区域的头
  }

  if (eT !== null) {
    eT.next = mH
  }
  return sH ?? eH ?? mH
}

const node1 = new ListNode(1)
const node2 = new ListNode(4)
const node3 = new ListNode(3)
const node4 = new ListNode(2)
const node5 = new ListNode(5)
const node6 = new ListNode(2)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node6
node6.next = null

let newHead = partition(node1, 2)

let result = []
let cur = newHead
while (cur) {
  result.push(cur.val)
  cur = cur.next
}

console.log(result.join('->'))

export {}
```

# 四、克隆链表

https://leetcode.cn/problems/copy-list-with-random-pointer/

复制含有随机节点的链表

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753095819253-458e3ebd-7069-444f-a3bf-5935eec1a713.png)

一种特殊的单链表节点类描述如下：

```java
class _Node {
  val: number
  next: _Node | null
  random: _Node | null

  constructor(val?: number, next?: _Node, random?: _Node) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
    this.random = random === undefined ? null : random
  }
}
```

random指针是单链表节点结构中新增的指针，random可能指向链表中的任意一个节点，也可能是null。给定一个由Node节点类型组成的无环单链表的头节点head，请实现一个函数完成这个链表的复制，并返回复制的新链表的头节点。

要求时间复杂度O(N)，额外空间复杂度O(1)

# 具体思路

1. 将生成克隆节点放在原链表节点的下一个位置，然后再将克隆节点的下一个指针指向原节点的下一个

```typescript
let cur = head
let next: _Node | null = null
while(cur !== null) {
  next = cur.next
  cur.next = new _Node(cur.val)
  cur.next.next = next
  cur = next
}
```

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753101126337-20594633-8eb9-44e1-9896-efc448873ebd.png)

1. 那么此时就可以一对一对的拿出原节点和克隆节点来，通过原节点的random指针找到指向的节点，该节点的下一个节点即克隆节点random该指向的节点，这样以来，一对一对的处理即可把random指针克隆完毕

- 首先保存一下 下一对节点的原始节点，即`cur.next.next`
- 然后找到克隆节点也就是`cur.next`
- 对克隆节点的random进行赋值
- 再将cur移动到next节点处
- 依次循环...

```typescript
cur = head
let copyNode: _Node | null = null
// 原节点与克隆节点一对对取出来去设置random
while (cur !== null) {
  next = cur.next.next
  copyNode = cur.next
  copyNode.random = cur.random === null ? null : cur.random.next
  cur = next
}
```

1. 最后再将克隆链表分离出来

注意，head节点不能为空，所以在程序一开始要判断一下

```typescript
const res = head.next
cur = head
while (cur !== null) {
  next = cur.next.next
  copyNode = cur.next
  cur.next = next
  copyNode.next = next !== null ? next.next : null
  cur = next
}
return res
```

# 代码实现

```typescript
function copyRandomList(head: _Node | null): _Node | null {
  if (head === null) return head
  let cur = head
  let next: _Node | null = null

  // 克隆节点放到原节点的下一个位置
  while (cur !== null) {
    next = cur.next
    cur.next = new _Node(cur.val)
    cur.next.next = next
    cur = next
  }

  cur = head
  let copyNode: _Node | null = null
  // 原节点与克隆节点一对对取出来去设置random
  while (cur !== null) {
    next = cur.next.next
    copyNode = cur.next
    copyNode.random = cur.random === null ? null : cur.random.next
    cur = next
  }

  // 分离克隆节点与原节点
  const res = head.next
  cur = head
  while (cur !== null) {
    next = cur.next.next
    copyNode = cur.next
    cur.next = next
    copyNode.next = next !== null ? next.next : null
    cur = next
  }
  return res
}
```

# 五、链表是否有环

# 问题

判断一个链表是否有换

## 解题思路

创建两个指针，一个指针一次走一步，一个指针一次走两步，如果两个指针相遇了则证明有环

这个解题方法类似于一个追及问题：在一个环形跑道上，两个运动员从同一地点气泡，一个运动员速度快，另一个运动员速度慢。当两人跑了一段时间后，速度快的运动员必然会再次追上并超过速度慢的运动员，原因很简单。因为跑到是环形的

## 代码实现

```typescript
// 链表是否有环
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function hasCycle(head: ListNode | null): boolean {
  let n1 = head
  let n2 = head
  while (n2 !== null && n2.next !== null) {
    n1 = n1.next
    n2 = n2.next.next
    if (n1 === n2) {
      return true
    }
  }
  return false
}
const node1 = new ListNode(3)
const node2 = new ListNode(2)
const node3 = new ListNode(0)
const node4 = new ListNode(4)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node2

console.log(hasCycle(node1))
```

# 扩展1：求环的长度

当两个指针首次相遇，证明链表有环的时候，让两个指针从相遇点继续前进，并统计前进的循环次数，直到两个指针第二次相遇。**此时，统计出来的前进次数就是环长。**

**因为指针p1每次走1步，指针p2每次走2步，两者的速度差是1步。当两个指针再次相遇时，p2比p1多走了整整1圈。因此，**`**环长 = 每一次速度差 \* 前进次数**`

# 扩展2：如果有环返回第一个入环节点

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753152962756-021afd8f-cc6e-4570-ad32-422c1d6ce1dc.png)

假设从链表头节点到入环节点的距离是D，从入环节点到两个指针首次相遇点的距离是S1，从首次相遇点回到入环节点的距离是S2。那么，当两个指针首次相遇时，各自所走的距离是多少呢？

- 指针n1，一次走一步，所走的距离是D + S1
- 指针n2，一次走两步，多走了n整圈，所走的距离是 D + S1 + n(S1+S2)
- 由于n2的速度是n1的2倍，所以所走的距离也是n1的2倍，因此 `**2(D + S1) = D + S1 + n(S1 + S2)**`**，得出**`**D = (n-1)(S1 + S2)+S2**`
- 也就是说，从链表头节点到入环节点的距离等于从首次相遇点绕环n-1圈再回到入环点的距离
- **这样一来，把其中一个指针放回到头节点位置，另一个指针保持在首次相遇点，两个指针都是每次向前走1步，那么它们最终相遇的节点，就是入环节点**

【注意】这道题需要首先判断一下`head === null || head.next === null || head.next.next === null`，因为要先让n1和n2各走一步与两步，while循环的条件为n1是否等于n2，循环中判断如果n2的next与n2的next next是否为空来决定是否返回null

- 当while结束，来到下面的逻辑则证明n1与n2指向了同一个节点，此时让n2或者n1回到头节点的位置，两个节点各走一步，再次相遇的节点则是入环节点

```typescript
// 链表是否有环
// https://leetcode.cn/problems/linked-list-cycle-ii/

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null || head.next.next === null) {
    return null
  }

  let n1 = head.next
  let n2 = head.next.next
  while (n1 !== n2) {
    if (n2.next === null || n2.next.next === null) {
      return null
    }
    n1 = n1.next
    n2 = n2.next.next
  }
  // 来到这里两个指针指向了同一个节点
  n2 = head
  while (n1 !== n2) {
    n1 = n1.next
    n2 = n2.next
  }
  return n1
}
const node1 = new ListNode(3)
const node2 = new ListNode(2)
const node3 = new ListNode(0)
const node4 = new ListNode(4)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node2

// const node1 = new ListNode(1)
// const node2 = new ListNode(2)

// node1.next = node2
// node2.next = node1
console.log(detectCycle(node1).val)
export {}
```

# 六、链表相交问题

【题目】给定两个可能有环也可能无环的单链表，头节点head1和head2。请实现一个函数，如果两个链表相交，返回相交的第一个节点；如果不想交，返回null。

【要求】如果两个链表长度之和为N，事件复杂度O(N)，额外空间复杂度O(1)。



# 具体思路

## 判断是否有环并拿到入环节点

1. 首先分别得到两个链表的入环节点

- 以下方法是拿到入环节点的方法（详细过程见第五点）

```typescript
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function getLoopNode(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null || head.next.next === null) {
    return null
  }

  let n1 = head.next
  let n2 = head.next.next
  while (n1 !== n2) {
    if (n2.next === null || n2.next.next === null) {
      return null
    }
    n1 = n1.next
    n2 = n2.next.next
  }
  // 来到这里两个指针指向了同一个节点
  n2 = head
  while (n1 !== n2) {
    n1 = n1.next
    n2 = n2.next
  }
  return n1
}
```

## 如果两个链表都是无环链表

1. 如果两个链表的入环节点都为null，说明两个链表是无环的：

- 两个相交的无环链表必定存在公共的部分，**从第一个相交节点开始到尾节点都是公有的节点，****因为不可能岔开，如果岔开则证明一个节点会存在两个next指针，是不合理的**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753155760551-7686cbbd-518a-4197-8822-fda673e9a0a2.png)

- 那么此时分别去遍历这两个链表，拿到最后一个节点，并记录链表的长度，**如果两个链表的最后一个节点不相等那么它们是不相交的，直接返回null**
- 如果最后一个节点相等那么证明相交，此时去拿第一个相交的节点。**比如第一个链表长度为10，第二个链表长度为8，那么就让第一个链表的指针先走2步，再让第二个链表指针开始走，****第一个相等的节点便是第一个相交的节点，直接返回**

```typescript
function noLoop(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  let curA = headA
  let n = 0
  // 拿到链表A的最后一个节点，并统计好长度
  while (curA.next !== null) {
    n++
    curA = curA.next
  }
  let curB = headB
  // 拿到链表B的最后一个节点，并计算好差值
  while (curB.next !== null) {
    n--
    curB = curB.next
  }
  // 如果最后一个节点不相等那么不想交
  if (curA !== curB) return null
  // 谁长，谁作为headA
  curA = n > 0 ? headA : headB
  // 谁短谁作为headB
  curB = curA === headA ? headB : headA
  n = Math.abs(n)
  // 长链表先走差值步
  while (n !== 0) {
    n--
    curA = curA.next
  }
  // 走完差值步依次走一步，直到相遇
  while (curA !== curB) {
    curA = curA.next
    curB = curB.next
  }
  return curA
}
```

## 如果一个有环一个无环

这种是不可能的，如果相交则有节点会有两个next。所以一个有环一个无环不可能相交。

## 两个链表都有环

这有以下三种情况：

- 情况1：各自有独立的环
- 情况2：共用环且相交节点和入环节点不是同一个
- 

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753158198780-c729126c-b253-400b-a926-4c46d3f3a017.png)

### 情况2

对于情况2来说拿到入环节点后，不为空且相等则为证明这种情况。那么怎么求第一个相交节点呢？

可以把入环节点作为最后一个节点去统计长度，然后按照求无环链表的相交节点来求就可以了，长链表先走差值步，然后短链表再走，第一个相遇的节点便是相交节点。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753158526241-97bbd0f7-b9de-4ce7-b384-16f3a698571a.png?x-oss-process=image%2Fcrop%2Cx_0%2Cy_0%2Cw_504%2Ch_484)

```typescript
function bothLoop(
  headA: ListNode | null,
  loopA: ListNode | null,
  headB: ListNode | null,
  loopB: ListNode | null
): ListNode | null {
  let curA = null
  let curB = null
  // 说明两个链表入环节点相同
  if (loopA === loopB) {
    // 那么让入环节点作为最后一个节点来统计链表长度
    curA = headA
    curB = headB
    let n = 0

    while (curA !== loopA) {
      n++
      curA = curA.next
    }

    while (curB !== loopB) {
      n--
      curB = curB.next
    }

    curA = n > 0 ? headA : headB
    curB = curA === headA ? headB : headA
    n = Math.abs(n)
    while (n !== 0) {
      n--
      curA = curA.next
    }

    while (curA !== curB) {
      curA = curA.next
      curB = curB.next
    }
    return curA
  }
}
```

### 情况1与情况3

对于情况1和情况3来说两个入环节点不相等，如何区分这两种情况呢？

- 让其中一个链表的入环节点继续往下走，如果在转回到自己之前能遇到另一个链表的入环节点则是情况3，否则是情况1
- 如果是情况1，则相交节点返回null
- 如果是情况3，返回哪个入环节点1或者入环节点2都可，都能代表两个链表的相交节点，只不过一个离链表1近一些、一个离链表2近一些

```typescript
else {
  curA = loopA.next
  // 在curA下一次到达loopA之前如果遇到了loopB，说明公用了一个环，那么返回curA或curB均可
  while (curA !== loopA) {
    if (curA === loopB) {
      return curA
    }
    curA = curA.next
  }
  // 到了这里说明两个有环链表不相交
  return null
}
```

# 完整代码

```typescript
// 判断两条单链表是否相交，并返回相交节点
// https://leetcode.cn/problems/3u1WK4/

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  // 其中一个链表为空，一定不相交
  if (headA === null || headB === null) {
    return null
  }
  // 分别拿到两个链表的入环节点
  const loopA = getLoopNode(headA)
  const loopB = getLoopNode(headB)
  // 两个链表均无环
  if (loopA === null && loopB === null) {
    return noLoop(headA, headB)
  }
  // 两个链表均有换
  if (loopA !== null && loopB !== null) {
    return bothLoop(headA, loopA, headB, loopB)
  }
  return null
}

function noLoop(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  let curA = headA
  let n = 0
  // 拿到链表A的最后一个节点，并统计好长度
  while (curA.next !== null) {
    n++
    curA = curA.next
  }
  let curB = headB
  // 拿到链表B的最后一个节点，并计算好差值
  while (curB.next !== null) {
    n--
    curB = curB.next
  }
  // 如果最后一个节点不相等那么不想交
  if (curA !== curB) return null
  // 谁长，谁作为headA
  curA = n > 0 ? headA : headB
  // 谁短谁作为headB
  curB = curA === headA ? headB : headA
  n = Math.abs(n)
  // 长链表先走差值步
  while (n !== 0) {
    n--
    curA = curA.next
  }
  // 走完差值步依次走一步，直到相遇
  while (curA !== curB) {
    curA = curA.next
    curB = curB.next
  }
  return curA
}

function bothLoop(
  headA: ListNode | null,
  loopA: ListNode | null,
  headB: ListNode | null,
  loopB: ListNode | null
): ListNode | null {
  let curA = null
  let curB = null
  // 说明两个链表入环节点相同
  if (loopA === loopB) {
    // 那么让入环节点作为最后一个节点来统计链表长度
    curA = headA
    curB = headB
    let n = 0

    while (curA !== loopA) {
      n++
      curA = curA.next
    }

    while (curB !== loopB) {
      n--
      curB = curB.next
    }

    curA = n > 0 ? headA : headB
    curB = curA === headA ? headB : headA
    n = Math.abs(n)
    while (n !== 0) {
      n--
      curA = curA.next
    }

    while (curA !== curB) {
      curA = curA.next
      curB = curB.next
    }
    return curA
  } else {
    curA = loopA.next
    // 在curA下一次到达loopA之前如果遇到了loopB，说明公用了一个环，那么返回curA或curB均可
    while (curA !== loopA) {
      if (curA === loopB) {
        return curA
      }
      curA = curA.next
    }
    // 到了这里说明两个有环链表不相交
    return null
  }
}

function getLoopNode(head: ListNode | null): ListNode | null {
  if (head.next === null || head.next.next === null) {
    return null
  }
  let n1 = head.next
  let n2 = head.next.next
  while (n1 !== n2) {
    if (n2.next === null || n2.next.next === null) {
      return null
    }
    n1 = n1.next
    n2 = n2.next.next
  }

  n2 = head
  while (n1 !== n2) {
    n1 = n1.next
    n2 = n2.next
  }
  return n1
}

//---------无环相交单链表
// const node1 = new ListNode(4)
// const node2 = new ListNode(1)
// const node3 = new ListNode(8)
// const node4 = new ListNode(4)
// const node5 = new ListNode(5)
// const node6 = new ListNode(5)
// const node7 = new ListNode(0)
// const node8 = new ListNode(1)
// node1.next = node2
// node2.next = node3
// node3.next = node4
// node4.next = node5
// node5.next = null
// node6.next = node7
// node7.next = node8
// node8.next = node3
// console.log(getIntersectionNode(node1, node6).val)

//--------有环链表，不公用一个环
// const node1 = new ListNode(4)
// const node2 = new ListNode(1)
// const node3 = new ListNode(8)
// const node4 = new ListNode(3)
// const node5 = new ListNode(5)
// const node6 = new ListNode(5)
// const node7 = new ListNode(0)
// const node8 = new ListNode(1)
// node1.next = node2
// node2.next = node3
// node3.next = node4
// node4.next = node1
// node5.next = node6
// node6.next = node7
// node7.next = node8
// node8.next = node6
// console.log(getIntersectionNode(node1, node5))

//--------有环链表，公用一个环，入环节点相同
// const node1 = new ListNode(4)
// const node2 = new ListNode(1)
// const node3 = new ListNode(8)
// const node4 = new ListNode(3)
// const node5 = new ListNode(5)
// const node6 = new ListNode(5)
// const node7 = new ListNode(0)
// const node8 = new ListNode(1)
// node1.next = node2
// node2.next = node3
// node3.next = node4
// node4.next = node5
// node5.next = node3
// node6.next = node7
// node7.next = node8
// node8.next = node2
// console.log(getIntersectionNode(node1, node6).val)

//--------有环链表，公用一个环，入环节点不同
const node1 = new ListNode(4)
const node2 = new ListNode(1)
const node3 = new ListNode(8)
const node4 = new ListNode(3)
const node5 = new ListNode(5)
const node6 = new ListNode(5)
const node7 = new ListNode(0)
const node8 = new ListNode(1)
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node3
node6.next = node7
node7.next = node8
node8.next = node4
console.log(getIntersectionNode(node1, node6).val)

export {}
```