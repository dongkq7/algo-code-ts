// https://leetcode.cn/problems/maximum-nesting-depth-of-the-parentheses/

// 括号最大深度
function maxDepth(s: string): number {
  if (!s.length) return 0

  let count = 0
  let maxDepth = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      count++
      maxDepth = Math.max(maxDepth, count)
    }
    if (s[i] === ')') {
      count--
    }
  }
  return maxDepth
}
