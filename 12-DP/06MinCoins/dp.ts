/**
 * 给一组正数的数，每个数字代表一枚硬币的金额，输入目标金额，返回能够凑成目标金额最少的硬币数
 * 如果凑不出返回-1
 * 比如[2,3,7,5,3]，目标金额10，返回2（最少需要3与7两枚硬币）
 */

// 动态规划
function minCoins(arr: number[], aim: number) {
  const dp = Array.from({ length: arr.length + 1 }, () => new Array(aim + 1))
  const N = arr.length
  // 将不用计算的数据填充上
  for (let index = 0; index <= N; index++) {
    dp[index][0] = 0
  }

  for (let rest = 1; rest <= aim; rest++) {
    dp[N][rest] = -1
  }

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 1; rest <= aim; rest++) {
      const p1 = dp[index + 1][rest]
      // 这里注意边界判断，因为rest - arr[index]可能小于0
      let p2Next = -1
      if (rest - arr[index] >= 0) {
        p2Next = dp[index + 1][rest - arr[index]]
      }
      if (p1 === -1 && p2Next === -1) {
        dp[index][rest] = -1
      } else {
        if (p1 === -1) {
          dp[index][rest] = 1 + p2Next
        } else if (p2Next === -1) {
          dp[index][rest] = p1
        } else {
          dp[index][rest] = Math.min(p1, 1 + p2Next)
        }
      }
    }
  }
  // 从下到上从左到右填充数据
  return dp[0][aim]
}
console.log(minCoins([2, 3, 100, 200], 5))

export {}
