// https://leetcode.cn/problems/minimum-path-sum/?envType=company&envId=bytedance&favoriteSlug=bytedance-all

/**
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小
 * 说明：每次只能向下或者向右移动一步。
 */

// 使用空间压缩优化
// function minPathSum(grid: number[][]): number {
//   if (!grid.length || !grid[0].length) return 0

//   let row = grid.length
//   let col = grid[0].length
//   const dp = Array(col).fill(0)
//   dp[0] = grid[0][0]

//   // 填充第一行数据
//   for (let j = 1; j < col; j++) {
//     dp[j] = dp[j - 1] + grid[0][j]
//   }

//   // 更新后面几行数据
//   for (let i = 1; i < row; i++) {
//     for (let j = 0; j < col; j++) {
//       dp[j] =
//         j === 0 ? dp[j] + grid[i][j] : Math.min(dp[j - 1], dp[j]) + grid[i][j]
//     }
//   }

//   return dp[col - 1]
// }

function minPathSum(grid: number[][]): number {
  if (!grid.length || !grid[0].length) return 0

  const row = grid.length
  const col = grid[0].length

  // 行与列中找到值较小的那个作为数组长度
  let more = Math.max(row, col)
  let less = Math.min(row, col)
  // 是否是行数较多，用来决定先填充第一行数据还是第一列
  const rowMore = more === row
  const dp = Array(less).fill(0)

  dp[0] = grid[0][0]
  // 将数组填充为第一行或第一列的数据
  for (let i = 1; i < less; i++) {
    // 如果是行数较多那么数组中从左到右去求
    dp[i] = dp[i - 1] + (rowMore ? grid[0][i] : grid[i][0])
  }

  // 求其他位置的数据
  for (let i = 1; i < more; i++) {
    dp[0] = dp[0] + (rowMore ? grid[i][0] : grid[0][i])
    for (let j = 1; j < less; j++) {
      dp[j] = Math.min(dp[j - 1], dp[j]) + (rowMore ? grid[i][j] : grid[j][i])
    }
  }

  return dp[less - 1]
}

console.log(
  minPathSum([
    [1, 2, 3],
    [4, 5, 6],
  ])
)

export {}
