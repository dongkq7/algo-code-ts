// 题目链接：https://leetcode.cn/problems/reverse-linked-list/

// 反转链表
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

// 方法一：循环方式实现
function reverseList(head: ListNode | null): ListNode | null {
  // 链表为空或者只有一个节点则不用处理
  if (head === null || head.next === null) return head
  let newHead:  ListNode | null = null
  while(head) {
    const cur: ListNode | null = head.next
    head.next = newHead
    newHead = head
    head = cur
  }
  return newHead
};

// 递归方式实现
// function reverseList(head: ListNode | null): ListNode | null {
//   // 链表为空或者只有一个节点则不用处理，以及递归到最后一个节点时返回head
//   if (head === null || head.next === null) return head
//   const newHead = reverseList(head.next)
//   head.next.next = head
//   head.next = null
//   return newHead
// };


// test
const node1 = new ListNode(1)
node1.next = new ListNode(2)
node1.next.next = new ListNode(3)

let newHead = reverseList(node1)
let cur = newHead
while(cur) {
  console.log(cur.val)
  cur = cur.next
}

export {}