# 爬楼梯

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

# 买卖股票最佳时期

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

# 最大子数组和

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

# 机器人运动

给定一个正数N(大于1)：1，2，3....N，机器人刚开始在S(1到N之间的数)位置，机器人要到达E位置(1到N之间的数)，机器人只能向左或向右走(也就是说机器人在1位置上的时候只能走向2，在N位置上的时候只能走向N-1)，机器人必须走K步到达E，有多少种方法？



比如N=5，S=2，E=4，K=4，那么机器人可以运动的路线包括：

- 2->3->4->5->4
- 2->3->4->3->4
- 2->3->2->3->4
- 2->1->2->3->4

可见大分类上从某个点出发到达目的地分为两种：

- 从该点向左出发
- 从该点向右出发
- 所以总体来说方法数 = 从该点向左出发的方法数 + 从该点向右出发的方法数

如果使用递归来实现，再想一下边界情况：

- 剩余步数为0
- 当前位置为1，只能向右走，走到2
- 当前位置为N，指向左走，走到N-1

```typescript
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
```

首先分析这个递归，N与E是固定参数，S与K为可变参数。**可变参数一旦确定，返回值也就确定了。**也就是说如果要求f(4,2)（4代表剩余步数，2代表所在位置)，就要计算出f(3,1)（向左走）与f(3,3)（向右走）。那么f(3,1)依赖的是f(2,2)（因为只能往右走），f(3,3)依赖f(2,2)与f(2,4)....很多依赖的状态会重复进行计算，比如f(2,2)。如果通过一个表结构（可以是多维数组）来存储计算过的结果，后面直接拿，这样的方式就是**记忆化搜索。**

**那么这个多维数组开多大呢？**

- 可变参数K最大值是K，所以范围是0到K，那么就开K+1的长度
- 可变参数S的最大值是N，所以范围是0到N，那么就开N+1的长度

**怎么使用这个二维数组呢？**

- 将该数组内容填充为-1，带着这个数组进入递归
- 如果能够在数组中找到要递归计算的内容，那么直接返回
- 否则再进行递归展开计算，计算后，存入数组中

```typescript
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
```

对比使用记忆化搜索优化与暴力递归的时间复杂度：

- 暴力递归，每次都可以选择左走或右走，所以可以看成高度为K的二叉树，时间复杂度为O(2k)
- 记忆化搜索，构建的dp表是K*N的规模，而每个格子在计算时只用一次，下次用到直接返回，时间复杂度是O(KN)

记忆化搜索如何改成动态规划？那就需要整理依赖：

- 首先根据规模画出来矩阵，列表示当前走到了哪、行表示剩余多少步
- 要求的是K为4S为2的值，由于S是1到5，所以第0列是没有用的，如下：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753885597067-8b87e3f2-31d9-4f08-9e70-e2c00a312cdd.png)

- 由base case可知：第1行四列为1，其余为0（走到位置4才是1，其余是0）、第一列的值依赖于S+1、K-1的值也就是右上角的值、最后一列的值依赖于S-1、K-1的值也就是左上角的值。
- 由中间数据依赖左上角与右上角的值所以得到如下图

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753886048359-c8d09c89-9979-4a80-b697-9fee60347f34.png)

```typescript
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
```

# 最少硬币

给一组正数的数，每个数字代表一枚硬币的金额，输入目标金额，返回能够凑成目标金额最少的硬币数，如果凑不出返回-1。

比如[2,3,7,5,3]，目标金额10，返回2（最少需要3与7两枚硬币）。



这道题目也是从左往右尝试的模型，从数组中取出硬币的时候可以有两种选择：

- 要这枚硬币
- 不要这枚硬币

如果要这枚硬币，那么目标金额就变为目标金额-当前硬币金额；不要这枚硬币那么目标金额不变。

如果使用递归来实现，那么最少硬币数就是在要这枚硬币产生的硬币数与不要这枚硬币产生的硬币数里取最小值。

现在来看下Basecase：

