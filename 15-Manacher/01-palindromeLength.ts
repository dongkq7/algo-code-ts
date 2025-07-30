function manacherString(s: string): string[] {
  const chars = s.split('')
  const res = new Array(2 * chars.length + 1)
  let index = 0
  for (let i = 0; i < res.length; i++) {
    res[i] = (i & 1) === 0 ? '#' : chars[index++]
  }
  return res
}

function palindromeLength(s: string): number {
  if (!s.length) return 0
  // 对字符串进行预处理，121 -> [#,1,#,2,#,1,#]
  const chars = manacherString(s)
  const pArr = new Array(chars.length) // 回文半径数组
  let R = -1 // 回文有边界
  let C = -1 // 回文中心点
  let max = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < chars.length; i++) {
    // 如果R在i外，那么至少有i'对应的回文半径或者R-i对应的区域不用验证
    // 如果R在i内，那么至少当前这个字符所对应的回文半径1不用验证
    pArr[i] = R > i ? Math.min(pArr[2 * C - i], R - i) : 1
    // 尝试向两边扩
    while (i + pArr[i] < chars.length && i - pArr[i] > -1) {
      if (chars[i + pArr[i]] === chars[i - pArr[i]]) {
        pArr[i]++
      } else {
        break
      }
    }
    // 扩不动了看看需不需要更新R
    if (i + pArr[i] > R) {
      R = i + pArr[i]
      C = i
    }
    max = Math.max(max, pArr[i])
  }
  // 原始回文字符串长度 = max - 1
  // 比如#1#2#1#，以2为中心的回文半径为4，原始字符串回文长度为3
  return max - 1
}

console.log(palindromeLength('abccccdd'))
