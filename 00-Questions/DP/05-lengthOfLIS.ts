// https://leetcode.cn/problems/longest-increasing-subsequence/

/**
 * 给定数组nums，返回nums的最长递增子序列
 * 如：nums[3,1,2,6,3,4,0]返回最长递增子序列为[1,2,3,4]
 */

// function lengthOfLIS(nums: number[]): number {
//   if (!nums.length) return 0
//   const dp: number[] = new Array(nums.length)
//   let max = 0

//   for (let i = 0; i < nums.length; i++) {
//     dp[i] = 1
//     for (let j = 0; j < i; j++) {
//       // 如果有比自己小的数
//       if (nums[j] < nums[i]) {
//         dp[i] = Math.max(dp[i], dp[j] + 1)
//       }
//     }
//     max = Math.max(max, dp[i])
//   }
//   return max
// }

function lengthOfLIS(nums: number[]): number {
  if (!nums.length) return 0
  const dp: number[] = new Array(nums.length)
  const ends: number[] = new Array(nums.length)
  let max = 1
  dp[0] = 1
  ends[0] = nums[0]
  let right = 0
  let m = 0
  let l = 0
  let r = 0

  for (let i = 1; i < nums.length; i++) {
    l = 0
    r = right
    // 寻找ends中比nums[i]大的最左的位置
    while (l <= r) {
      m = Math.floor((l + r) / 2)
      if (nums[i] > ends[m]) {
        l = m + 1
      } else {
        r = m - 1
      }
    }
    // 如果ends数组扩充了有效区，那么l会大于right，所以更新一下right
    right = Math.max(right, l)
    ends[l] = nums[i]
    dp[i] = l + 1
    max = Math.max(max, dp[i])
  }

  return max
}
console.log(lengthOfLIS([3, 1, 2, 6, 3, 4, 0]))
