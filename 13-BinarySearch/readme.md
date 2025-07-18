假设一个数组中存放的数字是有序的，我们想要查找某个数据，可以以什么方式查找呢？

- 顺序查找
- 二分查找

1. 如果是顺序查找，那么就要从头到尾遍历整个数组，一次比较每个元素和给定元素的值。直到找到元素或遍历结束。
2. 如果是二分查找，每次选择数组中间的元素与给定元素进行比较：如果给定数值比中间元素小，那么就从左半部分去查找；反之，从右半部分去查找。所以这种查找方式每次都会将查找范围减半。直到找到给定元素或者查找范围为空。

# 具体思路

1. 可以设置两个变量left和right来记录查找范围，初始状态left为**0**，right为**arr.length -1**
2. 中间位置的索引就是 **mid = Math.floor((left + right) / 2)**
3. 对比中间位置数字与指定的数字，如果中间位置数字较小，那么就让left指向 mid + 1的位置；反之就让right指向mid - 1的位置
4. 不断循环直至找到数字或left > right结束循环

![img](https://cdn.nlark.com/yuque/0/2023/jpeg/22253064/1689669404022-897059b9-75ac-42fa-a85f-edc62f70e80e.jpeg)

```typescript
function binarySearch(numberList: number[], findNum: number) {
  let left = 0
  let right = numberList.length - 1
  while(left <= right) {
    const mid = Math.floor((left + right) / 2)
    const num = numberList[mid]
    if (num === findNum) {
      return mid
    } else {
      if (num < findNum) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}
// test
console.log(binarySearch([1,3,5,10,13,17,26,33,50,100], 26))
```

当数组有序的时候尽量使用二分查找进行查找



# 细节补充

在求中点位置的值时，通常使用`(left + right) / 2`，但是这样可能会存在一个问题：

**假如数组长度过长，那么left + right可能会溢出。**

那么怎样计算比较好呢？

```javascript
const mid = left + (right - left) / 2
// 也可以写成
const mid = left + ((right - left) >> 1)
```

- 更推荐使用右移操作来进行，右移比除法要快
- 右移1位相当于除以2：(right - left) >> 1 等价于 Math.floor((right - left) / 2)，结果总是整数：位运算的结果始终是整数，不会产生小数部

# 扩展问题

## 问题1

找一个有序数组中大于等于某个数的最左侧的位置

- 进行二分查找，满足大于等于这个数，用一个变量去记录这个位置，然后则继续向左二分
- 如果不满足，则向右侧去二分
- 继续二分，如果满足，则判断当前位置是不是比上次记录的位置靠左，如果是则更新这个位置，继续二分
- ....直到没有数可以找为止

这个问题场景与简单的二分查找不同点在于：**普通二分查找是找到之后直接返回，而这个问题在找到满足条件的之后继续去二分**

所以，当问题场景是找大于等于某个数的最左侧位置、或者小于等于某个数的最右侧位置，也适用于使用二分查找

## 问题2

**局部最小值问题**

在一个无序数组中，任何两个相邻的数不相等，求这个数组中任何一个局部最小值，要求时间复杂度小于O(N)

- 所谓局部最小值就是，如果这个数是0位置上的数，那么它比位是1位置上的数小；如果这个数是数组中最后一个位置的数，那么它倒数第二个数小；如果这个数是第i位置上的数，那么它比i-1和i-2位置上的数都小

具体思路：

假如数组长度是n

1. 先判断0位置上的数是不是局部最小，如果是，则直接返回。如果不是，那么它肯定比1位置上的数大
2. 再判断n-1位置上的数是不是局部最小，如果是。则直接返回，如果不是，那么它肯定比前一个位置上的数大
3. 以上都不是的话那么肯定满足在0 到n - 1区间必存在局部最小

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751184184635-f23aeb79-b4d4-45d9-aa0d-7bdbc1ae554b.png)

如上图所示，如果第0个位置上的数不是局部最小，**那么0到1呈下降趋势，同理n-2到n-1呈上升趋势。所以中间位置肯定有一个拐点**。

1. 此时直接去中点位置m，如果m位置比m-1位置要小且比m-2位置也要小，那么直接返回
2. 如果m位置比m-1位置要大，也就是说m到m-1呈下降趋势，那么0-m之间必定存在局部最小

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751184521801-d70834bf-9690-4613-a6ea-c5b0421998ff.png)

总的来说，如果第一个数与最后一个数不是局部最小，那么就直接二分，如果中间这个数也不是局部最小，那么其左侧或者右侧必定有一个局部最小，这种场景也适合采用二分查找

- **这种怕他性问题，比如可以确定左边有那么右边没有、或者右边有，左边没有，就可以二分 并不是只有有序才能二分**

# 时间复杂度

由于二分查找是每次找一半，所以时间复杂度为O(logN)

- 相当于一次砍一半，最多砍几次，比如8，每次砍一半，最多砍3次，时间复杂度为log2N
- log2N简写成logN