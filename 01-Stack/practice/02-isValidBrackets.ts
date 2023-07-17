// 题目连接：https://leetcode.cn/problems/valid-parentheses/description/

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 有效字符串需满足：
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 每个右括号都有一个对应的相同类型的左括号。
 * 来源：力扣（LeetCode）
 * 示例:
 * () 、[] 、 {} 、({})[] 均为有效括号
 * (] 、({{)、{](、（)( 均不是有效括号
 * @param str 
 */
import ArrayStack from "../implement/ArrayStack";
function isValid(s: string): boolean {
  if (!s) return false
  // const stack: string[]  = []
  const stack = new ArrayStack<string>()
  for(let i = 0; i < s.length; i++) {
      switch(s[i]) {
          case '(' :
          stack.push(')')
          break
          case '{' :
          stack.push('}')
          break
          case '[' :
          stack.push(']')
          break
          default:
          if (s[i] !== stack.pop()) return false
          break
      }
  }
  // return stack.length === 0
  return stack.isEmpty()
};
// test
console.log(isValid('()'))
console.log(isValid('({})[]'))
console.log(isValid('(]'))
console.log(isValid('{]('))