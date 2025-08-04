// https://leetcode.cn/problems/trapping-rain-water/description/?envType=study-plan-v2&envId=top-100-liked

/**
 * 给定一个数组arr，已知其中所有的值都是非负的，将这个数组看作一个容器，请返回容器能装多少水。
 * 举例： [3,1,2,5,2,4]，该容器最多能5格水
 */

function trap(height: number[]): number {
  if (!height.length) return 0

  let L = 0
  let R = height.length - 1
  let leftMax = height[0]
  let rightMax = height[R]
  let sum = 0

  while (L <= R) {
    if (leftMax <= rightMax) {
      sum += Math.max(leftMax - height[L], 0)
      leftMax = Math.max(leftMax, height[L++])
    } else {
      sum += Math.max(rightMax - height[R], 0)
      rightMax = Math.max(rightMax, height[R--])
    }
  }
  return sum
}

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