- 目标金额减少到0了，那么表示后续不需要硬币了，返回0
- 目标金额小于0，代表下面凑不出目标金额了，返回-1
- index等于数组长度了，表示遍历完了也没有凑出目标金额，也返回-1

代码如下：

```typescript
function minCoins(arr: number[], aim: number) {
  return process(arr, 0, aim)
}

function process(arr: number[], index: number, rest: number) {
  // 凑不出硬币了
  if (rest < 0) {
    return -1
  }

  // 接下来不需要再凑硬币了
  if (rest === 0) {
    return 0
  }

  if (index === arr.length) {
    return -1
  }
  // 不要这枚硬币，接下来所需要的硬币数
  const p1 = process(arr, index + 1, rest)
  // 要这枚硬币，接下来所需要的硬币数
  const p2Next = process(arr, index + 1, rest - arr[index])
  if (p1 === -1 && p2Next === -1) {
    return -1
  } else {
    if (p1 === -1) {
      return 1 + p2Next
    }
    if (p2Next === -1) {
      return p1
    }
    return Math.min(p1, 1 + p2Next)
  }
}

console.log(minCoins([2, 3, 100, 200], 5))
```

以【2，3，100，200】为例，凑出5，递归过程如下：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753931041380-6082850d-091b-49a3-af30-1d7ef22c4953.png)

使用记忆化搜索来优化，有两个可变参数：index与rest，所以也是来个二维数组来优化：

- index可取范围为0到终止位置，所以是0-index+1
- rest可取范围为0到aim+1
- -1为无效解，二维数组填充-2来表示没有计算过

```typescript
// 记忆化搜索优化
function minCoins(arr: number[], aim: number) {
  const dp: number[][] = Array.from({ length: arr.length + 1 }, () =>
    new Array(aim + 1).fill(-2)
  )
  return process(arr, 0, aim, dp)
}

function process(arr: number[], index: number, rest: number, dp: number[][]) {
  // 由于reset小于0范围是很大的，这里也没有加入到dp表中，所以直接返回
  if (rest < 0) {
    return -1
  }

  if (dp[index][rest] !== -2) {
    return dp[index][rest]
  }
  if (rest === 0) {
    dp[index][rest] = 0
  } else if (index === arr.length) {
    dp[index][rest] = -1
  } else {
    // 不要这枚硬币，接下来所需要的硬币数
    const p1 = process(arr, index + 1, rest, dp)
    // 要这枚硬币，接下来所需要的硬币数
    const p2Next = process(arr, index + 1, rest - arr[index], dp)
    if (p1 === -1 && p2Next === -1) {
      dp[index][rest] = -1
    } else {
      if (p1 === -1) {
        dp[index][rest] = 1 + p2Next
      } else if (p2Next === -1) {
        dp[index][rest] = p1
      } else {
        dp[index][rest] = Math.min(p1, 1 + p2Next)
      }
    }
  }
  return dp[index][rest]
}

console.log(minCoins([2, 3, 100, 200], 5))
```

下面改成成动态规划，也是使用index作为行，剩余钱数作为列。以【2,3,100,200】凑出5为例：

**首先确定动态规划表中的初始数据以及如何依赖的？**

- 根据递归的basecase可知：rest小于0的区域为-1，index为4的位置为-1，reset为0的位置为0
- 要求的目标是index为0，reset为aim也就是5的位置
- 根据`process(arr, index + 1, rest)`与`process(arr, index + 1, rest - arr[index])`可以知道，其他位置格子的值依赖其下一行当前列以及下一行剩余钱减去该硬币所对应列的内容

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753934334947-2c631866-4974-49c9-b6ac-4200f9c010f0.png)

根据其他位置的依赖关系可以的值，某一行的数据依赖的是其下一行的数据，所以动态规划向表中填内容的时候从下往上从左往右去填

- **需要注意边界条件下的内容填充，比如rest小于0**

代码如下：



