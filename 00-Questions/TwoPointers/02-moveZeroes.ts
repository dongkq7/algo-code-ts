// https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked

/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 */

function moveZeroes(nums: number[]): void {
  // 慢指针：指向当前已处理好的非零元素的下一个位置
  let slow = 0

  // 快指针：遍历整个数组，寻找非零元素
  for (let fast = 0; fast < nums.length; fast++) {
    // 当快指针遇到非零元素时
    if (nums[fast] !== 0) {
      // 将非零元素交换到慢指针位置
      ;[nums[slow], nums[fast]] = [nums[fast], nums[slow]]
      // 慢指针向前移动一位
      slow++
    }
  }
}

// 测试示例
const nums1 = [0, 1, 0, 3, 12]
moveZeroes(nums1)
console.log(nums1) // 输出: [1,3,12,0,0]

const nums2 = [0]
moveZeroes(nums2)
console.log(nums2) // 输出: [0]

const nums3 = [1, 2, 3]
moveZeroes(nums3)
console.log(nums3) // 输出: [1,2,3]
