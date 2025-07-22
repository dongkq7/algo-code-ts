// 链表是否有环
// https://leetcode.cn/problems/linked-list-cycle/

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
export {}
