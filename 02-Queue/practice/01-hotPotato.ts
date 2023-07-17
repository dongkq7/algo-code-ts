import ArrayQueue from '../implement/ArrayQueue'

/**
 * 一群人围成圈开始数数，数到某个数字时被淘汰，剩下的人继续数数，直到场上还剩下一个人。输出最后一个人的姓名。
 * @param names 人名数组
 * @param number 喊哪个数字的人被淘汰
 */
function hotPotato(names: string[], number: number) {
  if (!names.length) return
  const queue = new ArrayQueue<string>()
  for(const name of names) {
    queue.enqueue(name)
  }
  while(queue.size() > 1) {
    // 安全的人出队并重新入队
    for(let i = 1; i < number; i++) {
      queue.enqueue(queue.dequeue()!)
    }
    // 被淘汰的人出队
    queue.dequeue()
  }
  // 返回最后一人的姓名
  return queue.dequeue()
}

// test
console.log(hotPotato(['张三', '李四', '王五', '赵六', '田七', '钱八','周九'], 3))