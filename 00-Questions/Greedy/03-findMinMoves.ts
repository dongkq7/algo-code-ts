// https://leetcode.cn/problems/super-washing-machines/description/

/**
 * 假设有 n 台超级洗衣机放在同一排上。开始的时候，每台洗衣机内可能有一定量的衣服，也可能是空的。
 * 在每一步操作中，你可以选择任意 m (1 <= m <= n) 台洗衣机，与此同时将每台洗衣机的一件衣服送到相邻的一台洗衣机。
 * 给定一个整数数组 machines 代表从左至右每台洗衣机中的衣物数量，请给出能让所有洗衣机中剩下的衣物的数量相等的 最少的操作步数 。如果不能使每台洗衣机中衣物的数量相等，则返回 -1 。
 */

function findMinMoves(machines: number[]): number {
  if (!machines.length) return -1
  let sum = 0
  // 计算出总衣服数量
  for (let i = 0; i < machines.length; i++) {
    sum += machines[i]
  }

  // 如果不能被整出则直接返回-1
  if (sum % machines.length !== 0) {
    return -1
  }

  let leftSum = 0 // 左侧衣服数量
  let avg = sum / machines.length // 每台洗衣机所需的衣服数
  let ans = 0
  for (let i = 0; i < machines.length; i++) {
    // 计算出左侧需要的衣服数，正数则表示需要拿出，负数则说明需要获取
    const leftRest = leftSum - i * avg
    // 计算出右侧需要的衣服数，正数则表示需要拿出，负数则说明需要获取
    const rightRest =
      sum - leftSum - machines[i] - (machines.length - i - 1) * avg

    if (leftRest < 0 && rightRest < 0) {
      ans = Math.max(ans, Math.abs(leftRest) + Math.abs(rightRest))
    } else {
      ans = Math.max(ans, Math.max(Math.abs(leftRest), Math.abs(rightRest)))
    }

    leftSum += machines[i]
  }
  return ans
}

console.log(findMinMoves([0, 3, 0]))
console.log(findMinMoves([0, 2, 0]))
