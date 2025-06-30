# 1、冒泡排序

## 基本思路

通过两两比较相邻的元素并交换它们的位置，从而是的整个序列按照顺序排列。

- 一趟排序后，最大值总会是会被移动到数组的最后面，那么接下来就不用再考虑这个最大值
- 一直重复这样的操作，最终就可以得到排序完成的数组

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735810226467-99203471-9c8a-4365-8c0a-849186ae0425.png)

所以可以通过双重循环来实现：

- 外层循环用来控制遍历次数，每次遍历后最大的元素会被放到正确的位置

- 如果数组长度为n，那么需要进行n-1轮比较，比如数组长度为5，每一轮比较后最大的一个数便会放到最后，那么就需要比较4轮。

- 内层循环用于比较和交换相邻的元素

- 由于比较时是第i位与第i+1位进行比较，所以j的最大值取到n-1
- 由于每一轮两两比较后都有一个最大值会放到最后，所以两两比较的次数与循环的轮数有关，所以内层循环此时为n-1-轮数

```typescript
function bubbleSort(arr: number[]): number[] {
  const n = arr.length
  // 表示进行的第几轮
  for(let i = 0; i < n; i++) {
    // 表示两两比较次数
    for(let j = 0; j < n - 1 - i; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
```

## 优化

实际上有时候不用循环多次进行两两比较，有可能在进行几轮之后数组已经是有序的了。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735812163915-d4808917-ef72-45f0-8988-ad3a3b20d716.png)

此时我们可以在每轮比较的时候声明一个变量来记录是否发生了交换，如果没有发生交换那么证明数组已经是有序的了，直接跳出循环即可：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735812219847-0ec17848-431f-4311-ab48-ea55a689e9ba.png)

## 测试

为了方便测试，以及方便其他排序算法测试，可以写一个工具方法进行测试

```typescript
type SortFunType = (arr: number[]) => number[]

function isSorted(arr: number[]): boolean {
  for(let i = 0; i<arr.length; i++) {
    if (arr[i] > arr[i+1]) {
      return false
    }
  }
  return true
}

export function testSort(sortFun: SortFunType) {
  const arr = Array.from({length: 10}, () => {
    return Math.floor(Math.random() * 100)
  })

  console.log('排序前 =>', arr)
  sortFun(arr)
  console.log('排序后 =>', arr)
  console.log('是否完成排序？', isSorted(arr))
}
```

## 扩展-使用异或运算来交换两个数据

### 异或基本计算

- 两个数相同，异或为0
- 两个数不同，异或为1

异或运算还可以理解为**无进位相加****，**比如，二进制10110 ^ 00111 = 10001

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751167629934-e8b80ad9-bad7-482a-92e6-79852ffbf53c.png)

- 也就是说可以理解为逐个位置相加，但是不进位，从右向左，0 + 1 = 1、1 + 1 = 0但是不进位、1 + 1 = 0不进位、0 + 0 = 0 、 1 + 0 = 1，所以得到10001

### 异或运算的性质

- `**0 ^ N = N**`**（0和任何一个数异或都是这个数）**
- `**N ^ N = 0**`**（任何一个数和自己异或结果是0）**
- `**A ^ B = B ^ A**`、`**A ^ B ^ C = A ^ (B ^ C)**`**（异或运算满足交换率、结合率）**
- **同一批数去异或的结果和先后的异或顺序无关，结果都是一样的**

### 交换两个数的异或写法

```javascript
export function swap(arr: number[], i: number, j: number) {
  arr[i] = arr[i] ^ arr[j]
  arr[j] = arr[i] ^ arr[j]
  arr[i] = arr[i] ^ arr[j]
}
```

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751168889652-5d41246c-9838-494e-ae8c-224a43ffb67e.png)

为什么可以这样写呢？假设arr[i]为a、arr[j]为b

- 执行a = a ^ b，那么此时a = a ^ b，b没变
- 执行b = a ^ b，由于此时a变成了a ^ b，所以相当于 b = a ^ b ^ b，也就是b = a ^ (b ^ b) 也就等于a ^ 0，所以此时b = a
- 执行第三行代码，此时a还是a ^ b，而b变成了a，所以相当于 a ^ b ^ a，也就是 a = (a ^ a) ^ b，所以就是0 ^ b，结果就是b了



### 使用异或进行交换的注意事项

要确保两个交换的内容不指向同一块内存区域，如果和同一块内存区域的内容进行异或将被洗成0！

### 关于异或的题目

#### 题目1

在一个数组中，只有一个数出现了奇数次，其余数出现了偶数次，如何找到这个出现奇数次的数呢？

https://leetcode.cn/problems/single-number/description/

解题思路：

根据异或的特性：

- 如果两个数相同，异或得0
- 0与其他数异或都得这个数

又由于**异或运算顺序无所谓**，比如 这个数组是1,2,3,2,3,1,1，先准备一个初始变量0，那么就用这个变量和数组中的数从头异或到尾，最终异或结果相当于两个2先进行异或，然后两个3再进行异或，最后三个1进行异或，所以最终结果就是这个出现了奇数次的数

```typescript
function singleNumber(nums: number[]): number {
    let eor = 0
    for(const n of nums) {
        eor = eor ^ n
    }
    return eor
}
```

#### 题目2

在一个数组中，两个数出现了奇数次，剩下的数出现了偶数次，那么如何找出这两个出现奇数次的数？

解题思路：

- 同题目1一样，也是要**先准备一个初始值为0的变量r1，从头异或到尾**，由于其他数出现了偶数次，假设这两个数是a和b,所以此时这个变量的结果肯定是a ^ b
- 又由于这两个数是不同的（因为如果相同异或结果就是0了），所以异或结果不等于0，**那么也就意味着a ^ b的结果至少有一位是1**
- 那么假设第8位为1，那么数组中的数就可以分为两大类：第8位为1与第8位不为1的
- **此时在准备一个初始为0的变量r2，只与第8位为1或者第8位不为1的数进行异或，那么此时得到的结果要么是a要么是b**
- 最后再让r1与r2进行异或即可得到另一个数

