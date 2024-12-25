import ILinkedList from './ILinkedList'
import Node from '../../types/Node'

export default class LinkedList<T> implements ILinkedList<T> {
  protected head: Node<T> | null = null
  protected tail: Node<T> | null = null

  protected length: number = 0

  peek(): T | null {
    return this.head?.value || null
  }

  size() {
    return this.length
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  // 获取对应位置的节点内容
  get(position: number): T | null {
    if (position < 0 || position >= this.length) return null
    return this.getNode(position)?.value || null
  }

  // 追加节点
  append(value: T) {
    const newNode = new Node(value)
    if (!this.head) {
      this.head = newNode
    } else {
      this.tail.next = newNode
    }
    this.tail = newNode
    this.length++
  }
  
  // 向某一位置插入节点
  insert(position: number, value: T): boolean {
    if (position < 0 || position > this.length) return false

    const newNode = new Node(value)
    if (position === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      const preNode = this.getNode(position - 1)
      newNode.next = preNode.next
      preNode.next = newNode
      // 如果插入的最后，那么就需要变更下tail的指向
      if (position === this.length) {
        this.tail = newNode
      }
    }
    this.length++
    return true
  }

  // 更新节点内容
  update(position: number, value: T): boolean {
    if (position < 0 || position >= this.length) return false
    const node = this.getNode(position)
    node.value = value
    return true
  }

  // 获取节点位置
  indexOf(value: T): number {
    let i = 0
    let cur = this.head
    while(cur) {
      if (cur.value === value) return i
      if (this.isTail(cur)) {
        cur = null
      } else {
        cur = cur.next
      }
      i++
    }
    return -1
  }

  // 删除某一位置节点
  removeAt(position: number): T  | null {
    if (position < 0 || position >= this.length) return null

    let cur = this.head
    if (position === 0) {
      this.head = cur.next ?? null

      // 删除的是头节点，如果此时只有这一个节点，那么将tail变成null
      if (this.length === 1) {
        this.tail = null
      }
    } else {
      const preNode = this.getNode(position - 1)
      cur = preNode.next
      preNode.next = preNode.next.next ?? null
      // 如果删除的是最后一个节点，那么就把tail指向前一个节点
      if (position === this.length - 1) {
        this.tail = preNode
      }
    }

    this.length--

    return cur.value
  }

  remove(value: T): T | null {
    const index = this.indexOf(value)
    return this.removeAt(index)
  }

  protected getNode(position: number): Node<T> | null {
    let cur = this.head
    let i = 0
    while(i++ < position) {
      cur = cur.next
    }
    return cur
  }

  traverse() {
    const values: T[] = []      
    let cur = this.head
    while(cur) {
      values.push(cur.value)
      // 防止循环链表无限循环
      if (this.isTail(cur)) {
        cur = null
      } else {
        cur = cur.next
      } 
    }
    // 如果是循环链表，那么就把头节点的值放在最后，便于看出是循环链表
    if(this.head && this.length > 1 && this.tail.next === this.head) {
      values.push(this.head.value)
    }
    console.log(values.join(' -> '))
  }

  private isTail(node: Node<T>) {
    return this.tail === node
  }
}

// test

// const list = new LinkedList<number>()
// list.append(1)
// list.append(2)
// list.append(3)
// list.append(4)
// list.append(5)
// list.append(6)
// list.traverse()
// list.removeAt(0)
// list.removeAt(3)
// list.traverse()
// list.insert(1, 7)
// list.traverse()
// list.update(1, 8)
// list.traverse()