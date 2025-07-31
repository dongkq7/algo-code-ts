/**
 * 给定一个整型数组arr，代表数值不同的纸牌排成一条线
 * 玩家A和玩家B依次拿走每张纸牌，规定玩家A先拿，玩家B后拿，但是每个玩家每次只能拿走最左或最右的纸牌
 * 玩家A和玩家B都绝顶聪明。请返回最后获胜者的分数。
 * 【举例】
 * arr=[1, 2, 100,4]。
 * 开始时，玩家A只能拿走1或4。如果开始时玩家A拿走1，则排列变为 [2,100,41
 * 接下来玩家 B可以拿走2或4，然后继续轮到玩家A
 * 如果开始时玩家A拿走4，则排列变为[1,2，100]，接下来玩家B可以拿走1或100
 * 然后继续轮到玩家A. ..
 * 玩家A作为绝顶聪明的人不会先拿4，因为拿4之后，玩家日将拿走100。所以玩家A会先拿1
 * 让排列变为[2,100,4]，接下来玩家B不管怎么选，100都会被玩家 A拿走。
 * 玩家A会获胜，分数为101。所以返回101
 * arr=[1, 100,2]
 * 开始时，玩家A不管拿1还是2，玩家B作为绝顶聪明的人，都会把100拿走
 * 玩家B会获胜分数为100。所以返回100。
 */

function win(nums: number[]): number {
  if (!nums.length) return 0
  return Math.max(
    firstGet(nums, 0, nums.length - 1),
    secondGet(nums, 0, nums.length - 1)
  )
}

// 先手获取
function firstGet(nums: number[], l: number, r: number): number {
  // 如果只有一张牌了那么先手选手直接获取
  if (l === r) {
    return nums[l]
  }
  // 不止一张牌的时候就去从左边取或从右边取，取最大的那个
  // 从左边取的话，那么结果是左边牌分数 + 后手从l+1到r范围内取牌的分数
  const lScore = nums[l] + secondGet(nums, l + 1, r)
  // 从右边取的话，那么结果是右边牌分数 + 后手从l到r-1范围内取牌的分数
  const rScore = nums[r] + secondGet(nums, l, r - 1)
  return Math.max(lScore, rScore)
}

// 后手获取
function secondGet(nums: number[], l: number, r: number): number {
  // 如果只有一张牌了那么后手选手获得0
  if (l === r) {
    return 0
  }
  // 如果别人拿走左边的牌，那么结果是先手从l+1到r范围内取牌的分数
  const lScore = firstGet(nums, l + 1, r)
  // 如果别人拿走右边的牌，先手手从l到r-1范围内取牌的分数
  const rScore = firstGet(nums, l, r - 1)
  return Math.min(lScore, rScore)
}

console.log(win([1, 100, 2]))
export {}