```typescript
function findNumber(arr: number[]) {
  let r1 = 0

  for(const n of arr) {
    r1 = n ^ r1
  }
  // 此时r1的结果为a ^ b
  // 由于r1非0 所以至少有一位是1
  // 找到最右侧的1
  let rightOneNumber = r1 & (~r1 + 1)

  let r2 = 0
  for(const n of arr) {
    if ((n & rightOneNumber) !== 0) {
      r2 = r2 ^ n
    }
  }
  const otherNumber = r1 ^ r2
  return [r2, otherNumber]
}

console.log(findNumber([1,2,3,2,3,6]))
```

补充说明：

`r1 & (~r1 + 1)`是用来找到结果中最右侧的1，比如结果为1010111100，那么找到最右侧1：0000000100

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751172168282-c32705b7-65ea-4a31-8352-c28749af7134.png)

所以让数组中的数与这个rightOneNumber做与运算，得到的结果要么是0要么是rightOneNumber

## 总结

冒泡排序在最好的情况下，时间复杂度是O(n)，即：待排序的序列已经是有序的，此时仅需要遍历一遍序列，不需要进行交换操作。

最坏的情况是![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg),即待排序的序列是逆序的，需要进行n-1轮，每一轮中需要进行n-1-i次比较和交换操作。

由此可见，冒泡排序的时间复杂度主要取决于数据的初始顺序，最坏情况是![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg),不适用于大规模数据的排序。

适用于数据规模较小的情况，对于大数据量的排序会变得很慢，不常用，通常被更高效的排序算法代替，比如快速排序、归并排序等。



# 2、选择排序

## 基本思路

1. 遍历数组，找到未排序部分的最小值

   a. 首先，将未排序部分的第一个元素标记为最小值

   b. 然后从未排序部分的第二个元素开始进行遍历，依次和已知的最小值进行比较

   c. 如果找到了比最小值更小的元素，就更新最小值的位置

2. 将未排队部分的最小值放到已排序部分的后面

   a. 首先，用解构赋值的方式交换最小值和已排序部分的末尾元素的位置

   b. 然后，已排序部分的长度加一，未排序部分的长度减一

3. 重复执行步骤1和2，直到所有元素都有序

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735869922816-044684e5-97df-4ac6-aa4c-fe0b6145bf73.png)

选择排序相比于冒泡排序来说在比较次数上是一样的，但是在交换次数上做了优化。

- 冒泡排序是两两比较进行交换
- 选择排序是一轮中一直对比后找到最大/最小的进行一次交换

## 实现

可以先考虑第一轮循环时找最小值的方式

- 第一轮循环最小值索引minIndex = 0
- 然后从index为1的位置开始循环，循环到最后一个元素去和index = 0位置元素去对比，如果比它小那么就让minIndex等于该index，循环完毕便找出了最小位置索引

```typescript
function selectionSort(arr: number[]) {
  //...
  const n = arr.length
  let minIndex = 0
  for(let j = 1; j < n; j ++ ) {
    if (arr[j] < arr[minIndex]) {
      minIndex = j
    }
  }
  //...交换
}
```

这样第一个位置元素便是数组中的最小值，接下来就要从第二个位置处开始找到剩余元素中的最小值了，然后是从第三个位置处开始寻找，依次进行...**直到循环到倒数第二个元素位置（这里注意，不需要循环到最后一个元素，因为内层循环从i+1的位置开始比较，所以循环到倒数第二个元素就可以对整个数组完成排序了）**。

所以要有一个外层循环用来控制从哪个元素开始去寻找：

```typescript
function selectionSort(arr: number[]) {
  const n = arr.length
  for(let i = 0; i < n - 1; i ++) {
    let minIndex = i
    for(let j = i + 1; j < n; j ++ ) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    // minIndex改变时再去交换
    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}
```

- 外层循环控制每轮从哪个位置开始寻找，注意最后依次循环i = n - 2即可，因为内层循环对比是从i + 1的位置开始，所以i = n -2的时候即完成了倒数第二个元素和倒数第一个元素的对比。
- 内层循环用于去和该位置元素进行对比大小
- 可以加一个小优化，当minIndex与i不相等时再进行交换

## 时间复杂度

**最好情况时间复杂度：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

- 如果数组本身是有序的，时间复杂度也为![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)**，**只不过交换次数为0

**最坏情况时间复杂度：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

- 数组本身是逆序的，交换次数是n(n-1) / 2

如果进行大规模的数据排序效率也是比较低



# 3、插入排序

## 基本思路

插入排序类似于打扑克牌时，将抽到的牌插入到合适的位置。

将新抽到的牌与手中已有的牌进行比较，找到一个合适的位置插入新牌：

- 如果新牌比某张牌要小，那么就将这张牌向右移动一位，为新牌腾出位置
- 一直去对比直到找到比新牌小的一张牌为止，然后将新牌插入到这张牌的后一个位置处，这样就完成了依次插入操作

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735876331347-d5d5d503-37eb-4530-9006-6c68cf28c430.png)

## 实现

## ![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735883116202-c7d9a0f7-4c0e-4504-90fd-3d35246ce87e.png)

可以先假设第一个数据是已经排好的，从第二个数据开始依次去取出数据进行对比：

- 在已经排序好的数据中从后向前扫描，将比该数据大的数的位置依次向后移动，直到找到比其小的数据为止
- 然后插入到比其小的数据后面即可

不断去重复这个操作，直到所有的数据都插入到已经排好序的数据中即可

### 方式一

外层循环表示从第二个元素开始依次取出未排序的数据进行对比

内层循环表示从取出数据的位置的前一个位置开始依次向前对比，如果比取出的数据大，那么向后移动一位，直到找到一个比取出数据小的元素或者已经对比到了第一位停止

