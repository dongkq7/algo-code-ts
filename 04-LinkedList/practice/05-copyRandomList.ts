// 随机链表的复制
// https://leetcode.cn/problems/copy-list-with-random-pointer/

class _Node {
  val: number
  next: _Node | null
  random: _Node | null

  constructor(val?: number, next?: _Node, random?: _Node) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
    this.random = random === undefined ? null : random
  }
}

function copyRandomList(head: _Node | null): _Node | null {
  let cur = head
  let next: _Node | null = null

  // 克隆节点放到原节点的下一个位置
  while (cur !== null) {
    next = cur.next
    cur.next = new _Node(cur.val)
    cur.next.next = next
    cur = next
  }

  cur = head
  let copyNode: _Node | null = null
  // 原节点与克隆节点一对对取出来去设置random
  while (cur !== null) {
    next = cur.next.next
    copyNode = cur.next
    copyNode.random = cur.random === null ? null : cur.random.next
    cur = next
  }

  // 分离克隆节点与原节点
  const res = head.next
  cur = head
  while (cur !== null) {
    next = cur.next.next
    copyNode = cur.next
    cur.next = next
    copyNode.next = next !== null ? next.next : null
    cur = next
  }
  return res
}

export {}
