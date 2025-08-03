// https://leetcode.cn/problems/minimum-path-sum/?envType=company&envId=bytedance&favoriteSlug=bytedance-all

/**
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小
 * 说明：每次只能向下或者向右移动一步。
 */

function minPathSum(grid: number[][]): number {
  if (!grid.length || !grid[0].length) return 0

  let row = grid.length
  let col = grid[0].length

  const dp: number[][] = Array.from({ length: row }, () => Array(col).fill(0))
  dp[0][0] = grid[0][0]

  // 第一行填充
  for (let j = 1; j < col; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j]
  }

  // 第一列填充
  for (let i = 1; i < row; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0]
  }

  // 其他位置填充
  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    }
  }
  return dp[row - 1][col - 1]
}

console.log(
  minPathSum([
    [1, 2, 3],
    [4, 5, 6],
  ])
)

export {}