```typescript
// 动态规划
function minCoins(arr: number[], aim: number) {
  const dp = Array.from({ length: arr.length + 1 }, () => new Array(aim + 1))
  const N = arr.length
  // 将不用计算的数据填充上
  for (let index = 0; index <= N; index++) {
    dp[index][0] = 0
  }

  for (let rest = 1; rest <= aim; rest++) {
    dp[N][rest] = -1
  }

  for (let index = N - 1; index >= 0; index--) {
    for (let rest = 1; rest <= aim; rest++) {
      const p1 = dp[index + 1][rest]
      // 这里注意边界判断，因为rest - arr[index]可能小于0
      let p2Next = -1
      if (rest - arr[index] >= 0) {
        p2Next = dp[index + 1][rest - arr[index]]
      }
      if (p1 === -1 && p2Next === -1) {
        dp[index][rest] = -1
      } else {
        if (p1 === -1) {
          dp[index][rest] = 1 + p2Next
        } else if (p2Next === -1) {
          dp[index][rest] = p1
        } else {
          dp[index][rest] = Math.min(p1, 1 + p2Next)
        }
      }
    }
  }
  // 从下到上从左到右填充数据
  return dp[0][aim]
}
console.log(minCoins([2, 3, 100, 200], 5))
```

总结：递归到动态规划的改变时：

- 首先分析可变参数的变化范围，一个可变参数就是一维数组、两个可变参数就是二维数组、三个可变参数就是三维数组
- 然后标出要计算的终止位置，根据递归的basecase标出可以直接出答案的位置
- 推出其他位置是如何依赖的
- 确定依次计算的顺序，然后将递归书写的内容改写成动态规划计算的过程

# 谁获胜



给定一个整型数组arr，代表数值不同的纸牌排成一条线。玩家A和玩家B依次拿走每张纸

牌，规定玩家A先拿，玩家B后拿，但是每个玩家每次只能拿走最左或最右的纸牌，玩家A

和玩家B都绝顶聪明。请返回最后获胜者的分数。

【举例】

arr=[1, 2, 100,4]。

开始时，玩家A只能拿走1或4。如果开始时玩家A拿走1，则排列变为 [2,100,41，接下来

玩家 B可以拿走2或4，然后继续轮到玩家A.

如果开始时玩家A拿走4，则排列变为[1,2，100]，接下来玩家B可以拿走1或100，然后继

续轮到玩家A. ..

玩家A作为绝顶聪明的人不会先拿4，因为拿4之后，玩家日将拿走100。所以玩家A会先拿1，

让排列变为[2,100,4]，接下来玩家B不管怎么选，100都会被玩家 A拿走。玩家A会获胜，

分数为101。所以返回101。

arr=[1, 100,2]。

开始时，玩家A不管拿1还是2，玩家B作为绝顶聪明的人，都会把100拿走。玩家B会获胜，

分数为100。所以返回100。



## 具体思路

1. 先看先手取的情况（先手函数思路）

- 从L到R这个范围去尝试，basecase是这个范围内只有一张牌的时候也就是`L等于R时`，那么先手牌的选手会直接拿走，得到这张牌的分数
- 在范围内大于1张牌的时候，只能拿走最左或最右的纸牌，所以都去试一下
- 如果拿走最左的纸牌，也就是`arr[L]`，那么获得的分数就是`arr[L]分数 + 后手取L+1到R范围的分数`
- 同理如果拿走最右的纸牌，那么获得的分数就是`arr[R]分数+后手取L到R-1范围的分数`
- 取两个分数中的最大值即可

1. 对于后手取来说（后手函数思路）

- basecase也是范围内只有一张牌的时候，因为是后手所以被别人拿走，得到0
- 如果不止一张牌，别人拿走L的牌，那么就轮到后手选手去先手拿L+1到R范围的牌
- 如果别人拿走R的牌，那么就轮到后手选手去先手拿L到R-1范围的牌
- **对于后手取来说，由于别人会把最大的牌拿走，所以这两种情况的最小值就是后手取的分数**

## 代码实现

```typescript
function win(nums: number[]): number {
  if (!nums.length) return 0
  return Math.max(
    firstGet(nums, 0, nums.length - 1),
    secondGet(nums, 0, nums.length - 1)
  )
}

// 先手获取
function firstGet(nums: number[], l: number, r: number): number {
  // 如果只有一张牌了那么先手选手直接获取
  if (l === r) {
    return nums[l]
  }
  // 不止一张牌的时候就去从左边取或从右边取，取最大的那个
  // 从左边取的话，那么结果是左边牌分数 + 后手从l+1到r范围内取牌的分数
  const lScore = nums[l] + secondGet(nums, l + 1, r)
  // 从右边取的话，那么结果是右边牌分数 + 后手从l到r-1范围内取牌的分数
  const rScore = nums[r] + secondGet(nums, l, r - 1)
  return Math.max(lScore, rScore)
}

// 后手获取
function secondGet(nums: number[], l: number, r: number): number {
  // 如果只有一张牌了那么后手选手获得0
  if (l === r) {
    return 0
  }
  // 如果别人拿走左边的牌，那么结果是先手从l+1到r范围内取牌的分数
  const lScore = firstGet(nums, l + 1, r)
  // 如果别人拿走右边的牌，先手手从l到r-1范围内取牌的分数
  const rScore = firstGet(nums, l, r - 1)
  return Math.min(lScore, rScore)
}

console.log(win([1, 100, 2]))
```

## 修改成动态规划

首先分析可变参数：

- 不管是先手函数还是后手函数，可变参数都是l与r，是数组中的index，范围为0到n-1

确定需要哪个位置上的内容：

- 最终需要的是先手函数和后手函数中的l为0 r为 n -1位置上的值

确定内容如何填写：

- 范围内尝试，l不可能大于r，所以表中左下方区域无效，排除这些区域的内容
- 根据basecase 先手函数如果l等于r，对应的内容就是arr[l]；后手函数l等于r时，对应的格子都是0
- 接下来分析普遍位置是如何依赖的，对于先手函数来说，依赖后手函数，需要(l+1, r)与（l, r-1)，也就是说先手函数的(0,3)依赖后手函数的(1,3)与(0,2)；后手函数也有同样的特征，依赖先手函数左边与下边的内容

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753948965793-826c83b4-3162-41e4-aa3f-655d50f7b5bb.png)

