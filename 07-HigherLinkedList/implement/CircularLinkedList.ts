import LinkedList from './LinkedList'

class CircularLinkedList<T> extends LinkedList<T> {
  append(value: T) {
    super.append(value)
    this.tail.next = this.head
  }

  insert(position: number, value: T) {
    const isSuccess = super.insert(position, value)
    // 由于插入后length增加了1，所以判断是否是插入的最后一位，那么就看position是否等于length-1
    if (isSuccess && (position === 0 || position === this.length - 1)) {
      this.tail.next = this.head
    }
    return isSuccess
  }

  removeAt(position: number) {
    const value = super.removeAt(position)
    // 删除后length减少了1，所以判断是否删除的是最后一位是看position是否等于现在的length
    // 如果删除的是最后一个节点，那么此时链表为空，所以要在tail有值的情况下改变指向
    if (value && this.tail && (position === 0 || position === this.length)) {
      this.tail.next = this.head
    }
    return value
  }
}

const cLinkedList = new CircularLinkedList<string>()
console.log('------------ 测试append ------------')
cLinkedList.append("aaa")
cLinkedList.append("bbb")
cLinkedList.append("ccc")
cLinkedList.append("ddd")
cLinkedList.traverse()

console.log('------------ 测试insert ------------')
cLinkedList.insert(0, "eee")
cLinkedList.traverse()
cLinkedList.insert(2, 'lll')
cLinkedList.insert(6, 'uuu')
cLinkedList.traverse()

console.log('------------ 测试removeAt ------------')
cLinkedList.removeAt(0)
cLinkedList.traverse()
cLinkedList.removeAt(2)
cLinkedList.traverse()
cLinkedList.removeAt(5)
cLinkedList.traverse()

console.log('------------ 测试get ------------')
console.log(cLinkedList.get(0))
console.log(cLinkedList.get(1))
console.log(cLinkedList.get(2))

console.log('------------ 测试update ------------')
cLinkedList.update(1,'abc')
cLinkedList.update(2, 'kkk')
cLinkedList.traverse()

console.log('------------ 测试indexOf ------------')
console.log(cLinkedList.indexOf("aaa"))
console.log(cLinkedList.indexOf("eee"))
console.log(cLinkedList.indexOf("kkk"))
console.log(cLinkedList.indexOf("ccc"))


console.log('------------ 测试remove ------------')
cLinkedList.remove("aaa")
console.log(cLinkedList.remove("uuu"))
cLinkedList.remove("lll")
cLinkedList.traverse()
console.log(cLinkedList.isEmpty())
console.log(cLinkedList.size())

