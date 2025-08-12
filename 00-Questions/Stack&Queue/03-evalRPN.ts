//https://leetcode.cn/problems/evaluate-reverse-polish-notation/description/
// 逆波兰表达式求值

function evalRPN(tokens: string[]): number {
  // 创建栈用于存储操作数
  const stack: number[] = []

  // 定义运算符对应的计算函数
  const operators: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      // 注意：题目要求除法向零截断
      const result = a / b
      return result > 0 ? Math.floor(result) : Math.ceil(result)
    },
  }

  for (const token of tokens) {
    // 如果是运算符，则弹出两个操作数进行计算
    if (operators.hasOwnProperty(token)) {
      // 注意弹出顺序：后弹出的是第一个操作数
      const b = stack.pop()!
      const a = stack.pop()!
      const result = operators[token](a, b)
      stack.push(result)
    } else {
      // 如果是数字，则直接入栈
      stack.push(Number(token))
    }
  }

  // 栈中最后剩余的元素就是结果
  return stack.pop()!
}
