/**
 * https://leetcode.cn/problems/insert-delete-getrandom-o1/description/
 * 设计RandomPoo1结构,在该结构中有如下三个功能：
 * insert(key)：将某个key加入到该结构，做到不重复加入
 * delete(key)：将原本在结构中的某个key移除
 * getRandom()：等概率随机返回结构中的任何一个key
 * 【要求】
 * Insert、delete 和getRandom方法的时间复杂度都是0(1)
 */

class RandomizedSet<T> {
  private keyIndexMap: Map<T, number>
  private indexKeyMap: Map<number, T>
  size: number

  constructor() {
    this.keyIndexMap = new Map()
    this.indexKeyMap = new Map()
    this.size = 0
  }

  insert(key: T) {
    if (this.keyIndexMap.has(key)) {
      return false
    }
    this.keyIndexMap.set(key, this.size)
    this.indexKeyMap.set(this.size++, key)
    return true
  }

  remove(key: T) {
    if (!this.keyIndexMap.has(key)) {
      return false
    }
    // 获取到删除元素的索引
    const deleteIndex = this.keyIndexMap.get(key)
    // 获取最后一条记录填充上来，确保连续性
    const lastIndex = --this.size
    const lastItemValue = this.indexKeyMap.get(lastIndex)
    this.keyIndexMap.set(lastItemValue, deleteIndex)
    this.indexKeyMap.set(deleteIndex, lastItemValue)
    // 删除这个元素
    this.keyIndexMap.delete(key)
    // 将最后一个位置替换上去的索引清掉
    this.indexKeyMap.delete(lastIndex)
    return true
  }

  getRandom() {
    if (this.size === 0) return null
    const randomIndex = Math.floor(Math.random() * this.size)
    return this.indexKeyMap.get(randomIndex)
  }
}

/**
 * RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
randomizedSet.remove(2); // 返回 false ，表示集合中不存在 2 。
randomizedSet.insert(2); // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
randomizedSet.getRandom(); // getRandom 应随机返回 1 或 2 。
randomizedSet.remove(1); // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
randomizedSet.insert(2); // 2 已在集合中，所以返回 false 。
randomizedSet.getRandom(); // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
 */
const rp = new RandomizedSet<number>()
rp.insert(1)
console.log(rp.remove(2))
rp.insert(2)
console.log(rp.remove(2))
rp.insert(2)
console.log(rp.getRandom())
