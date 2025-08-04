// https://leetcode.cn/problems/find-all-numbers-disappeared-in-an-array/

/**
 * 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内
 * 请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果
 * 输入：nums = [4,3,2,7,8,2,3,1]
 * 输出：[5,6]
 */

function findDisappearedNumbers(nums: number[]): number[] {
  if (!nums.length) return []
  const result: number[] = []

  for (let n of nums) {
    modify(n, nums)
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      result.push(i + 1)
    }
  }

  return result
}

function modify(value: number, nums: number[]) {
  while (nums[value - 1] !== value) {
    let temp = nums[value - 1]
    nums[value - 1] = value
    value = temp
  }
}

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]))