```typescript
function insertionSort(arr: number[]): number[] {
  const n = arr.length
  // 假设第一个元素已经排好序了，从第二个元素开始依次取出数据进行对比
  for(let i = 1; i < n; i++) {
    const newNum = arr[i]
    let j = i - 1
    // 从该元素的前一个元素开始依次向前去对比
    // 如果大于当前元素，那么向后移动，直到小于当前元素或者对比到了第一个元素为止
    while(arr[j] > newNum && j >= 0) {
      arr[j+1] = arr[j]
      j--
    }
    // 在找到的比当前元素小的元素后面插入
    arr[j+1] = newNum
  }
  return arr
}
```

### 方式二（较好理解）

外层循环与方式一一致，用来从第1个数开始进行循环比较，只不过内层循环不一样：

- 内层循环从i-1的位置开始往前查看，**依次比对比i - 1位置与i位置，如果i-1位置数比i位置大：**`arr[j] > arr[j + 1]`**则交换**
- 直到j越界（小于0了）或者arr[j]不比arr[j+1]大了停止

```typescript
function insertionSort2(arr: number[]): number[] {
  const n = arr.length
  for(let i = 1; i < n; i++) {
    for(let j = i - 1; j >= 0 && arr[j] > arr[j+1]; j--) {
      swap(arr, j, j+1)
    }
  }
  return arr
}
```

## 时间复杂度

插入排序和冒泡排序与选择排序不同，**插入排序的时间复杂度与数据状况有关，数据状况不同，时间复杂度表现不同：**

**最好情况：O(n)**

- 如果元素已经排好序，那么每个元素只需要比较一次就可以确定它的位置，因此比较次数为n-1，移动次数为0

**最坏情况：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

- 如果元素是倒序的，那么每个元素都需要比较和移动都是i次，其中i是元素在数组中的位置
- 因此此时比较次数为n(n-1)/2（第1个元素不需要比较，第2个元素需要比较1次，第3个元素需要比较2次，...第n个元素需要比较n-1次），因此比较次数是0 + 1 + 2 + 3... + (n-1)）移动次数也为n(n-1)/2

如果数组部分有序，那么插入排序可以比冒泡和选择排序更快些。

虽然插入排序有最好情况的复杂度为O(n)，但是整体时间复杂度要按最差的情况来估计，所以插入排序的整体复杂度也是![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)。



# 4、归并排序



## 前置知识

### 递归结果汇总的过程

比如，使用递归去查找数组中的最大值，就有了下面的代码：

```typescript
function findMax(arr: number[], left: number, right: number) {
  // 边界处理：如果这个范围只有一个数，那么直接返回
  if (left === right) {
    return arr[left]
  }
  // 否则分成左右两部分，分别求左侧的最大值与右侧的最大值
  const mid = left + ((right - left) >> 1)
  const leftMax = findMax(arr, left, mid)
  const rightMax = findMax(arr, mid + 1, right)
  return Math.max(leftMax, rightMax)
}

const arr = [1,2,3,4,5,6,7]
console.log(findMax(arr, 0 , arr.length-1))
```

**把递归函数的调用过程进行拆分得到下图：**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751187716094-c0d6e082-8a9e-4b81-b430-d5779ec9cf3c.png)

递归过程类似于一个多叉树，可以发现，**每个节点的结果依赖其下所有子点的结果：**

- f(0,6)先压入栈，然后它需要f(0,3)和f(4,6)，依次压栈
- 然后f(0,3)需要f(0,1)与f(2,3)的结果，依次压入栈
- 依次类推，直到计算到最下面的节点返回结果后，然后将结果汇总之后，依次向上返回
- 此时f(0,3)拿到了结果了，然后出栈
- 再继续去计算f(4,6)，f(4,6)依赖f(4,5)与f(5,6)于是压栈进行计算，然后f(4,5)需要f(4,4)与f(5,5)
- ......

### 递归行为时间复杂度估算

通过master公式来计算：

```
**T(N) = a \* T(N/b) + O(N^d)**
```

这个公式是什么意思呢？

- T(N)指的是，**母问题的数据量是N**
- T(N/b)指的是**子问题的规模**，也就是说求母问题的过程，每次使用的子问题的规模是等量的，都是N/b的规模
- a指的是**子问题的调用次数**
- O(N^d)指的是除去调用之外**剩下的过程的时间复杂度**

这样一类的递归都可以用master公式来求解时间复杂度

**在求解时间复杂度的时候****只看一层调用行为****细节即可。**

对于上面的函数来说：

- 母问题规模是N
- 在调取子问题时都是等量的，规模都是N/2
- 并且子问题调用了2次
- 除了调用过程外，其他过程的时间复杂度是O(1)（直接返回、对比最大值，都是常数级别的）

所以对于上述函数来说，a=2 、b=2 、d = 0，它的master公式为：T(N) = 2 * T(N/2) + O(1)

需要注意，要使用master公式求解，子问题规模必须是等量的。对于上述函数来说比如分了两个子问题，第一个子问题求的是数组三分之一长度中的最大值，第二个子问题求的是数组三分之二长度的子问题，两个子问题规模不一样，这样就不能用master公式了。

至此，a b d的值就确定了，比如T(N) = 2 * T(N/2) + O(1)，那么它对应的时间复杂度是多少呢？计算方式如下：

- 如果logba < d，那么时间复杂度为O(Nd)
- 如果logba > d，那么时间复杂度为O(Nlogba)
- 如果logba = d，那么时间复杂度为O(Nd * logN)

对于上述master公式为，因为log22 = 1 > 0，所以它的时间复杂度为O(N)，也就意味着它的时间复杂度等效与从左到右遍历一遍数组求最大值

## 归并排序核心思想

归并排序，英语 Merge Sort，这是一种基于 **分治法** 的排序算法。它的基本思想是**将一个大的数组分成若干个小的数组，****直到每个小数组只有一个元素为止****。然后再将这些小数组合并成一个有序的数组**。

归并排序工作流程：

1. **分割**：将原始数组分成两个部分，递归的将每一个部分的数组继续分割，直到每个部分只包含一个元素。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195864967-c0323484-7956-4163-a177-270fe71c6a78.png)

