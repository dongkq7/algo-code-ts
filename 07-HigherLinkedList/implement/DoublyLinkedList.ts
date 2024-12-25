import LinkedList from "./LinkedList"
import { DoublyNode } from './LinkedNode'

class DoublyLinkedList<T> extends LinkedList<T> {
  head: DoublyNode<T> | null = null
  tail: DoublyNode<T> | null = null

  append(value: T): void {
    const newNode = new DoublyNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.length++
  }

  // 向头部插入节点
  prepend(value: T): void {
    const newNode = new DoublyNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
    this.length++
  }

  insert(position, value: T): boolean {
    if (position < 0 || position > this.length) return false
    if (position === 0) {
      this.prepend(value)
    } else if (position === this.length) {
      this.append(value)
    } else {
      const newNode = new DoublyNode(value)
      const current = this.getNode(position) as DoublyNode<T>

      newNode.next = current
      newNode.prev = current.prev
      current.prev.next = newNode
      current.prev = newNode

      this.length++
    }
    return true
  }

  removeAt(position: number): T | null {
    if (position < 0 || position >= this.length) return null
    let cur = this.head
    if (position === 0) {
      if (this.length === 1) {
        this.head = null
        this.tail = null
      } else {
        this.head = this.head.next
        this.head.prev = null
      }
    } else if (position === this.length - 1) {
      cur = this.tail
      this.tail = this.tail.prev
      this.tail.next = null
    } else {
      cur = this.getNode(position) as DoublyNode<T>
      cur.prev.next = cur.next
      cur.next.prev = cur.prev
    }

    this.length--
    return cur.value
  }
  postTraverse() {
    const values: T[] = []
    let cur = this.tail
    while(cur) {
      values.push(cur.value)
      cur = cur.prev
    }
    console.log(values.join('->'))
  }
}

const dl = new DoublyLinkedList<string>()
console.log('------------ 测试append ------------')
dl.append("aaa")
dl.append("bbb")
dl.append("ccc")
dl.append("ddd")
dl.traverse()
dl.postTraverse()
console.log('------------ 测试prepend ------------')
dl.prepend("111")
dl.prepend("000")
dl.traverse()
dl.postTraverse()
console.log('------------ 测试insert------------')
dl.insert(0, 'eee')
dl.traverse()
dl.insert(6, '777')
dl.traverse()
dl.insert(3, 'hhh')
dl.traverse()
console.log('------------ 测试removeAt------------')
dl.removeAt(0)
dl.traverse()
dl.removeAt(7)
dl.traverse()
dl.removeAt(3)
dl.traverse()