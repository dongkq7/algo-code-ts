//https://leetcode.cn/problems/decode-ways/description/

/**
 * 规定1和A对应、2和B对应、3和C对应..
 * 那么一个数字字符串比如“111”，就可以转化为"AAA”、"KA"和“AK”
 * 给定一个只有数字字符组成的字符串str，返回有多少种转化结果。
 */

// 动态规划版本
function numDecodings(s: string): number {
  if (!s.length || s === '0') return 0

  const N = s.length
  const dp: number[] = new Array(N + 1)
  dp[N] = 1
  // 最后一个字符如果是0则0中，否则1种
  dp[N - 1] = s[N - 1] === '0' ? 0 : 1
  for (let i = N - 1; i >= 0; i--) {
    if (s[i] === '0') {
      dp[i] = 0
    } else {
      dp[i] = dp[i + 1] + (+s[i] * 10 + +s[i + 1] < 27 ? dp[i + 2] : 0)
    }
  }
  return dp[0]
}
console.log(numDecodings('12'))
export {}
