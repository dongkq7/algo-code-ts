// https://leetcode.cn/problems/rotate-image/description/?envType=study-plan-v2&envId=top-100-liked

/**
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度
 * 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像
 */

function rotate(matrix: number[][]): void {
  if (!matrix.length || !matrix[0].length) return

  let r1 = 0
  let c1 = 0
  let r2 = matrix.length - 1
  let c2 = matrix[0].length - 1

  // 由于是正方形，所以只需要判断r1<r2即可
  while (r1 < r2) {
    rotateEdge(matrix, r1++, c1++, r2--, c2--)
  }
}

function rotateEdge(
  matrix: number[][],
  r1: number,
  c1: number,
  r2: number,
  c2: number
) {
  let temp = 0

  for (let i = 0; i < c2 - c1; i++) {
    // 第i组第一个数
    temp = matrix[r1][c1 + i]
    // 第i组第四个数去第一个数的位置
    matrix[r1][c1 + i] = matrix[r2 - i][c1]
    // 第i组第三个数去第四个数的位置
    matrix[r2 - i][c1] = matrix[r2][c2 - i]
    // 第i组第二个数去第三个数的位置
    matrix[r2][c2 - i] = matrix[r1 + i][c2]
    // 第i组第一个数去第二个数的位置
    matrix[r1 + i][c2] = temp
  }
}

const m = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
rotate(m)
console.log(m)
export {}
