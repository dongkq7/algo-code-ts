// https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/description/

// 最少添加几个括号使得括号有效
function minAddToMakeValid(s: string): number {
  if (!s.length) return 0

  let count = 0
  let ans = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      count++
    } else {
      if (count === 0) {
        ans++
      } else {
        count--
      }
    }
  }
  return ans + count
}