1. **合并**：将分割好的部分，两两合并，合并的时候保持顺序，最终合并成一个有序的数组。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195864990-e8e1e190-5523-43b2-b9bd-9c5e06f52434.png)

“拆分”非常好理解，每次砍一半。

关键是“合并”，究竟是如何合并成有序的？

## 归并排序合并过程

那么这里以最后一步为例：`[4, 5, 7, 8]` 和`[1, 2, 3, 6]` 进行合并

1. **定义两个指针，第一个指向第一个有序数组的第一个元素；第二个指向第二个有序数组的第一个元素。****需要创建一个临时数组，临时数组的长度 = 两个数组长度之和**。两个有序数组的第一个元素进行比较，谁小，谁就放入到临时数组中，放入临时数组之后，对应的索引右移：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865015-3a417ed0-4901-4558-85fd-5fcf7a8f1a05.png)



1. 继续 i 和 j 对应的元素进行比较，4 和 2 比较，仍然是 2 比较小，将 2 放入到 temp 数组的第二个元素的位置。接下来 j 继续往右边移动：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865095-8fe44689-c98a-4ae6-a0c5-7df6d22db71d.png)



1. 继续 i 和 j 对应的元素进行比较，4 和 3 比较，仍然是 3 比较小，将 3 放入到 temp 数组的第三个元素的位置。接下来 j 继续往右边移动：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865128-ba32ae18-02c4-43d1-ac1d-3f5a6339cae7.png)



1. 继续 i 和 j 对应的元素进行比较，这一次就是 4 和 6 进行比较，这一次是 4 是比较小，将 4 放入到 temp 数组的第四个元素的位置，然后i 继续往右边移动：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865527-1777ec3e-48da-4c82-9f5a-b0361b273d57.png)



1. 继续 i 和 j 对应的元素进行比较，这一次是 5 和 6 进行比较，这一次是 5 是比较小，将 5 放入到 temp 数组的第五个元素的位置，i 继续往右边移动：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865539-0b9adf09-7c25-4067-8d5a-0148038eccb8.png)



1. 接下来继续上面的操作，这一次是 7 和 6 进行比较，6 比较小，将 6 放入到 temp 数组的第六个元素的位置，这一次应该是 j 往右边移动。但是这一次 j 已经无法往右边移动。说明这个有序数组所有的元素已经遍历结束。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865569-ac02c1c6-c18f-467d-8c15-961e342d82b6.png)



1. 接下来只需要将第一个有序数组的剩余元素，全部放入到 temp 数组里面即可：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865570-0b938f5a-c99f-46bf-a5e7-5ed5ee72dfcb.png)

1. **最后，再将 temp 这个临时数组里面所有的元素拷贝到原数组中，合并结束**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865623-13c58b57-6f0b-40fc-bc27-caa4197c550e.png)



## 归并排序代码实现

### 方式一（好理解，但性能不如方式二）

```javascript
// 这个方法负责拆分
function mergeSort(arr: number[]) {
  // 如果数组长度小于2，说明拆分完毕， 则直接返回
  if (arr.length < 2) {
    return arr
  }
  // 如果数组长度大于2，则将数组分为两部分
  const mid = arr.length >> 1
  // 将左侧部分接着拆分
  const left = mergeSort(arr.slice(0, mid))
  // 将右侧部分接着拆分
  const right = mergeSort(arr.slice(mid))
  // 拆分好了，将左侧和右侧部分合并，并返回合并好的数组
  return merge(left, right)
}

// 这个方法负责合并
function merge(left: number[], right: number[]) {
  // 创建一个空数组，用于存储合并后的结果
  let result = []
  // 创建两个指针，分别指向左侧和右侧数组的起始位置
  let leftIndex = 0
  let rightIndex = 0

  // 当两个指针都小于各自数组的长度时，比较两个指针所指向的元素，将较小的元素添加到结果数组中
  // 注意这里是小于，因为有一侧数组遍历完后还会进行加一，所以退出循环时index与length相等
  while(leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex++])
    } else {
      result.push(right[rightIndex++])
    }
  }

  // 来到这里说明左侧或者右侧的数组已经遍历完了，那么需要将另一部分数组中的数直接拼接到结果数组中
  // 如果左侧数组没有遍历完，则将左侧数组中剩余的数拼接到结果数组中
  if (leftIndex < left.length) {
    result = result.concat(left.slice(leftIndex))
  }
  // 如果右侧数组没有遍历完，则将右侧数组中剩余的数拼接到结果数组中
  if (rightIndex < right.length) {
    result = result.concat(right.slice(rightIndex))
  }
  // 返回合并好的数组
  return result
}

const arr = [38, 27, 43, 3, 9, 82, 10]
const sortedArr = mergeSort(arr)
console.log(sortedArr)
```

- concat与slice都会产生额外的空间开销

### 方式二

```typescript
function mergeSort(arr: number[]) {
  if (arr.length < 2) {
    return
  }
  // 开始排序
  process(arr, 0, arr.length - 1)
}

// 递归调用process方法，对数组进行排序
function process(arr: number[], L: number, R: number) {
  // 如果左边界等于右边界，说明数组只有一个元素，直接返回
  if (L === R) {
    return
  }
  // 如果左边界不等于右边界，说明数组有多个元素，需要进行排序
  const mid = L + ((R - L) >> 1)
  // 对左半部分进行排序
  process(arr, L, mid)
  // 对右半部分进行排序
  process(arr, mid + 1, R)
  // 合并左右两部分
  merge(arr, L, mid, R)
}

function merge(arr: number[], L: number, M: number, R: number) {
  // 创建一个辅助数组，用于存储合并后的结果
  const help = new Array(R - L + 1)
  let i = 0
  // 创建两个指针，分别指向左侧和右侧数组的起始位置
  let leftIndex = L
  let rightIndex = M + 1
  // 当两个指针都小于各自数组的长度时，比较两个指针所指向的元素，将较小的元素添加到结果数组中
  while (leftIndex <= M && rightIndex <= R) {
    help[i++] = arr[leftIndex] <= arr[rightIndex] ? arr[leftIndex++] : arr[rightIndex++]
  }

  // 如果左侧数组没有遍历完，则将左侧数组中剩余的数拼接到结果数组中
  while (leftIndex <= M) {
    help[i++] = arr[leftIndex++]
  }

  // 如果右侧数组没有遍历完，则将右侧数组中剩余的数拼接到结果数组中
  while (rightIndex <= R) {
    help[i++] = arr[rightIndex++]
  }

  // 将辅助数组中的元素复制回原数组
  for (let i = 0; i < help.length; i++) {
    arr[L + i] = help[i]
  }
}

const arr = [38, 27, 43, 3, 9, 82, 10]
mergeSort(arr)
console.log(arr)
```