那么由此可知，先手函数倒数第二条对角线上的内容可以由后手函数第一条对角线推出来；而后手函数倒数第二条对角线上的内容可以由先手函数第一条对角线推导出来：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753949308893-28332eb7-11c2-41c4-9b3d-6803effae3c9.png)

代码实现如下：

```typescript
// 动态规划
function win(nums: number[]): number {
  if (!nums.length) return 0
  const f: number[][] = Array.from(
    { length: nums.length },
    () => new Array(nums.length)
  )
  const s: number[][] = Array.from({ length: nums.length }, () =>
    new Array(nums.length).fill(0)
  )
  // 对先手函数对角线上的数据进行填充
  for (let i = 0; i < nums.length; i++) {
    f[i][i] = nums[i]
  }

  let row = 0
  let col = 1
  while (col < nums.length) {
    let i = row
    let j = col
    // 填完一条对角线
    while (i < nums.length && j < nums.length) {
      f[i][j] = Math.max(nums[i] + s[i + 1][j], nums[j] + s[i][j - 1])
      s[i][j] = Math.min(f[i + 1][j], f[i][j - 1])
      i++
      j++
    }
    col++
  }
  return Math.max(f[0][nums.length - 1], s[0][nums.length - 1])
}

console.log(win([1, 100, 2]))
```



## 类似题目

https://leetcode.cn/problems/predict-the-winner/description/

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1753421419830-ac2ea4c4-7904-4d09-82e0-9256d40120d6.png)

