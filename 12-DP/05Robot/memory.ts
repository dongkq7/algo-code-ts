/**
 * 给定一个正数N(大于1)：1，2，3....N，机器人刚开始在S(1到N之间的数)位置
 * 机器人要到达E位置(1到N之间的数)
 * 机器人只能向左或向右走(也就是说机器人在1位置上的时候只能走向2，在N位置上的时候只能走向N-1)
 * 机器人必须走K步到达E，有多少种方法？
 */

// 使用递归方式 + 记忆化搜索 实现
function robotMove(N: number, S: number, E: number, K: number) {
  const dp = Array.from({ length: K + 1 }, () => new Array(N + 1).fill(-1))
  return f(N, S, E, K, dp)
}

function f(N: number, S: number, E: number, K: number, dp: number[][]) {
  if (dp[K][S] !== -1) {
    return dp[K][S]
  }
  // 剩余步数为0，则看当前位置是否为目标位置
  if (K === 0) {
    dp[K][S] = E === S ? 1 : 0
    return dp[K][S]
  }
  // 当前位置为1，那么只能向右走
  if (S === 1) {
    dp[K][S] = f(N, S + 1, E, K - 1, dp)
  } else if (S === N) {
    // 当前位置为N，那么只能向左走
    dp[K][S] = f(N, S - 1, E, K - 1, dp)
  } else {
    dp[K][S] = f(N, S + 1, E, K - 1, dp) + f(N, S - 1, E, K - 1, dp)
  }
  return dp[K][S]
}

console.log(robotMove(5, 2, 4, 4))

export {}
