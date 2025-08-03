// https://leetcode.cn/problems/spiral-matrix/description/?envType=study-plan-v2&envId=top-100-liked

/**
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 */

function spiralOrder(matrix: number[][]): number[] {
  if (!matrix.length || !matrix[0].length) return

  let r1 = 0
  let c1 = 0
  let r2 = matrix.length - 1
  let c2 = matrix[0].length - 1
  const result: number[] = []

  while (r1 <= r2 && c1 <= c2) {
    printEdge(matrix, r1++, c1++, r2--, c2--, result)
  }
  return result
}

/**
 * 顺时针遍历(r1,c1)到(r2,c2)范围内的数据
 * @param matrix 矩阵
 * @param r1 左上角的行
 * @param c1 左上角的列
 * @param r2 右下角的行
 * @param c2 右下角的列
 */
function printEdge(
  matrix: number[][],
  r1: number,
  c1: number,
  r2: number,
  c2: number,
  result: number[]
) {
  // 当两个坐标位于同一行时
  if (r1 === r2) {
    for (let i = c1; i <= c2; i++) {
      result.push(matrix[r1][i])
    }
  } else if (c1 === c2) {
    // 当两个坐标位于同一列时
    for (let i = r1; i <= r2; i++) {
      result.push(matrix[i][c1])
    }
  } else {
    // 不处于同一行同一列则
    let curR = r1
    let curC = c1

    // 从左到右
    while (curC != c2) {
      result.push(matrix[curR][curC])
      curC++
    }
    // 从上到下
    while (curR != r2) {
      result.push(matrix[curR][curC])
      curR++
    }

    // 从右到左
    while (curC != c1) {
      result.push(matrix[curR][curC])
      curC--
    }

    // 从下到上
    while (curR != r1) {
      result.push(matrix[curR][curC])
      curR--
    }
  }
}

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
)

export {}
