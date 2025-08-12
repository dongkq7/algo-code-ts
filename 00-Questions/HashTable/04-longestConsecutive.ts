// https://leetcode.cn/problems/longest-consecutive-sequence/?envType=study-plan-v2&envId=top-100-liked

/**
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 */

function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0

  // 将数组转换为Set，实现O(1)时间复杂度的查找
  const numSet = new Set(nums)
  let maxLength = 0

  for (const num of numSet) {
    // 只从连续序列的起始数字开始计算（即当前数字的前一个数字不存在于Set中）
    if (!numSet.has(num - 1)) {
      let currentNum = num
      let currentLength = 1

      // 向后查找连续的数字
      while (numSet.has(currentNum + 1)) {
        currentNum++
        currentLength++
      }

      // 更新最长序列长度
      maxLength = Math.max(maxLength, currentLength)
    }
  }

  return maxLength
}

// 测试示例
console.log(longestConsecutive([100, 4, 200, 1, 3, 2])) // 输出: 4（序列1,2,3,4）
console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])) // 输出: 9
console.log(longestConsecutive([])) // 输出: 0
