/**
 * 给一组正数的数，每个数字代表一枚硬币的金额，输入目标金额，返回能够凑成目标金额最少的硬币数
 * 如果凑不出返回-1
 * 比如[2,3,7,5,3]，目标金额10，返回2（最少需要3与7两枚硬币）
 */

// 记忆化搜索优化
function minCoins(arr: number[], aim: number) {
  const dp: number[][] = Array.from({ length: arr.length + 1 }, () =>
    new Array(aim + 1).fill(-2)
  )
  return process(arr, 0, aim, dp)
}

function process(arr: number[], index: number, rest: number, dp: number[][]) {
  // 由于reset小于0范围是很大的，这里也没有加入到dp表中，所以直接返回
  if (rest < 0) {
    return -1
  }

  if (dp[index][rest] !== -2) {
    return dp[index][rest]
  }
  if (rest === 0) {
    dp[index][rest] = 0
  } else if (index === arr.length) {
    dp[index][rest] = -1
  } else {
    // 不要这枚硬币，接下来所需要的硬币数
    const p1 = process(arr, index + 1, rest, dp)
    // 要这枚硬币，接下来所需要的硬币数
    const p2Next = process(arr, index + 1, rest - arr[index], dp)
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
  return dp[index][rest]
}

console.log(minCoins([2, 3, 100, 200], 5))

export {}
