function lengthOfLongestSubstring(s: string): number {
  if (s.length <= 1) return s.length

  const map = new Map<string, number>() // 保存字符及出现的位置
  let left = 0
  let max = 0 // 最长长度

  for (let right = 0; right < s.length; right++) {
    const char = s[right]
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1
    }
    map.set(char, right)
    max = Math.max(max, right - left + 1)
  }
  return max
}

console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring('bbbbb'))
console.log(lengthOfLongestSubstring('pwwkew'))