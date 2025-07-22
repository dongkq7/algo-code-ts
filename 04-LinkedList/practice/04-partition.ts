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