- help数组创建时最好申请固定长度，免去额外的空间申请开销
- help[i++]方式要比help.push更好（即使申请了固定长度的空间）：

即使数组有足够空间，push() 仍然需要：

- 长度检查：检查当前长度是否小于容量
- 长度更新：更新数组的 length 属性
- 函数调用开销：调用 push 方法本身的开销

## 归并排序时间复杂度

归并排序使用了递归：

- 母问题的数据规模为N
- 子问题的数据规模为N/2
- 一轮子问题的调用次数为2
- 除了子问题调用，其他操作的时间复杂度为O(N)：因为需要对数组进行遍历进行合并

所以其对应的master公式为：**T(N) = 2\* T(N/2) + O(N)，所以a = 2 b = 2 d = 1**

**由于log**b**a = d，所以时间复杂度为O(N**d *** logN) = O(NlogN)**

时间复杂度也可以这样看：

- 分解过程通过递归将数组不断分成两版，直到每个子数组只有一个元素位置，因此分解层数是logn
- 合并过程是在每一层去遍历整个数组，因此每一层的合并操作为O(n)

因此总时间复杂度为O(nlogn)

## 归并排序的额外空间复杂度

由于每次在合并时申请长度为N的空间，合并完就被释放了。所以最多只需要N的空间。**额外空间复杂度为O(N)。**

## 归并排序的稳定性

归并排序是一种**稳定排序**。

如果遇到相等的元素，是优先将左边数组的元素放入临时数组。

```javascript
if (left[leftIndex] <= right[rightIndex]) {
  // 说明左边的元素更小
  // 将左边元素放入到临时数组里面
  result.push(left[leftIndex]);
  leftIndex++;
} else {
  // 说明右边元素更小
  // 将右边元素放入到临时数组里面
  result.push(right[rightIndex++]);
}
```

关键就是 `left[leftIndex] <= right[rightIndex]`，因此在左右数组元素相等的情况下，优先放入左边数组的元素。

假设修改一下 `left[leftIndex] < right[rightIndex]`，这么一改，就变成优先取右边数组的元素放入临时数组，就会导致不稳定。



## 对比选择排序、冒泡排序

选择排序与冒泡排序的时间复杂度为O(N2)，是因为**这两种排序算法浪费了大量的比较行为。**

- 它们在比较一轮后只能搞定一个数

而归并排序没有浪费大量的比较行为：

- 左侧部分有序、右侧部分也是有序的，左侧与右侧的去比，比较行为信息被保留了，变成了整体有序的部分，然后再由左侧更大部分的有序数组与右侧更大部分的有序数组去比
- 也就是说每次的比较行为变成了有序的部分，没有被浪费



## 归并排序题目扩展

### 小和问题

在一个数组中，每一个数左边比当前数小的数进行累加，叫做这个数组的小和。

比如，数组[1,3,4,2,5]：

- 比1小的数左侧没有，**对于1来说，小和为0**
- 比3小的数左侧为**1，对于3来说，小和为1**
- 比4小的数左侧为**1、3，对于4来说，小和为1+3=4**
- 比2小的数左侧为**1，对于2来说，小和为1**
- 比5小的数左侧为**1，3，4，2，对于5来说，小和为1 + 3 + 4 + 2 = 10**

那么整个数组的小和为`0 + 1 + 4 + 1 + 10 = 16`

这个问题当然可以通过暴力的方式来计算：从头到尾去遍历，每遍历一个数都要把其前面的数再遍历一遍。那么这种方式的时间复杂度是O(N2)**，有没有更好的方式呢？**

**解题关键就在于，转换一下思路：所谓求左边比这个数小的和，等同于在右边有多少个数比这个数大，那么就产生多少个这个数的小和，**还是拿[1,3,4,2,5]来看：

- 对于1来说，右侧有4个数比1大，那么产生的小和为4*1 = 4
- 对于3来说，右侧有2个数比3大，那么产生的小和为3*2=6
- 对于4来说，右侧有1个数比4大，那么产生的小和为4
- 对于2来说，右侧有有1个数比2大，那么产生的小和为2

所以整个数组的小和为 4 + 6 + 4 + 2 = 16，同看左侧比该数小的所求出来的是一样的。那么此时就可以将该问题转换为归并排序来求解了。

【注意】**为什么还需要通过排序来求解这道题呢？**

问题的关键转换成了，看右组有多少个数比左组这个数a大，就产生多少个这个关于a的小和。

所以只有经过排序才能快速通过O(1)的复杂度来计算出右组有多少个数比这个数大，比如

左组为：12346 右组为27889，比如要看右组有几个数比1大，正因为经过了排序，所以能够通过右组的下标来快速计算出有多少个数比1大，**右组的第一个数都比1大，所以肯定后面的数都比1大**。如果右组是乱序的，还需要去依次遍历。**所以排序过程是不能省的。**

还需要关注的一点是，和普通的归并排序不一样的一点是，**在进行合并的时候如果左组的这个数与右组的数相同的时候，一定要先拷贝右组的数，然后右组的索引向后移，因为只有这样才能知道右组到底有几个数比左组的这个数大：**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751212775129-6f967650-96aa-4b4c-a05f-677e18152d7f.png)

