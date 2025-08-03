//https://leetcode.cn/problems/decode-ways/description/

/**
 * 规定1和A对应、2和B对应、3和C对应..
 * 那么一个数字字符串比如“111”，就可以转化为"AAA”、"KA"和“AK”
 * 给定一个只有数字字符组成的字符串str，返回有多少种转化结果。
 */

function numDecodings(s: string): number {
  if (!s.length) return 0
  return process(s, 0)
}

function process(s: string, index: number) {
  if (index === s.length) {
    return 1
  }
  // 如果对应位置为0，则没有办法解码成任何一种，返回0
  if (s[index] === '0') {
    return 0
  }

  // 首先该位置对应的数字可以独立解码
  let res = process(s, index + 1)
  // 该位置是最后一个了，那么没有必要继续组合了
  if (index === s.length - 1) {
    return res
  }
  // 如果该位置数字与后一位数字组合小于27则也可以对应一种解码方式
  if (+s[index] * 10 + +s[index + 1] < 27) {
    res += process(s, index + 2)
  }
  return res
}

console.log(numDecodings('12'))
export {}
