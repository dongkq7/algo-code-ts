// 删除排序链表中的所有重复元素
// https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/

class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

function deleteDuplicates(head: ListNode | null): ListNode | null {
  // 创建虚拟头节点，简化头节点可能被删除的情况
  const dummy = new ListNode(0)
  dummy.next = head

  // prev指针指向当前已处理链表的尾部
  let prev: ListNode | null = dummy
  // curr指针用于探索后续节点
  let curr: ListNode | null = head

  while (curr && curr.next) {
    // 发现重复元素
    if (curr.val === curr.next.val) {
      // 记录当前重复的值
      const duplicateVal = curr.val
      // 跳过所有相同的节点
      while (curr && curr.val === duplicateVal) {
        curr = curr.next
      }
      // 将prev的next指向跳过重复节点后的第一个节点
      prev.next = curr
    } else {
      // 没有重复，移动prev指针
      prev = curr
      // 移动curr指针
      curr = curr.next
    }
  }

  return dummy.next
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
