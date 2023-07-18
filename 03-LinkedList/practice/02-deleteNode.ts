// 题目链接：https://leetcode.cn/problems/delete-node-in-a-linked-list/description/

/**
 * 给一个单链表，但是无法访问head
 * 删除一个指定节点，该节点不是不是最后一个节点
 * 这里的删除节点并不是从内存中删除：
 * - 给定的节点的值不应该存在在链表中
 * - 链表中的节点数应该减少1
 * - 该节点前面的值与后面的值要保证顺序相同
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }
}

function deleteNode(node: ListNode | null): void {
  node!.val = node!.next!.val
  node!.next = node!.next!.next
};

export {}