class LinkedNode<T> {
  value: T
  next: LinkedNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

class LinkedList<T> {
  head: LinkedNode<T> | null = null
  private size: number = 0

  // 方便通过.length来获取链表元素个数
  get length() {
    return this.size
  }

  // 根据索引获取该位置节点
  private getNode(position: number): LinkedNode<T> | null {
    let cur: LinkedNode<T> = this.head!
    let i = 0
    while(i++ < position && cur) {
      cur = cur.next!
    }
    return cur
  }

  // 向链表中追加节点
  append(value: T) {
    const newNode = new LinkedNode<T>(value)
    // 如果当前链表为空那么直接让head指向该新节点
    if (!this.head) {
      this.head = newNode
    } else {
      // 如果链表不为空，那么就在链表最后追加该节点（让链表的最后一个节点的next指向这个新节点）
      // 创建一个临时变量cur指向head，依次往后走，直到cur.next 为空则表示走到了最后一个节点的位置
      let cur = this.head
      while(cur.next) {
        cur = cur.next!
      }
      cur.next = newNode
    }
    this.size++
  }

  // 向某个位置插入节点
  insert(position: number, value: T): boolean {
    // 越界
    if (position < 0 || position > this.size) return false
    const newNode = new LinkedNode<T>(value)
    if (position === 0) {
      // 节点想插入到首位，那么就让新节点的next指向当前head所指向的节点
      // 再让head指向新节点即可
      newNode.next = this.head
      this.head = newNode
    } else {
      // 插入到其他位置
      // 那么就创建两个临时变量cur与pre分别记录想要插入位置的节点及该节点的前一个节点
      // 让新节点的next指向该节点，再让该节点的前一个节点的next指向新节点即可
      let cur = this.head
      let pre: LinkedNode<T> | null = null
      let i = 0
      while(i++ < position) {
        pre = cur!
        cur = cur!.next
      }
      newNode.next = cur
      pre!.next = newNode
    }
    this.size++
    return true
  }

  // 删除特定位置的节点
  removeAt(position: number): T | null {
    // 越界
    if (position < 0 || position >= this.size) return null
    let cur: LinkedNode<T> = this.head!
    if (position === 0) {
      this.head = this.head!.next
    } else {
      let pre: LinkedNode<T> | null = null
      let i = 0
      while(i++ < position) {
        pre = cur
        cur = cur.next!
      }
      pre!.next = cur.next
    }
    this.size--
    return cur.value
  }

  indexOf(value: T): number {
    let cur = this.head
    let i = 0
    while(cur) {
      if (cur.value === value) return i
      i ++
      cur = cur.next
    }
    return -1
  }

  remove(value: T): T | null {
    const index = this.indexOf(value)
    return this.removeAt(index)
  }

  // 更新某个位置的节点
  update(position: number, value: T): boolean {
    if (position < 0 || position >= this.size) return false
    const cur = this.getNode(position)
    cur!.value = value
    return true
  }

  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null
    return this.getNode(position)?.value ?? null
  }

  // 遍历输出链表中的内容
  traverse(){
    // 链表为空不进行遍历
    if(!this.head) return
    // 临时变量
    let cur = this.head
    // 存放遍历到的节点
    const values : T[] = []
    while(cur) {
      values.push(cur.value)
      cur = cur.next!
    }
    console.log(values.join('->'))
  }

  isEmpty() {
    return this.size === 0
  }
}
// test
const linkedList = new LinkedList<string>()
linkedList.append('111')
linkedList.append('222')
linkedList.append('333')
linkedList.traverse()
linkedList.insert(0, '000')
linkedList.insert(4, '789')
linkedList.traverse()
console.log(linkedList.removeAt(2))
linkedList.traverse()
console.log(linkedList.removeAt(0))
linkedList.traverse()
console.log(linkedList.removeAt(2))
linkedList.traverse()
console.log(linkedList.get(0))
console.log(linkedList.get(2))
linkedList.update(0, 'ddd')
linkedList.traverse()
console.log(linkedList.indexOf('ddd'))
console.log(linkedList.indexOf('aaa'))
console.log(linkedList.remove('ddd'))
console.log(linkedList.remove('ccc'))