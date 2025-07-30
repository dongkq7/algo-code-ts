class TrieNode {
  pass: number // 经过多少次该节点
  end: number // 这个节点为多少个字符串的结尾节点
  nexts: TrieNode[] // 该节点下的路

  constructor() {
    this.pass = 0
    this.end = 0
    // 这个节点下建26条路，指的是通向a-z的路
    this.nexts = new Array<TrieNode>(26)
  }
}

class Trie {
  private root: TrieNode
  constructor() {
    this.root = new TrieNode()
  }

  // 插入字符串
  insert(word: string): void {
    if (!word) return

    const chars = word.split('')
    let node = this.root
    node.pass++ // 根节点的pass值加一
    let index = 0
    for (let i = 0; i < chars.length; i++) {
      // 判断是否存在该字符的路，没有则创建，有则移动
      index = word.charCodeAt(i) - 97 // 这样a对应的索引为0，b对应的索引为1，以此类推
      if (!node.nexts[index]) {
        node.nexts[index] = new TrieNode()
      }
      // 走向这条路
      node = node.nexts[index]
      // 这条路的pass值加一
      node.pass++
    }
    // 循环结束则走到了字符串的最后一个节点位置，该节点的end值加一
    node.end++
  }

  // 查询字符串
  search(word: string): number {
    if (!word) return 0
    const chars = word.split('')
    let node = this.root
    let index = 0
    for (let i = 0; i < chars.length; i++) {
      index = word.charCodeAt(i) - 97
      if (!node.nexts[index]) return 0
      node = node.nexts[index]
    }
    return node.end
  }

  // 查询加入的字符串中，有多少是以这个字符串作为前缀的
  prefixNumber(prefix: string): number {
    if (!prefix) return 0
    const chars = prefix.split('')
    let node = this.root
    let index = 0
    for (let i = 0; i < chars.length; i++) {
      index = prefix.charCodeAt(i) - 97
      if (!node.nexts[index]) return 0
      node = node.nexts[index]
    }
    return node.pass
  }

  // 删除字符串
  delete(word: string): void {
    if (!this.search(word)) return
    const chars = word.split('')
    let node = this.root
    node.pass--
    let index = 0
    for (let i = 0; i < chars.length; i++) {
      index = word.charCodeAt(i) - 97
      // pass值--后变成0，那么直接跳出循环，并将下面的nexts置为null释放掉
      if (--node.nexts[index].pass === 0) {
        node.nexts[index] = null
        return
      }
      node = node.nexts[index]
    }
    node.end--
  }
}

const trie = new Trie()
trie.insert('abc')
trie.insert('abcd')
trie.insert('ab')
console.log(trie.search('ab'))
console.log(trie.search('abc'))
console.log(trie.prefixNumber('ab'))
trie.delete('ab')
console.log(trie.search('ab'))