比如左组数为1 1 2 3 4，右组数为1 1 2 2 7 8，左侧1此时与右侧1相等。那么需要先将右侧1拷贝到数组中，然后右侧的指针向后移。然后左侧1与右侧1又相等了，接着将右侧1拷贝进去，指针后移。接着左侧1严格小于右侧2了，于是开始产生小和了，又因为数组是有序的，所以会得到右组有4个数比1大，此时产生4个1的小和。

然后将左侧1放入数组中，指针后移。移动后左侧为1，小于右侧的2，所以又会产生4个1的小和。

依次类推...

```typescript
function smallSum(arr: number[]) {
  // 就一个数，就没有啥可比的了，那么小和为0
  if (arr.length < 2) {
    return 0
  }
  return process(arr, 0, arr.length - 1)
}

function process(arr: number[], L: number, R: number) {
  if (L === R) {
    return 0
  }
  const mid = L + ((R - L) >> 1)
  // 左半部分的小和 + 右半部分的小和 + 合并时产生的小和
  return process(arr, L, mid) + process(arr, mid + 1, R) + merge(arr, L, mid, R)
}

function merge(arr: number[], L: number, M: number , R: number) {
  // 创建一个辅助数组，用于存储合并后的结果
  const help = new Array(R - L + 1)
  let i = 0
  // 记录小和
  let result = 0
  // 创建两个指针，分别指向左侧和右侧数组的起始位置
  let leftIndex = L
  let rightIndex = M + 1

  while(leftIndex <= M && rightIndex <= R) {
    // 如果左侧的数小于右侧的数，则计算小和
    // 小和的计算方式是：右侧数组中大于当前左侧数的个数 * 当前左侧数
    // 因为右侧数组是已经排序好的，所以大于当前左侧数的个数就是R - rightIndex + 1
    // 例如：左侧数为2，右侧数组为[3,4,5]，则产生的小和为2 * 3 = 6
    result += arr[leftIndex] < arr[rightIndex] ? (R - rightIndex + 1) * arr[leftIndex] : 0
    // 只有左组数严格小于右组数的时候才将左组数放入到help数组中，否则将右组数放入到help数组中
    help[i++] = arr[leftIndex] < arr[rightIndex] ? arr[leftIndex++] : arr[rightIndex++]
  }

  while(leftIndex <= M) {
    help[i++] = arr[leftIndex++]
  }

  while(rightIndex <= R) {
    help[i++] = arr[rightIndex++]
  }
  for(let i = 0; i < help.length; i++) {
    arr[L+i] = help[i]
  }
  return result
}

console.log(smallSum([1,3,4,2,5]))
```



### 逆序对问题

在一个数组中，左边的数如果比右边的数大， 则这两个数构成一个逆序对，打印所有的逆序对。

这道题的逻辑思路与小和问题一样，只不过小和问题求的是右边的数有多少比左边的数大，**逆序对求的是右边的数有多少比左边的数要小**

https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/description/

解题思路如图

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751257271127-0ec7b733-f64d-43e7-a7ab-da3fb416279b.png)

解题关键是：**将问题转换成，左边有多少数比右组当前的数要大，有几个就产生几个关于这个数的逆序对**

- **左组数按照从小到大的顺序排列**，分别通过索引从左组数的开头与右组数的开头去对比大小，如果右组的当前数比左组的当前数要小，那么说明目前左组有(mid - leftIndex + 1)个数比当前数要大（因为左组是按照从小到大的顺序排列的），也就是说会产生(mid - leftIndex + 1)个逆序对
- 对比完这轮后，将右组的这个比较小的数放到help中，再把左组较大的数依次放到help中

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751259416854-808ef09f-a0d5-4283-90dd-7ef2e5980f84.png)

- 绿色背景为递归merge与最终merge时产生的逆序对数量

```typescript
/**
 * 输入record = [9,7,5,4,6]
 * 输出 8
 * 解释：交易中的逆序对为(9,7),(9,5),(9,4),(9,6),(7,5),(7,4),(7,6),(5,4)
 */
function reversePairs(record: number[]): number {
  if (record.length < 2) {
    return 0
  }
  return process(record, 0, record.length-1)
}

function process(record: number[], L: number, R: number) {
  if (L === R) {
    return 0
  }
  const mid = L + ((R - L) >> 1)
  return process(record, L, mid) + process(record, mid+1, R) + merge(record, L, mid, R)
}

function merge(record: number[], L: number, M:number, R:number) {
  const help = new Array(R - L + 1)
  let i = 0
  let total = 0
  // 左组数最左侧索引
  let leftIndex = L
  // 右组数最左侧索引
  let rightIndex = M + 1

  while(leftIndex <= M && rightIndex <= R) {
    total +=  record[rightIndex] < record[leftIndex] ? (M - leftIndex + 1) : 0
    help[i++] = record[rightIndex] < record[leftIndex]   ? record[rightIndex++] : record[leftIndex++]
  }

  while(leftIndex <= M) {
    help[i++] = record[leftIndex++]
  }
  
  while(rightIndex <= R) {
    help[i++] = record[rightIndex++]
  }
  for(let i = 0; i < help.length; i++) {
    record[L+i] = help[i]
  }
  return total
}

console.log(reversePairs([9,7,5,4,6]))
```

# 5、快速排序 



快速排序（也叫划分交换排序）也是一种基于分治思想的排序算法：

- 将一个大数组分成两个小数组然后递归对两个小数组进行排序
- 排序过程中会选择一个**基准元素（pivot）（一般取第一个元素或者最后一个元素作为基准元素，****但最推荐随机选择，避免选择最大或最小元素****）**，将数组分成左右两个部分， 左边的元素都小于基准元素，右边的元素都大于基准元素
- 然后再对左右两部分分别递归调用快速排序，最终将整个数组排序完成

与归并排序不同的是，快速排序是边划分区域边进行排序，每个区域去选择一个基准元素来进行排序：比基准元素小的放在左边、比基准元素大的放在右边；再递归对以基准元素分割的左右两个区域进行排序...

