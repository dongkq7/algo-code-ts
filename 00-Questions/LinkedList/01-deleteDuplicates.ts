// 删除排序链表中的重复元素
// https://leetcode.cn/problems/remove-duplicates-from-sorted-list/description/

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head) {
    return head
  }
  let cur = head
  while (cur.next) {
    // 如果当前节点的值与下一个节点的值相同，那么继续往后移动
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
}

const node1 = new ListNode(1)
const node2 = new ListNode(1)
const node3 = new ListNode(1)
const node4 = new ListNode(2)
const node5 = new ListNode(3)
const node6 = new ListNode(3)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node6
node6.next = null

let newNode = deleteDuplicates(node1)
while (newNode) {
  console.log(newNode.val)
  newNode = newNode.next
}
export {}
