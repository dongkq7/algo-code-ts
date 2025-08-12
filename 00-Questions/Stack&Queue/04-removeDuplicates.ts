// https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/description/
// 删除字符串中的所有相邻重复项

function removeDuplicates(s: string): string {
  // 创建栈用于存储字符
  const stack: string[] = []

  // 遍历字符串中的每个字符
  for (const char of s) {
    // 检查栈顶元素是否与当前字符相同
    if (stack.length > 0 && stack[stack.length - 1] === char) {
      // 若相同则弹出栈顶元素（相当于删除相邻重复项）
      stack.pop()
    } else {
      // 若不同则将当前字符入栈
      stack.push(char)
    }
  }

  // 将栈中的字符拼接成结果字符串
  return stack.join('')
}
