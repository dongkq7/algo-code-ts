/**
 * 给定一个正数N(大于1)：1，2，3....N，机器人刚开始在S(1到N之间的数)位置
 * 机器人要到达E位置(1到N之间的数)
 * 机器人只能向左或向右走(也就是说机器人在1位置上的时候只能走向2，在N位置上的时候只能走向N-1)
 * 机器人必须走K步到达E，有多少种方法？
 */

// 使用递归方式实现
function robotMove(N: number, S: number, E: number, K: number) {
  return f(N, S, E, K)
}

function f(N: number, S: number, E: number, K: number) {
  // 剩余步数为0，则看当前位置是否为目标位置
  if (K === 0) {
    return E === S ? 1 : 0
  }
  // 当前位置为1，那么只能向右走
  if (S === 1) {
    return f(N, S + 1, E, K - 1)
  }
  // 当前位置为N，那么只能向左走
  if (S === N) {
    return f(N, S - 1, E, K - 1)
  }
  return f(N, S + 1, E, K - 1) + f(N, S - 1, E, K - 1)
}

console.log(robotMove(5, 2, 4, 4))

export {}
