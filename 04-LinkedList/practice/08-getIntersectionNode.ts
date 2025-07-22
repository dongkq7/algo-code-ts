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
  // 有一个链表为空，一定相交
  if (headA === null || headB === null) {
    return null
  }

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

const node1 = new ListNode(4)
const node2 = new ListNode(1)
const node3 = new ListNode(8)
const node4 = new ListNode(4)
const node5 = new ListNode(5)
const node6 = new ListNode(5)
const node7 = new ListNode(0)
const node8 = new ListNode(1)
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = null
node6.next = node7
node7.next = node8
node8.next = node3

console.log(getIntersectionNode(node1, node6).val)

export {}
