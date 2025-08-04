/**
 * X代表墙,.代表空间，一个路灯可以点亮其左中右的3个地方，问点亮所有空间至少需要几个路灯?
 * 比如输入一个字符串X..X...XXX..XX，输出3
 */

function minLight(str: string): number {
  let index = 0
  let light = 0

  while (index < str.length) {
    if (str[index] === 'X') {
      index++ // 如果是墙直接跳过
    } else {
      light++ // 否则放灯
      if (index + 1 === str.length) {
        // 下一个位置超过了str直接停止
        break
      } else {
        if (str[index + 1] === 'X') {
          // 下一个位置是墙，那么来到inde+2的位置
          index = index + 2
        } else {
          index = index + 3 // 否则直接来到index+3的位置，因为index放了灯可以照亮3个位置
        }
      }
    }
  }
  return light
}

console.log(minLight('X..X...XXX..XX'))