## 核心思想

1. **选择基准元素**从数组中 **随机选择** 一个元素作为基准值（pivot）。
2. **分区操作**将数组中所有小于基准的元素移动到基准的左侧，大于基准的元素移动到右侧。这样，基准就处于它排序后应在的位置上。整个序列就变成了 `[比基准小的值] 基准值 [比基准大的值]`
3. **递归排序**对基准左右两边的子数组分别重复上述步骤，直到所有子数组都有序。

举个例子：

假设我们有 `[3, 5, 8, 1, 2, 9, 4, 7]` 这个序列，这里选择 4 来作为基准值

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751263091657-0da3a57b-a998-4044-b0d5-2ebce3bc6cee.png)

接下来从头到尾，把小于 4 的放到左边，大于 4 的放到右边，如下图所示：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751263091792-a9b93a85-27e8-4461-b682-205d8b2bf0c5.png)

接下来对基准值左边和右边进行相同的操作即可。

## 具体实现思路

实现 partition 方法的步骤如下：

1. 采用随机方式选择某个元素作为 pivot 基准值，然后与**最后一个元素进行交换，此时arr[right]为基准值pivot**。
2. 将less区域（比基准值小的）的右边界初始为left - 1，将more区域的左边界初始为right，也就是此时基准值的位置
3. 从 left 一直 **向后遍历：**如果`arr[left] < pivot`,那么让arr[left]与less区域边界的下一个数交换，less区域边界向右扩一位，left++；如果`arr[left]>pivot`，那么让arr[left]与more区域边界的前一个数进行交换，并让more区域边界向左扩一位；如果`arr[left] = pivot`则不进行交换操作，让left++即可
4. 重复第 3 步，直到 left 进入到more区域
5. 最后让left指向的数与pivot进行交换

下面是一个具体的图解：

（1）原始数组，left 一开始指向第一个元素，right 指向最后一个元素，最后一个元素是基准值

- less区域的边界值为left - 1
- more区域的边界值为right

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751269796641-d333e037-d43d-4efa-89c7-fc4a938a4a55.png)

（2）arr[left]与arr[right]也就是基准值进行对比，arr[left]小于基准值，此时，arr[left]与less的下一个数进行交换，也就是自己，然后less区域向右扩一位（less++），left向右继续移动（left++）

- **可以写成**`**swap(arr, ++less, left++)**`**，这样实现交换的同时又进行了++操作**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751269954602-69131b82-4ca8-448c-aaf9-491e5eeb0461.png)

（3）此时arr[left]为1比基准值5大，arr[left]与more区域边界的前一个数进行交换，也就是9，然后more区域向左扩一位

- 写为：`swap(arr, left, --more)`
- **需要注意，此时left不向右移动，因为left上的数发生了改变，需要继续拿这个位置上的数同基准值做对比**



![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270011775-da3c8ac5-8b9f-4ac4-ac7e-9f09260ab9a7.png)

（4）此时arr[left]为9比基准值大，重复（3）步骤



![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270200636-194f9bd7-7037-4b54-88a8-8a0b321dbfa1.png)

（5）接下来 arr[left]为5，与基准值相等，直接left++

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270358898-a773557e-922c-4947-8ff7-2178f27efa95.png)

（6）arr[left]为7比基准值大，重复（3）步骤

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270472231-1c4ddf65-3532-4d5b-b97c-7ec45634c62d.png)

（7）此时arr[left]比基准值要小，与less区域的下一个数也就是5进行交换，然后less区域扩一位，left向后走一位

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270993087-adf89866-fc23-40c2-86da-719479053adc.png)

（8）此时arr[left]为3比基准值小，与less区域的下一个数也就是5进行交换，然后less区域扩一位，left向后走一位

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751271077892-80d17bcb-a68b-407c-b671-c5bdb39a237e.png)

（9）此时left与more区域的左边界相等，说明已经完成了一轮遍历，退出循环，并将arr[right]与arr[more]进行交换

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751271155389-5eb02950-ec33-4a4b-a7b0-635e57215002.png)

然后走完一轮之后，基准值左边的元素都是比基准值小的，基准值右边的元素都是比基准值大的。

（10）**由于需要继续进行递归处理基准值左侧部分与右侧部分的数组，所以需要返回一个数组来告知接下来要处理的分界线在哪**。为什么要返回数组呢？如下图所示：

- 因为中间部分可能有多个与基准值相等的数，所以左半部分递归处理的数组区间为[**left, b0-1]**；右半部分递归处理的数组区间为[b1 + 1, right]

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751272656450-d34257e1-f434-4604-a930-f99ade69f9cf.png)

## 代码实现

```typescript
// 快速排序
function quickSort(arr: number[]) {
  if (arr.length < 2) {
    return
  }
  process(arr, 0, arr.length - 1)
}

function process(arr: number[], left: number, right: number) {
  if (left < right) {
    // 随机找打一个数，最为基准值，并放到数组的最后一个位置
    const randomIndex = left + Math.floor(Math.random() * (right - left + 1))
    swap(arr, randomIndex, right)

    // 开始进行分治处理
    const p = partition(arr, left, right)
    // 递归处理左半部分
    process(arr, left, p[0] - 1)
    // 递归处理右半你分
    process(arr, p[1] + 1, right)
  }
}

function partition(arr: number[], left: number, right: number) {
  // less区域用于存放小于基准值的数
  // less区域的右边界，初始为数组的最左侧-1的位置
  let less = left - 1
  // more区域的右边界大于基准值的数
  let more = right
  // 取数组最后一个位置的数作为基准值
  const pivot = arr[right]
  // left指针没有到达more区域时进行循环遍历
  while(left < more) {
    if(arr[left] < pivot) {
      // 小于基准值，则与less区域边界的下一个位置的数交换
      // 并且less区域向后扩一位，left指向下一个数
      swap(arr, ++less, left++)
    } else if (arr[left] > pivot) {
      // 比基准值大，那么与more区域左边界的前一个数进行交换
      // 并且more区域向左扩一位，left保持不变
      swap(arr, --more, left)
    } else {
      // 如果与基准值相等，那么直接向后移动
      left++
    }
  }
  // 来到这里，left与more的值相同
  // 接下来就需要交换right位置的基准值与more位置的数
  swap(arr, more, right)
  // 返回边界
  return [less + 1, more]
}

function swap(arr: number[], i: number, j: number) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const arr = [2,8,7,3,0,5,9,5]
quickSort(arr)
console.log(arr)
```

