function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return ''

  let prefix = strs[0]
  for(let i = 1; i < strs.length; i++) {
    while(strs[i].indexOf(prefix) !== 0) {
      prefix =  prefix.slice(0, prefix.length - 1)
    }
    // 如果截取完了还没有匹配那么直接返回空字符串
    if (prefix === '') {
      return ''
    }
  }
  return prefix
}

console.log(longestCommonPrefix(["flower","flow","flight"]))

console.log(longestCommonPrefix(["dog","racecar","car"]))