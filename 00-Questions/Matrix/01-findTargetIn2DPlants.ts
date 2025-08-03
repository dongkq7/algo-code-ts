// https://leetcode.cn/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/description/
/**
 * m*n 的二维数组 plants 记录了园林景观的植物排布情况，具有以下特性：
 * 每行中，每棵植物的右侧相邻植物不矮于该植物
 * 每列中，每棵植物的下侧相邻植物不矮于该植物
 * 请判断 plants 中是否存在目标高度值 target
 */

function findTargetIn2DPlants(plants: number[][], target: number): boolean {
  if (!plants.length || !plants[0].length) return false

  let col = plants[0].length - 1
  let row = 0
  while (col >= 0 && row < plants.length) {
    if (plants[row][col] === target) {
      return true
    } else if (plants[row][col] > target) {
      col--
    } else {
      row++
    }
  }
  return false
}

console.log(
  findTargetIn2DPlants(
    [
      [1, 3, 5],
      [2, 5, 7],
    ],
    7
  )
)
