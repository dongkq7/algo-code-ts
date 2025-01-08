// 动态规划
function climbStairs(n: number): number {
  const dp: number[] = []
  dp[0] = 1
  dp[1] = 1
  for(let i = 2; i <= n; i++) {
    dp[i] = dp[i-2] + dp[i-1]
  }
  return dp[n]
}

console.log(climbStairs(10))

// 动态规划-状态压缩
function climbStairs2(n: number): number {
  let pre = 1
  let cur = 1

  for(let i = 2; i <= n; i++) {
    const next = pre + cur
    pre = cur
    cur = next
  }
  return cur
}

console.log(climbStairs2(10))