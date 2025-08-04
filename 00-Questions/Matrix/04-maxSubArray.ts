// https://leetcode.cn/problems/maximum-subarray/

/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组是数组中的一个连续部分。
 */

function maxSubArray(nums: number[]): number {
  if (!nums.length) return 0
  let cur = 0
  let max = -Infinity

  for (let i = 0; i < nums.length; i++) {
    cur = cur + nums[i]
    max = Math.max(max, cur)
    cur = cur < 0 ? 0 : cur
  }
  return max
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
export {}
