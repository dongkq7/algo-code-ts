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

// 动态规划
function win(nums: number[]): number {
  if (!nums.length) return 0
  const f: number[][] = Array.from(
    { length: nums.length },
    () => new Array(nums.length)
  )
  const s: number[][] = Array.from({ length: nums.length }, () =>
    new Array(nums.length).fill(0)
  )
  // 对先手函数对角线上的数据进行填充
  for (let i = 0; i < nums.length; i++) {
    f[i][i] = nums[i]
  }

  let row = 0
  let col = 1
  while (col < nums.length) {
    let i = row
    let j = col
    // 填完一条对角线
    while (i < nums.length && j < nums.length) {
      f[i][j] = Math.max(nums[i] + s[i + 1][j], nums[j] + s[i][j - 1])
      s[i][j] = Math.min(f[i + 1][j], f[i][j - 1])
      i++
      j++
    }
    col++
  }
  return Math.max(f[0][nums.length - 1], s[0][nums.length - 1])
}

console.log(win([1, 100, 2]))

export {}
