// https://leetcode.cn/problems/combination-sum/description/
/**
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
 * 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 */

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = []
  let total = 0
  if (!candidates?.length) return result

  // 排序便于剪枝优化
  candidates.sort((a, b) => a - b)

  function backtrack(start: number, path: number[]) {
    if (total === target) {
      result.push([...path])
      return
    }

    for (let i = start; i < candidates.length; i++) {
      // 利用排序进行剪枝，如果当前数字加上后超过目标，后续数字都不用考虑了
      if (total + candidates[i] > target) {
        break
      }

      total += candidates[i]
      path.push(candidates[i])
      // 递归时start应为i，允许重复使用当前数字，但不回头使用前面的数字
      backtrack(i, path)
      // 回溯：减去添加的数值
      total -= candidates[i]
      path.pop()
    }
  }

  backtrack(0, [])
  return result
}
