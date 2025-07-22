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
