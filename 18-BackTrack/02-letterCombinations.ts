// https://leetcode.cn/problems/letter-combinations-of-a-phone-number/

/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 */
function letterCombinations(digits: string): string[] {
  const results: string[] = []
  if (!digits?.length) return results

  const numMap = [
    '', // 0 - 不使用
    '', // 1 - 不使用
    'abc', // 2
    'def', // 3
    'ghi', // '4'
    'jkl', // '5'
    'mno', // '6'
    'pqrs', // '7'
    'tuv', // '8'
    'wxyz', // '9'
  ]

  /**
   * index - 当前处理到了第几位 "23" 需要先处理第 0 位 2，然后处理第 1 位就是 3
   * path - 已经组合好的字母序列
   */
  function backtrack(index: number, path: string[]) {
    if (index === digits.length) {
      // 进入此分支，说明所有数字都已经处理完了
      results.push(path.join('')) // 将 path 数组拼成字符串，推入到结果数组里面
      return
    }

    const digit = digits[index] // 2
    const letters = numMap[Number(digit)] // 获取当前数字所对应的字母序列

    // 遍历字母序列
    for (let i = 0; i < letters.length; i++) {
      path.push(letters[i]) // 将一个字母推入到path中
      // 递归下一位数字
      backtrack(index + 1, path)
      path.pop() // 移除最后一个字母
    }
  }

  backtrack(0, [])
  return results
}
