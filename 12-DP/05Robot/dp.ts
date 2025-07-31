/**
 * 给定一个正数N(大于1)：1，2，3....N，机器人刚开始在S(1到N之间的数)位置
 * 机器人要到达E位置(1到N之间的数)
 * 机器人只能向左或向右走(也就是说机器人在1位置上的时候只能走向2，在N位置上的时候只能走向N-1)
 * 机器人必须走K步到达E，有多少种方法？
 */

function robotMove(N: number, S: number, E: number, K: number) {
  const dp = Array.from({ length: K + 1 }, () => new Array(N + 1).fill(0))
  dp[0][E] = 1
  for (let rest = 1; rest <= K; rest++) {
    for (let cur = 1; cur <= N; cur++) {
      if (cur === 1) {
        dp[rest][cur] = dp[rest - 1][2]
      } else if (cur === N) {
        dp[rest][cur] = dp[rest - 1][N - 1]
      } else {
        dp[rest][cur] = dp[rest - 1][cur - 1] + dp[rest - 1][cur + 1]
      }
    }
  }
  return dp[K][S]
}

console.log(robotMove(5, 2, 4, 4))
export {}
