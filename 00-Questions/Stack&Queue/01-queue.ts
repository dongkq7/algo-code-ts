// https://leetcode.cn/problems/implement-queue-using-stacks/description/
// 使用栈实现队列

class MyQueue {
  private pushStack: number[]
  private popStack: number[]
  constructor() {
    this.pushStack = []
    this.popStack = []
  }

  push(x: number): void {
    this.pushStack.push(x)
  }

  pop(): number {
    this.transfer()
    return this.popStack.pop()
  }

  peek(): number {
    this.transfer()
    return this.popStack[this.popStack.length - 1]
  }

  empty(): boolean {
    return this.pushStack.length === 0 && this.popStack.length === 0
  }

  // 如果pop栈为空那么将push栈中的数据放入pop栈中
  private transfer() {
    if (this.popStack.length === 0) {
      while (this.pushStack.length > 0) {
        this.popStack.push(this.pushStack.pop())
      }
    }
  }
}
