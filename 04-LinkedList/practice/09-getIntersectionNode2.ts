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
