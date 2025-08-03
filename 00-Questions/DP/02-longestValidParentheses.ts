// https://leetcode.cn/problems/longest-valid-parentheses/description/

// 求有效括号的最长匹配长度

function longestValidParentheses(s: string): number {
  if (!s.length) return 0
  let pre = 0 // 该位置之前的有小括号长度
  let res = 0
  const dp = new Array(s.length).fill(0)

  for (let i = 1; i < s.length; i++) {
    if (s[i] === ')') {
      pre = i - dp[i - 1] - 1
      if (pre >= 0 && s[pre] === '(') {
        dp[i] = dp[i - 1] + 2 + (pre > 0 ? dp[pre - 1] : 0)
      }
    }
    res = Math.max(res, dp[i])
  }
  return res
}

console.log(longestValidParentheses(')()())'))
