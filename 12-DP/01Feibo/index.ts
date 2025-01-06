// 递归求解
function fib1(n: number): number {
  if (n <= 1) return n
  return fib1(n-1) + fib1(n-2)
}

console.log(fib1(10))

// 记忆化搜索
function fib2(n: number, memo: number[]): number {
  if (n <= 1) {
    return n
  }
  if (memo[n]) {
    return memo[n]
  }

  const res = fib2(n-1, memo) + fib2(n-2, memo)
  memo[n] = res
  return res
}
console.log(fib2(10, []))

// 动态规划
function fib3(n: number): number {
  // 定义状态
  const dp: number[] = []

  // 初始化状态
  dp[0] = 0
  dp[1] = 1

  // 求解
  for(let i = 2; i <= n; i ++) {
    // 确定状态转移方程
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[n]
}
console.log(fib3(10))

// 动态规划-状态压缩
function fib4(n: number): number {
  if (n <= 1) {
    return n
  }

  let pre = 0
  let cur = 1

  for(let i = 2; i <= n; i ++) {
    const next = pre + cur
    pre = cur
    cur = next
  }
  return cur
}

console.log(fib4(10))