## 相关问题

### 问题一

给定一个数组arr，和一个数num，请把小于等于num的数放在数组的左边，大于num的数放在数组的右边。要求额外空间复杂度为O(1)，时间复杂度为O(N)

- 注意，没有要求左半部分与右半部分都是有序的

具体思路如下：

- 准备一个变量用来表示小于等于num区域A的右边界，一开始在数组的左侧
- 首先i指向数组的第一个位置，此时就分两种情况来处理

- 如果arr[i]等于num，那么就将区域的右边界的下一个数与当前数进行交换，并且区域A往后扩一个位置，i++
- 如果当前数大于num，那么就不进行交换，直接i++

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751261455760-d7641913-9180-44f7-ab71-6691fbf4ab85.png)

### 问题二（荷兰国旗问题）

给定一个数组arr，和一个数num，请把小于num的数放在数组的左边，等于num的数放在数组的中间，大于num的数放在数组的右边。要求额外空间复杂度为O(1)，时间复杂度为O(N)。

具体思路如下：

- 准备一个变量作为小于区域A的右边界，指向数组的最左侧
- 准备一个变量作为大于区域B的左边界，指向数组的最右侧
- arr[i] < num，那么将arr[i]与区域A右边界的下一个数交换，区域A向右扩一位，i++
- arr[i] = num，直接i++
- arr[i] > num，那么将arr[i]与区域B左边界的前一个数进行交换，区域B向左扩一位，i不变（**需要注意的是此时i不需要加一，因为交换后，arr[i]的数变了，需要继续做对比**）
- 直到i与B区域重合，停止遍历



## 时间复杂度

**最好情况： O(nlogn)**

当每次划分后，两部分的大小都相等，即基准元素恰好位于数组的中间位置，此时递归的深度为 O(log n)。

每一层需要进行 n 次比较，因此最好情况下的时间复杂度为 O(nlogn)。

**最坏情况：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

当每次划分后，其中一部分为空，即基准元素是数组中的最大或最小值，此时递归的深度为 O(n)。每一层需要进行 n 次比较，因此最坏情况下的时间复杂度为![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)。

**需要注意的是，采用三数取中法或随机选择基准元素可以有效避免最坏情况的发生。**



## 额外空间复杂度

快速排序的额外空间复杂度为O(logN)，这是最好的情况。

- 在基准数近似在中间位置的时候，递归栈空间最多是logN层

最坏情况的额外空间复杂度为O(N)。



# 6、堆排序



堆排序是堆排序是一种基于比较的排序算法，它的核心思想是使用二叉堆来维护一个有序序列。

二叉堆是一种完全二叉树，其中每个节点都满足父节点比子节点大（或小）的条件。

在堆排序中，我们使用最大堆来进行排序，也就是保证每个节点都比它的子节点大。

## 基本思路

1. 在堆排序中，先构建一个最大堆（从第一个非叶子节点开始进行下滤操作）。
2. 然后，我们将堆的根节点（也就是最大值）与堆的最后一个元素交换，这样最大值就被放在了正确的位置上
3.  接着，我们将堆的大小减小一，并将剩余的元素重新构建成一个最大堆。
4. 不断重复这个过程，直到堆的大小为 1。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1736064704875-60c322d9-caad-4fe7-a7db-97018d802838.png)

## 实现

1. 首先，将数组构建成堆

```typescript
function heapSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr

  const n = arr.length
  // 找到第一个非叶子节点
  const index = Math.floor(n/2 - 1)
  // 从第一个非叶子节点开始进行下滤操作
  for(let i = index; i >= 0; i--) {
    heapifyDown(arr, i, n)
  }

  return arr
}

// 下滤操作
/**
 * 
 * @param arr 需要下滤操作的数组
 * @param index 当前需要下滤的数据对应的索引
 * @param n 数组长度
 */
function heapifyDown(arr: number[], index: number, n: number) {
  // 下滤操作终止条件：该位置不存在左子节点时，因为存在左子节点就有可能存在右子节点，不存在左子节点就一定没有右子节点了
  while(2 * index + 1 < n) {
    // 找到两个子节点索引，并找到其中较大值
    const lIndex = 2 * index + 1
    const rIndex = lIndex + 1
    let largerIndex = lIndex
    // 右子节点存在的情况下如果比左子节点大，那么largerIndex变为右子节点的索引
    if (rIndex < n && arr[lIndex] < arr[rIndex]) {
      largerIndex = rIndex
    }
    if (arr[index] >= arr[largerIndex]) {
      break
    }
    swap(arr, largerIndex, index)
    index = largerIndex
  }

}
```

1. 构建完成后，此时数组第一项便是最大值，将其与最后一个位置的数据交换位置。然后再重新将前n-1个数据构建为堆，此时第一个数据不满足堆结构了，所以将第一个数据进行下滤操作即可。重复此操作直到还剩下一个元素即可。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1736077916436-cf71dd22-492a-441e-848d-ab7a663c1d90.png)

## 时间复杂度

步骤一：堆的建立过程堆的建立过程包括 n/2 次堆的向下调整操作，因此它的时间复杂度为 O(n)。

步骤二：排序过程排序过程需要执行 n 次堆的删除最大值操作，每次操作都需要将堆的最后一个元素与堆顶元素交换，然后向下  调整堆。

每次向下 调整操作的时间复杂度为 O(logn)，因此整个排序过程的时间复杂度为 O(n log n)。

综合起来，堆排序的时间复杂度为 O(nlogn)。