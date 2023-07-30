/**
 * 接收字符串与存储容量，存储数据对应的索引值
 * @param key 字符串
 * @param max 容量
 */
function hashFun(key:string, max: number): number {
  const len = key.length
  let hashCode = 0
  for(let i = 0; i < len; i++) {
    hashCode = 31 * hashCode + key.charCodeAt(i)
  }
  return hashCode % max
}