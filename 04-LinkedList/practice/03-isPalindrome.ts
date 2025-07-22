// 判断是否为回文链表
// https://leetcode.cn/problems/palindrome-linked-list/

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

export {}
