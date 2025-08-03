/**
 * 给定一个有序数组arr，代表数轴上从左到右有n个点arr [0]、arr[1]..arr [n-1]
 * 给定一个正数L，代表一根长度为L的绳子，求绳子最多能覆盖其中的几个点
 */

function maxCoveredPoints(arr: number[], L: number): number {
  if (arr.length === 0) return 0
  if (arr.length === 1) return 1

  let maxCount = 0
  let right = 0
  for (let left = 0; left < arr.length; left++) {
    while (arr[right] - arr[left] < L && right < arr.length) {
      right++
    }
    maxCount = Math.max(maxCount, right - left)
  }
  return maxCount
}

console.log(maxCoveredPoints([2, 4, 8, 9, 12, 17], 5))