```typescript
function predictTheWinner(nums: number[]): boolean {
    if (!nums.length) return true
    return firstGet(nums, 0, nums.length - 1) >= secondGet(nums,0, nums.length - 1)
};


function firstGet(nums: number[], l: number, r: number): number {
    // 如果只有一张牌了那么先手选手直接获取
    if (l === r) {
        return nums[l]
    }
    // 不止一张牌的时候就去从左边取或从右边取，取最大的那个
    // 从左边取的话，那么结果是左边牌分数 + 后手从l+1到r范围内取牌的分数
    const lScore = nums[l] + secondGet(nums, l + 1, r)
    // 从右边取的话，那么结果是右边牌分数 + 后手从l到r-1范围内取牌的分数
    const rScore = nums[r] + secondGet(nums, l, r - 1)
    return Math.max(lScore, rScore)
}

function secondGet(nums: number[], l: number, r: number): number {
  // 如果只有一张牌了那么后手选手获得0
  if (l === r) {
    return 0
  }
  // 如果别人拿走左边的牌，那么结果是先手从l+1到r范围内取牌的分数
  const lScore = firstGet(nums, l + 1, r)
  // 如果别人拿走右边的牌，先手手从l到r-1范围内取牌的分数
  const rScore = firstGet(nums, l, r - 1)
  return Math.min(lScore, rScore)
}
```

动态规划版本：

```typescript
// 动态规划
function predictTheWinner(nums: number[]): boolean {
  if (!nums.length) return true
  const f: number[][] = Array.from(
    { length: nums.length },
    () => new Array(nums.length)
  )
  const s: number[][] = Array.from({ length: nums.length }, () =>
    new Array(nums.length).fill(0)
  )
  // 对先手函数对角线上的数据进行填充
  for (let i = 0; i < nums.length; i++) {
    f[i][i] = nums[i]
  }

  let row = 0
  let col = 1
  while (col < nums.length) {
    let i = row
    let j = col
    // 填完一条对角线
    while (i < nums.length && j < nums.length) {
      f[i][j] = Math.max(nums[i] + s[i + 1][j], nums[j] + s[i][j - 1])
      s[i][j] = Math.min(f[i + 1][j], f[i][j - 1])
      i++
      j++
    }
    col++
  }
  return f[0][nums.length - 1] >= s[0][nums.length - 1]
}
```

# 解码方法（从左往右尝试类）

https://leetcode.cn/problems/decode-ways/description/

规定1和A对应、2和B对应、3和C对应..

那么一个数字字符串比如“111”，就可以转化为"AAA”、"KA"和“AK”

给定一个只有数字字符组成的字符串str，返回有多少种转化结果。

## 具体思路

也是从左往右取尝试，比如来到了i位置，0到i-1位置已经确定下来了，求i往后有多少个有效的

- 那么i位置是0，那么有0种，因为0没有办法和任何字母对应，直接返回0

如果i位置不是0，那么分情况看，分两大类

- 该位置不管是数字几，自己可以构成一种，然后再继续尝试后面的
- 如果该位置上对应的数*10加上加一位小于27则也可以构成一种，然后尝试后面的

经过如上的处理，i来到了length的位置，则证明处理完毕，返回1



## 代码实现

```typescript
//https://leetcode.cn/problems/decode-ways/description/

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
```

## 改为动态规划

根据这几步来：

- 首先分析可变参数的变化范围，只有index，是一个一维数组
- 根据递归的basecase填充可以直接出答案的位置: `dp[n]=1`，顺便可以计算出dp[n-2]对应的值
- 推出其他位置是如何依赖的：依赖index+1位置的结果、以及如果该位置和index+1位置组成的数小于27则还依赖index+2位置的结果，**也就是前一个位置依赖后几个位置的值，那么for循环从后往前来遍历**
- 确定主函数需要的结果，是dp[0]



```typescript
// 动态规划版本
function numDecodings(s: string): number {
  if (!s.length || s === '0') return 0

  const N = s.length
  const dp: number[] = new Array(N + 1)
  dp[N] = 1
  // 最后一个字符如果是0则0中，否则1种
  dp[N - 1] = s[N - 1] === '0' ? 0 : 1
  for (let i = N - 1; i >= 0; i--) {
    if (s[i] === '0') {
      dp[i] = 0
    } else {
      dp[i] = dp[i + 1] + (+s[i] * 10 + +s[i + 1] < 27 ? dp[i + 2] : 0)
    }
  }
  return dp[0]
}
console.log(numDecodings('12'))
```