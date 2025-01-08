function maxProfit(prices: number[]): number {
  const dp: number[] = []
  dp[0] = 0
  let minPrice = prices[0]
  for(let i = 1; i < prices.length; i++) {
    dp[i] = Math.max(dp[i-1], prices[i] - minPrice)
    minPrice = Math.min(prices[i], minPrice)
  }
  return dp[prices.length-1]
}

// 状态压缩
function maxProfit2(prices: number[]): number {
  let curMaxProfit = 0
  let minPrice = prices[0]
  for(let i = 1; i < prices.length; i++) {
    curMaxProfit = Math.max(curMaxProfit, prices[i] - minPrice)
    minPrice = Math.min(prices[i], minPrice)
  }
  return curMaxProfit
}
console.log(maxProfit([7,1,5,3,6,4]))
console.log(maxProfit2([7,1,5,3,6,4]))