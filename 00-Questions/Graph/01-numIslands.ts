/**
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * https://leetcode.cn/problems/number-of-islands/description/?envType=study-plan-v2&envId=top-100-liked
 */
function numIslands(grid: string[][]): number {
  if (!grid.length) return 0
  // 行数
  const rows = grid.length
  // 列数
  const cols = grid[0].length
  let result = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        result++
        infect(grid, i, j, rows, cols)
      }
    }
  }
  return result
}

function infect(
  grid: string[][],
  i: number,
  j: number,
  rows: number,
  cols: number
) {
  if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] !== '1') {
    return
  }
  grid[i][j] = '2'
  infect(grid, i - 1, j, rows, cols)
  infect(grid, i + 1, j, rows, cols)
  infect(grid, i, j - 1, rows, cols)
  infect(grid, i, j + 1, rows, cols)
}

console.log(
  numIslands([
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ])
)
