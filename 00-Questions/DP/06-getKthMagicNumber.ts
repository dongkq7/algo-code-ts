// https://leetcode.cn/problems/get-kth-magic-number-lcci/description/
/**
 * 有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。注意，不是必须有这些素因子，而是必须不包含其他的素因子。
 * 例如，前几个数按顺序应该是 1，3，5，7，9，15，21。
 * 输入：k = 5
 * 输出：9
 */

function getKthMagicNumber(k: number): number {
  // 初始化结果数组，dp[i]表示第i+1个魔术数
  const dp: number[] = new Array(k)
  // 第一个魔术数是1
  dp[0] = 1

  // 定义三个指针，分别对应乘以3、5、7的索引
  let p3 = 0,
    p5 = 0,
    p7 = 0

  for (let i = 1; i < k; i++) {
    // 计算下一个可能的魔术数
    const next3 = dp[p3] * 3
    const next5 = dp[p5] * 5
    const next7 = dp[p7] * 7

    // 选择最小的那个作为当前魔术数
    dp[i] = Math.min(next3, next5, next7)

    // 移动对应的指针（注意可能有多个指针需要移动，避免重复值）
    if (dp[i] === next3) p3++
    if (dp[i] === next5) p5++
    if (dp[i] === next7) p7++
  }

  return dp[k - 1]
}
