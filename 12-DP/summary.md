## 爬楼梯

https://leetcode.cn/problems/climbing-stairs/

假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。

每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶呢？



**思路**

可以先去思考，如果要爬到n阶，实际上要么从n-1阶处爬1个台阶上去，要么从n-2阶处爬2个台阶上去。

所以爬到n阶的方法就等于爬到n-1阶的方法加上爬到n-2阶的方法，即：dp[n] = dp[n-1] + dp[n-2]。

确定好状态转移方程后，再去确认好初始化状态，`dp[0] = 1 dp[1] = 1`



**实现**

```typescript
function climbStairs(n: number): number {
  const dp: number[] = []
  dp[0] = 1
  dp[1] = 1
  for(let i = 2; i <= n; i++) {
    dp[i] = dp[i-2] + dp[i-1]
  }
  return dp[n]
}
```



**优化**

由于第n阶的方法计算与第n-1和第n-2有关，所以也可以通过状态压缩去优化：

```typescript
function climbStairs(n: number): number {
  let pre = 1
  let cur = 1

  for(let i = 2; i <= n; i++) {
    const next = pre + cur
    pre = cur
    cur = next
  }
  return cur
};
```

## 买卖股票最佳时期

https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。

你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。

**示例 1**

输入：[7,1,5,3,6,4]

输出：5

解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。

 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

**示例 2：**

输入：prices = [7,6,4,3,1]

输出：0

解释：在这种情况下, 没有交易完成, 所以最大利润为 0。



**思路**

假设dp[i]为前i天能获取的最大利润，对于输入情况为[7,1,5,3,6,4]这种情况来说，可以进行如下思考：

- 第一天只能买入，所以利润为0
- 第二天卖出的话（只能第一天先买入）, 所以利润为 `-6`，目前可获得的最大利润为`0`
- 第三天卖出的最大利润为第二天买入第三天卖出（第二天股票最便宜），是`5 - 1 = 4`，目前最大利润为`4`
- 第四天卖出的最大利润为第二天买入第四天卖出, 是`3 - 1 = 2`，目前最大利润为`4`
- 以此类推，第二天买入，第五天卖出获得的利润最大，为`6 - 1 = 5`

那么，`第i天卖出的最大利润 = 当前股票价格 - 前i天股票最便宜的价格`。

所以，整体可获取最大的利润就是`max(前i天卖出的最大利润)`



**状态转移方程**

如果使用minPrice表示前i天中最便宜的那天买入的价格，prices[i]表示当天股票的价格

- 那么可以使用`prices[i] - minPrice`来表示第i天可获取的最大利润
- 那么整体可获取的最大利润就是前i-1天获取的最大利润与第i天获取的最大利润中的较大值
- 以此来看，动态转移方程可表示为`dp[i] = max(dp[i-1], prices[i] - minPrice)`



**初始状态**

由于第一天只能买入不能卖出，所以初始状态为`dp[0] = 0`



**实现**

```typescript
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
```

**优化**

可见，dp中保存的是第i天的最大利润，只和前一天的最大利润有关，所以可以使用状态压缩来优化，使用一个变量来维护前一天获取的最大利润即可。

```typescript
function maxProfit(prices: number[]): number {
  let curMaxProfit = 0
  let minPrice = prices[0]
  for(let i = 1; i < prices.length; i++) {
    curMaxProfit = Math.max(curMaxProfit, prices[i] - minPrice)
    minPrice = Math.min(prices[i], minPrice)
  }
  return curMaxProfit
}
```

## 最大子数组和

https://leetcode.cn/problems/maximum-subarray/description/

给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组**是数组中的一个连续部分。

**示例 1：**

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]

输出：6

解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

**示例 2：**

输入：nums = [1]

输出：1

**示例 3：**

输入：nums = [5,4,-1,7,8]

输出：23



**思路**

假设dp[i]为以i位置的元素结尾的连续数组能获取到的最大值，对于nums[-2,1,-3,4,-1,2,1,-5,4]来说：

dp[0] = -2 因为以0位置结尾只有一个元素-2

dp[1] = 1 以1位置结尾可以是[-2,1]也可以是[1]，但是如果是[-2,1]的话值是-1，所以最大值是1，即dp[1] = max(nums[1], dp[0] + nums[1])，子数组为[1]

dp[2] = -2 以2位置结尾最大值为-2，即dp[2] = max(nums[2], dp[1] + nums[2])，子数组为[1,-3]

dp[3] = 2 以3位置结尾最大值为2, 即dp[3] = max(nums[3], dp[2] + nums[3])，子数组为[1,-3,4]

...以此类推，可以发现，以i位置结尾可获取的最大值为 **当前元素的值** 与 **第i-1位置的最大值+当前元素的值** 中的较大值 `**dp[i] = max(nums[i], dp[i-1] + nums[i])**`**。**可以使用一个变量来保存当前的最大值，最终返回该值即可。



**状态转移方程**

```
dp[i] = max(nums[i], dp[i-1] + nums[i])
```



**初始状态**

```
dp[0] = nums[0]
```



**实现**

```typescript
function maxSubArray(nums: number[]): number {
  const dp: number[] = []
  dp[0] = nums[0]
  let max = nums[0]
  for(let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i], dp[i-1] + nums[i])
    max = Math.max(max, dp[i])
  }
  return max
}
```



**优化**

可以发现以i位置结尾的最大值只与i-1位置结尾的最大值有关，所以可以通过一个变量来记录，不需要使用dp数组，从而将空间复杂度降为O(1)。

```typescript
function maxSubArray(nums: number[]): number {
  let preMax = nums[0]
  let max = nums[0]
  for(let i = 1; i < nums.length; i++) {
    preMax = Math.max(nums[i], preMax + nums[i])
    max = Math.max(max, preMax)
  }
  return max
}
```