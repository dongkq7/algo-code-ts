// 求矩阵中最大子矩阵和

function matrixMaxSum(arr: number[][]) {
  if (!arr.length || !arr[0].length) return 0
  let max = -Infinity
  let cur = 0
  let s: number[] | null = null // 用于计算累加和的数组

  for (let i = 0; i < arr.length; i++) {
    // 控制外层遍历次数，外层行数
    s = Array(arr[0].length).fill(0)
    for (let j = i; j < arr.length; j++) {
      // 控制内层行数
      cur = 0
      for (let k = 0; k < arr[0].length; k++) {
        s[k] += arr[j][k]
        cur += s[k]
        max = Math.max(cur, max)
        cur = cur < 0 ? 0 : cur
      }
    }
  }
  return max
}

console.log(
  matrixMaxSum([
    [-5, 3, 6, 4],
    [-7, 9, -5, 3],
    [-10, 1, -100, 4],
  ])
)

export {}
