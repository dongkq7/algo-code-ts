/**
 * 给一组正数的数，每个数字代表一枚硬币的金额，输入目标金额，返回能够凑成目标金额最少的硬币数
 * 如果凑不出返回-1
 * 比如[2,3,7,5,3]，目标金额10，返回2（最少需要3与7两枚硬币）
 */

function minCoins(arr: number[], aim: number) {
  return process(arr, 0, aim)
}

function process(arr: number[], index: number, rest: number) {
  // 凑不出硬币了
  if (rest < 0) {
    return -1
  }

  // 接下来不需要再凑硬币了
  if (rest === 0) {
    return 0
  }

  if (index === arr.length) {
    return -1
  }
  // 不要这枚硬币，接下来所需要的硬币数
  const p1 = process(arr, index + 1, rest)
  // 要这枚硬币，接下来所需要的硬币数
  const p2Next = process(arr, index + 1, rest - arr[index])
  if (p1 === -1 && p2Next === -1) {
    return -1
  } else {
    if (p1 === -1) {
      return 1 + p2Next
    }
    if (p2Next === -1) {
      return p1
    }
    return Math.min(p1, 1 + p2Next)
  }
}

console.log(minCoins([2, 3, 100, 200], 5))

export {}
