export default interface IList<T> {
  // 返回头节点值
  peek(): T | null
  // 判断链表是否为空
  isEmpty(): boolean
  // 节点个数
  size(): number
}