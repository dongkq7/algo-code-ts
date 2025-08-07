// https://leetcode.cn/problems/implement-stack-using-queues/
// 使用队列实现栈

class MyStack {
  // 主队列：存储栈的元素
  private mainQueue: number[]
  // 辅助队列：用于临时存储元素
  private tempQueue: number[]

  constructor() {
    this.mainQueue = []
    this.tempQueue = []
  }

  // 将元素压入栈顶
  push(x: number): void {
    // 1. 先将新元素加入辅助队列
    this.tempQueue.push(x)
    // 2. 将主队列所有元素转移到辅助队列（保持原有顺序）
    while (this.mainQueue.length > 0) {
      this.tempQueue.push(this.mainQueue.shift()!)
    }
    // 3. 交换主队列和辅助队列，使新元素位于主队列首位（栈顶）
    ;[this.mainQueue, this.tempQueue] = [this.tempQueue, this.mainQueue]
    // 清空辅助队列，准备下次使用
    this.tempQueue = []
  }

  // 移除并返回栈顶元素
  pop(): number {
    // 主队列的第一个元素就是栈顶元素
    return this.mainQueue.shift()!
  }

  // 返回栈顶元素
  top(): number {
    // 主队列的第一个元素就是栈顶元素
    return this.mainQueue[0]
  }

  // 判断栈是否为空
  empty(): boolean {
    return this.mainQueue.length === 0
  }
}
