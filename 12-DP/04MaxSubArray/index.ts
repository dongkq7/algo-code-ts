function maxSubArray(nums: number[]): number {
  const dp: number[] = []
  dp[0] = nums[0]
  let max = nums[0]
  for(let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
    max = Math.max(max, dp[i])
  }
  return max
}


// 状态压缩
function maxSubArray2(nums: number[]): number {
  let preMax = nums[0]
  let max = nums[0]
  for(let i = 1; i < nums.length; i++) {
    preMax = Math.max(nums[i], preMax + nums[i])
    max = Math.max(max, preMax)
  }
  return max
}
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))
console.log(maxSubArray2([-2,1,-3,4,-1,2,1,-5,4]))