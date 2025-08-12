// https://leetcode.cn/problems/combinations/description/

/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。你可以按 任何顺序 返回答案。
 * n - 范围上限，表示 1-n
 * k - 数字的个数
 */
function combine(n: number, k: number) {
  const results: number[][] = [] // 最终要返回的结果
  const path: number[] = [] // 记录一个一个的组合，每一个组合会被推入到 results 里面

  function backtrack(start: number) {
    if (path.length === k) {
      // 说明 path 的长度达到了 k，也就是说 path 数组里面已经放了 k 个数了
      results.push([...path]) // 将当前的组合拷贝到结果里面
      return
    }

    // n - start + 1 表示从start到n之间还有多少个数可选
    // k - path.length 中 k 是需要的数的数量，path.length 是当前组合已有的数的数量
    // 因此 k - path.length 表示组合还需要多少个数
    // 这个操作其实就是在剪枝
    if (n - start + 1 < k - path.length) {
      return
    }

    for (let num = start; num <= n; num++) {
      path.push(num)
      backtrack(num + 1)
      // 代码来到这里，说明当前的 num 已经全部组合完了，需要将当前的 num 弹出去。
      path.pop()
    }
  }
  backtrack(1)

  return results
}
