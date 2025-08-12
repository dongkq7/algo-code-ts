// https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked
/**
 * 给定一个整数数组 nums 和一个整数目标值 target
 * 请你在该数组中找出 和为目标值target的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
 * 你可以按任意顺序返回答案。
 */

function twoSum(nums: number[], target: number): number[] {
  // 创建哈希表存储已遍历的数字及其索引
  const numMap = new Map<number, number>()

  // 遍历数组
  for (let i = 0; i < nums.length; i++) {
    // 计算需要寻找的互补数
    const complement = target - nums[i]

    // 检查互补数是否已存在于哈希表中
    if (numMap.has(complement)) {
      // 存在则返回两个数的索引
      return [numMap.get(complement)!, i]
    }

    // 不存在则将当前数字和索引存入哈希表
    numMap.set(nums[i], i)
  }

  // 题目保证有解，此处仅为满足类型要求
  return []
}

// 测试用例
console.log(twoSum([2, 7, 11, 15], 9)) // 输出: [0, 1]
console.log(twoSum([3, 2, 4], 6)) // 输出: [1, 2]
console.log(twoSum([3, 3], 6)) // 输出: [0, 1]

export {}
