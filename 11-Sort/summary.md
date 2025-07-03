# 1、冒泡排序

## 基本思路

通过两两比较相邻的元素并交换它们的位置，从而是的整个序列按照顺序排列。

- 一趟排序后，最大值总会是会被移动到数组的最后面，那么接下来就不用再考虑这个最大值
- 一直重复这样的操作，最终就可以得到排序完成的数组

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735810226467-99203471-9c8a-4365-8c0a-849186ae0425.png)

所以可以通过双重循环来实现：

- 外层循环用来控制遍历次数，每次遍历后最大的元素会被放到正确的位置

- 如果数组长度为 n，那么需要进行 n-1 轮比较，比如数组长度为 5，每一轮比较后最大的一个数便会放到最后，那么就需要比较 4 轮。

- 内层循环用于比较和交换相邻的元素

- 由于比较时是第 i 位与第 i+1 位进行比较，所以 j 的最大值取到 n-1
- 由于每一轮两两比较后都有一个最大值会放到最后，所以两两比较的次数与循环的轮数有关，所以内层循环此时为 n-1-轮数

```typescript
function bubbleSort(arr: number[]): number[] {
  const n = arr.length
  // 表示进行的第几轮
  for (let i = 0; i < n; i++) {
    // 表示两两比较次数
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
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
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > arr[i + 1]) {
      return false
    }
  }
  return true
}

export function testSort(sortFun: SortFunType) {
  const arr = Array.from({ length: 10 }, () => {
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

- 两个数相同，异或为 0
- 两个数不同，异或为 1

异或运算还可以理解为**无进位相加\*\***，\*\*比如，二进制 10110 ^ 00111 = 10001

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751167629934-e8b80ad9-bad7-482a-92e6-79852ffbf53c.png)

- 也就是说可以理解为逐个位置相加，但是不进位，从右向左，0 + 1 = 1、1 + 1 = 0 但是不进位、1 + 1 = 0 不进位、0 + 0 = 0 、 1 + 0 = 1，所以得到 10001

### 异或运算的性质

- `**0 ^ N = N**`**（0 和任何一个数异或都是这个数）**
- `**N ^ N = 0**`**（任何一个数和自己异或结果是 0）**
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

为什么可以这样写呢？假设 arr[i]为 a、arr[j]为 b

- 执行 a = a ^ b，那么此时 a = a ^ b，b 没变
- 执行 b = a ^ b，由于此时 a 变成了 a ^ b，所以相当于 b = a ^ b ^ b，也就是 b = a ^ (b ^ b) 也就等于 a ^ 0，所以此时 b = a
- 执行第三行代码，此时 a 还是 a ^ b，而 b 变成了 a，所以相当于 a ^ b ^ a，也就是 a = (a ^ a) ^ b，所以就是 0 ^ b，结果就是 b 了

### 使用异或进行交换的注意事项

要确保两个交换的内容不指向同一块内存区域，如果和同一块内存区域的内容进行异或将被洗成 0！

### 关于异或的题目

#### 题目 1

在一个数组中，只有一个数出现了奇数次，其余数出现了偶数次，如何找到这个出现奇数次的数呢？

https://leetcode.cn/problems/single-number/description/

解题思路：

根据异或的特性：

- 如果两个数相同，异或得 0
- 0 与其他数异或都得这个数

又由于**异或运算顺序无所谓**，比如 这个数组是 1,2,3,2,3,1,1，先准备一个初始变量 0，那么就用这个变量和数组中的数从头异或到尾，最终异或结果相当于两个 2 先进行异或，然后两个 3 再进行异或，最后三个 1 进行异或，所以最终结果就是这个出现了奇数次的数

```typescript
function singleNumber(nums: number[]): number {
  let eor = 0
  for (const n of nums) {
    eor = eor ^ n
  }
  return eor
}
```

#### 题目 2

在一个数组中，两个数出现了奇数次，剩下的数出现了偶数次，那么如何找出这两个出现奇数次的数？

解题思路：

- 同题目 1 一样，也是要**先准备一个初始值为 0 的变量 r1，从头异或到尾**，由于其他数出现了偶数次，假设这两个数是 a 和 b,所以此时这个变量的结果肯定是 a ^ b
- 又由于这两个数是不同的（因为如果相同异或结果就是 0 了），所以异或结果不等于 0，**那么也就意味着 a ^ b 的结果至少有一位是 1**
- 那么假设第 8 位为 1，那么数组中的数就可以分为两大类：第 8 位为 1 与第 8 位不为 1 的
- **此时在准备一个初始为 0 的变量 r2，只与第 8 位为 1 或者第 8 位不为 1 的数进行异或，那么此时得到的结果要么是 a 要么是 b**
- 最后再让 r1 与 r2 进行异或即可得到另一个数

```typescript
function findNumber(arr: number[]) {
  let r1 = 0

  for (const n of arr) {
    r1 = n ^ r1
  }
  // 此时r1的结果为a ^ b
  // 由于r1非0 所以至少有一位是1
  // 找到最右侧的1
  let rightOneNumber = r1 & (~r1 + 1)

  let r2 = 0
  for (const n of arr) {
    if ((n & rightOneNumber) !== 0) {
      r2 = r2 ^ n
    }
  }
  const otherNumber = r1 ^ r2
  return [r2, otherNumber]
}

console.log(findNumber([1, 2, 3, 2, 3, 6]))
```

补充说明：

`r1 & (~r1 + 1)`是用来找到结果中最右侧的 1，比如结果为 1010111100，那么找到最右侧 1：0000000100

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751172168282-c32705b7-65ea-4a31-8352-c28749af7134.png)

所以让数组中的数与这个 rightOneNumber 做与运算，得到的结果要么是 0 要么是 rightOneNumber

## 总结

冒泡排序在最好的情况下，时间复杂度是 O(n)，即：待排序的序列已经是有序的，此时仅需要遍历一遍序列，不需要进行交换操作。

最坏的情况是![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg),即待排序的序列是逆序的，需要进行 n-1 轮，每一轮中需要进行 n-1-i 次比较和交换操作。

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

3. 重复执行步骤 1 和 2，直到所有元素都有序

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735869922816-044684e5-97df-4ac6-aa4c-fe0b6145bf73.png)

选择排序相比于冒泡排序来说在比较次数上是一样的，但是在交换次数上做了优化。

- 冒泡排序是两两比较进行交换
- 选择排序是一轮中一直对比后找到最大/最小的进行一次交换

## 实现

可以先考虑第一轮循环时找最小值的方式

- 第一轮循环最小值索引 minIndex = 0
- 然后从 index 为 1 的位置开始循环，循环到最后一个元素去和 index = 0 位置元素去对比，如果比它小那么就让 minIndex 等于该 index，循环完毕便找出了最小位置索引

```typescript
function selectionSort(arr: number[]) {
  //...
  const n = arr.length
  let minIndex = 0
  for (let j = 1; j < n; j++) {
    if (arr[j] < arr[minIndex]) {
      minIndex = j
    }
  }
  //...交换
}
```

这样第一个位置元素便是数组中的最小值，接下来就要从第二个位置处开始找到剩余元素中的最小值了，然后是从第三个位置处开始寻找，依次进行...**直到循环到倒数第二个元素位置（这里注意，不需要循环到最后一个元素，因为内层循环从 i+1 的位置开始比较，所以循环到倒数第二个元素就可以对整个数组完成排序了）**。

所以要有一个外层循环用来控制从哪个元素开始去寻找：

```typescript
function selectionSort(arr: number[]) {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    // minIndex改变时再去交换
    if (i !== minIndex) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
  return arr
}
```

- 外层循环控制每轮从哪个位置开始寻找，注意最后依次循环 i = n - 2 即可，因为内层循环对比是从 i + 1 的位置开始，所以 i = n -2 的时候即完成了倒数第二个元素和倒数第一个元素的对比。
- 内层循环用于去和该位置元素进行对比大小
- 可以加一个小优化，当 minIndex 与 i 不相等时再进行交换

## 时间复杂度

**最好情况时间复杂度：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

- 如果数组本身是有序的，时间复杂度也为![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)**，**只不过交换次数为 0

**最坏情况时间复杂度：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

- 数组本身是逆序的，交换次数是 n(n-1) / 2

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
  for (let i = 1; i < n; i++) {
    const newNum = arr[i]
    let j = i - 1
    // 从该元素的前一个元素开始依次向前去对比
    // 如果大于当前元素，那么向后移动，直到小于当前元素或者对比到了第一个元素为止
    while (arr[j] > newNum && j >= 0) {
      arr[j + 1] = arr[j]
      j--
    }
    // 在找到的比当前元素小的元素后面插入
    arr[j + 1] = newNum
  }
  return arr
}
```

### 方式二（较好理解）

外层循环与方式一一致，用来从第 1 个数开始进行循环比较，只不过内层循环不一样：

- 内层循环从 i-1 的位置开始往前查看，**依次比对比 i - 1 位置与 i 位置，如果 i-1 位置数比 i 位置大：**`arr[j] > arr[j + 1]`**则交换**
- 直到 j 越界（小于 0 了）或者 arr[j]不比 arr[j+1]大了停止

```typescript
function insertionSort2(arr: number[]): number[] {
  const n = arr.length
  for (let i = 1; i < n; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      swap(arr, j, j + 1)
    }
  }
  return arr
}
```

## 时间复杂度

插入排序和冒泡排序与选择排序不同，**插入排序的时间复杂度与数据状况有关，数据状况不同，时间复杂度表现不同：**

**最好情况：O(n)**

- 如果元素已经排好序，那么每个元素只需要比较一次就可以确定它的位置，因此比较次数为 n-1，移动次数为 0

**最坏情况：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

- 如果元素是倒序的，那么每个元素都需要比较和移动都是 i 次，其中 i 是元素在数组中的位置
- 因此此时比较次数为 n(n-1)/2（第 1 个元素不需要比较，第 2 个元素需要比较 1 次，第 3 个元素需要比较 2 次，...第 n 个元素需要比较 n-1 次），因此比较次数是 0 + 1 + 2 + 3... + (n-1)）移动次数也为 n(n-1)/2

如果数组部分有序，那么插入排序可以比冒泡和选择排序更快些。

虽然插入排序有最好情况的复杂度为 O(n)，但是整体时间复杂度要按最差的情况来估计，所以插入排序的整体复杂度也是![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)。

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

const arr = [1, 2, 3, 4, 5, 6, 7]
console.log(findMax(arr, 0, arr.length - 1))
```

**把递归函数的调用过程进行拆分得到下图：**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751187716094-c0d6e082-8a9e-4b81-b430-d5779ec9cf3c.png)

递归过程类似于一个多叉树，可以发现，**每个节点的结果依赖其下所有子点的结果：**

- f(0,6)先压入栈，然后它需要 f(0,3)和 f(4,6)，依次压栈
- 然后 f(0,3)需要 f(0,1)与 f(2,3)的结果，依次压入栈
- 依次类推，直到计算到最下面的节点返回结果后，然后将结果汇总之后，依次向上返回
- 此时 f(0,3)拿到了结果了，然后出栈
- 再继续去计算 f(4,6)，f(4,6)依赖 f(4,5)与 f(5,6)于是压栈进行计算，然后 f(4,5)需要 f(4,4)与 f(5,5)
- ......

### 递归行为时间复杂度估算

通过 master 公式来计算：

```
**T(N) = a \* T(N/b) + O(N^d)**
```

这个公式是什么意思呢？

- T(N)指的是，**母问题的数据量是 N**
- T(N/b)指的是**子问题的规模**，也就是说求母问题的过程，每次使用的子问题的规模是等量的，都是 N/b 的规模
- a 指的是**子问题的调用次数**
- O(N^d)指的是除去调用之外**剩下的过程的时间复杂度**

这样一类的递归都可以用 master 公式来求解时间复杂度

**在求解时间复杂度的时候\*\***只看一层调用行为\***\*细节即可。**

对于上面的函数来说：

- 母问题规模是 N
- 在调取子问题时都是等量的，规模都是 N/2
- 并且子问题调用了 2 次
- 除了调用过程外，其他过程的时间复杂度是 O(1)（直接返回、对比最大值，都是常数级别的）

所以对于上述函数来说，a=2 、b=2 、d = 0，它的 master 公式为：T(N) = 2 \* T(N/2) + O(1)

需要注意，要使用 master 公式求解，子问题规模必须是等量的。对于上述函数来说比如分了两个子问题，第一个子问题求的是数组三分之一长度中的最大值，第二个子问题求的是数组三分之二长度的子问题，两个子问题规模不一样，这样就不能用 master 公式了。

至此，a b d 的值就确定了，比如 T(N) = 2 \* T(N/2) + O(1)，那么它对应的时间复杂度是多少呢？计算方式如下：

- 如果 logba < d，那么时间复杂度为 O(Nd)
- 如果 logba > d，那么时间复杂度为 O(Nlogba)
- 如果 logba = d，那么时间复杂度为 O(Nd \* logN)

对于上述 master 公式为，因为 log22 = 1 > 0，所以它的时间复杂度为 O(N)，也就意味着它的时间复杂度等效与从左到右遍历一遍数组求最大值

## 归并排序核心思想

归并排序，英语 Merge Sort，这是一种基于 **分治法** 的排序算法。它的基本思想是**将一个大的数组分成若干个小的数组，\*\***直到每个小数组只有一个元素为止\***\*。然后再将这些小数组合并成一个有序的数组**。

归并排序工作流程：

1. **分割**：将原始数组分成两个部分，递归的将每一个部分的数组继续分割，直到每个部分只包含一个元素。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195864967-c0323484-7956-4163-a177-270fe71c6a78.png)

1. **合并**：将分割好的部分，两两合并，合并的时候保持顺序，最终合并成一个有序的数组。

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195864990-e8e1e190-5523-43b2-b9bd-9c5e06f52434.png)

“拆分”非常好理解，每次砍一半。

关键是“合并”，究竟是如何合并成有序的？

## 归并排序合并过程

那么这里以最后一步为例：`[4, 5, 7, 8]` 和`[1, 2, 3, 6]` 进行合并

1. **定义两个指针，第一个指向第一个有序数组的第一个元素；第二个指向第二个有序数组的第一个元素。\*\***需要创建一个临时数组，临时数组的长度 = 两个数组长度之和\*\*。两个有序数组的第一个元素进行比较，谁小，谁就放入到临时数组中，放入临时数组之后，对应的索引右移：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865015-3a417ed0-4901-4558-85fd-5fcf7a8f1a05.png)

1. 继续 i 和 j 对应的元素进行比较，4 和 2 比较，仍然是 2 比较小，将 2 放入到 temp 数组的第二个元素的位置。接下来 j 继续往右边移动：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865095-8fe44689-c98a-4ae6-a0c5-7df6d22db71d.png)

1. 继续 i 和 j 对应的元素进行比较，4 和 3 比较，仍然是 3 比较小，将 3 放入到 temp 数组的第三个元素的位置。接下来 j 继续往右边移动：

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751195865128-ba32ae18-02c4-43d1-ac1d-3f5a6339cae7.png)

1. 继续 i 和 j 对应的元素进行比较，这一次就是 4 和 6 进行比较，这一次是 4 是比较小，将 4 放入到 temp 数组的第四个元素的位置，然后 i 继续往右边移动：

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
  while (leftIndex < left.length && rightIndex < right.length) {
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

- concat 与 slice 都会产生额外的空间开销

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

- help 数组创建时最好申请固定长度，免去额外的空间申请开销
- help[i++]方式要比 help.push 更好（即使申请了固定长度的空间）：

即使数组有足够空间，push() 仍然需要：

- 长度检查：检查当前长度是否小于容量
- 长度更新：更新数组的 length 属性
- 函数调用开销：调用 push 方法本身的开销

## 归并排序时间复杂度

归并排序使用了递归：

- 母问题的数据规模为 N
- 子问题的数据规模为 N/2
- 一轮子问题的调用次数为 2
- 除了子问题调用，其他操作的时间复杂度为 O(N)：因为需要对数组进行遍历进行合并

所以其对应的 master 公式为：**T(N) = 2\* T(N/2) + O(N)，所以 a = 2 b = 2 d = 1**

**由于 log**b**a = d，所以时间复杂度为 O(N**d **\* logN) = O(NlogN)**

时间复杂度也可以这样看：

- 分解过程通过递归将数组不断分成两版，直到每个子数组只有一个元素位置，因此分解层数是 logn
- 合并过程是在每一层去遍历整个数组，因此每一层的合并操作为 O(n)

因此总时间复杂度为 O(nlogn)

## 归并排序的额外空间复杂度

由于每次在合并时申请长度为 N 的空间，合并完就被释放了。所以最多只需要 N 的空间。**额外空间复杂度为 O(N)。**

## 归并排序的稳定性

归并排序是一种**稳定排序**。

如果遇到相等的元素，是优先将左边数组的元素放入临时数组。

```javascript
if (left[leftIndex] <= right[rightIndex]) {
  // 说明左边的元素更小
  // 将左边元素放入到临时数组里面
  result.push(left[leftIndex])
  leftIndex++
} else {
  // 说明右边元素更小
  // 将右边元素放入到临时数组里面
  result.push(right[rightIndex++])
}
```

关键就是 `left[leftIndex] <= right[rightIndex]`，因此在左右数组元素相等的情况下，优先放入左边数组的元素。

假设修改一下 `left[leftIndex] < right[rightIndex]`，这么一改，就变成优先取右边数组的元素放入临时数组，就会导致不稳定。

## 对比选择排序、冒泡排序

选择排序与冒泡排序的时间复杂度为 O(N2)，是因为**这两种排序算法浪费了大量的比较行为。**

- 它们在比较一轮后只能搞定一个数

而归并排序没有浪费大量的比较行为：

- 左侧部分有序、右侧部分也是有序的，左侧与右侧的去比，比较行为信息被保留了，变成了整体有序的部分，然后再由左侧更大部分的有序数组与右侧更大部分的有序数组去比
- 也就是说每次的比较行为变成了有序的部分，没有被浪费

## 归并排序题目扩展

### 小和问题

在一个数组中，每一个数左边比当前数小的数进行累加，叫做这个数组的小和。

比如，数组[1,3,4,2,5]：

- 比 1 小的数左侧没有，**对于 1 来说，小和为 0**
- 比 3 小的数左侧为**1，对于 3 来说，小和为 1**
- 比 4 小的数左侧为**1、3，对于 4 来说，小和为 1+3=4**
- 比 2 小的数左侧为**1，对于 2 来说，小和为 1**
- 比 5 小的数左侧为**1，3，4，2，对于 5 来说，小和为 1 + 3 + 4 + 2 = 10**

那么整个数组的小和为`0 + 1 + 4 + 1 + 10 = 16`

这个问题当然可以通过暴力的方式来计算：从头到尾去遍历，每遍历一个数都要把其前面的数再遍历一遍。那么这种方式的时间复杂度是 O(N2)**，有没有更好的方式呢？**

**解题关键就在于，转换一下思路：所谓求左边比这个数小的和，等同于在右边有多少个数比这个数大，那么就产生多少个这个数的小和，**还是拿[1,3,4,2,5]来看：

- 对于 1 来说，右侧有 4 个数比 1 大，那么产生的小和为 4\*1 = 4
- 对于 3 来说，右侧有 2 个数比 3 大，那么产生的小和为 3\*2=6
- 对于 4 来说，右侧有 1 个数比 4 大，那么产生的小和为 4
- 对于 2 来说，右侧有有 1 个数比 2 大，那么产生的小和为 2

所以整个数组的小和为 4 + 6 + 4 + 2 = 16，同看左侧比该数小的所求出来的是一样的。那么此时就可以将该问题转换为归并排序来求解了。

【注意】**为什么还需要通过排序来求解这道题呢？**

问题的关键转换成了，看右组有多少个数比左组这个数 a 大，就产生多少个这个关于 a 的小和。

所以只有经过排序才能快速通过 O(1)的复杂度来计算出右组有多少个数比这个数大，比如

左组为：12346 右组为 27889，比如要看右组有几个数比 1 大，正因为经过了排序，所以能够通过右组的下标来快速计算出有多少个数比 1 大，**右组的第一个数都比 1 大，所以肯定后面的数都比 1 大**。如果右组是乱序的，还需要去依次遍历。**所以排序过程是不能省的。**

还需要关注的一点是，和普通的归并排序不一样的一点是，**在进行合并的时候如果左组的这个数与右组的数相同的时候，一定要先拷贝右组的数，然后右组的索引向后移，因为只有这样才能知道右组到底有几个数比左组的这个数大：**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751212775129-6f967650-96aa-4b4c-a05f-677e18152d7f.png)

比如左组数为 1 1 2 3 4，右组数为 1 1 2 2 7 8，左侧 1 此时与右侧 1 相等。那么需要先将右侧 1 拷贝到数组中，然后右侧的指针向后移。然后左侧 1 与右侧 1 又相等了，接着将右侧 1 拷贝进去，指针后移。接着左侧 1 严格小于右侧 2 了，于是开始产生小和了，又因为数组是有序的，所以会得到右组有 4 个数比 1 大，此时产生 4 个 1 的小和。

然后将左侧 1 放入数组中，指针后移。移动后左侧为 1，小于右侧的 2，所以又会产生 4 个 1 的小和。

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

function merge(arr: number[], L: number, M: number, R: number) {
  // 创建一个辅助数组，用于存储合并后的结果
  const help = new Array(R - L + 1)
  let i = 0
  // 记录小和
  let result = 0
  // 创建两个指针，分别指向左侧和右侧数组的起始位置
  let leftIndex = L
  let rightIndex = M + 1

  while (leftIndex <= M && rightIndex <= R) {
    // 如果左侧的数小于右侧的数，则计算小和
    // 小和的计算方式是：右侧数组中大于当前左侧数的个数 * 当前左侧数
    // 因为右侧数组是已经排序好的，所以大于当前左侧数的个数就是R - rightIndex + 1
    // 例如：左侧数为2，右侧数组为[3,4,5]，则产生的小和为2 * 3 = 6
    result += arr[leftIndex] < arr[rightIndex] ? (R - rightIndex + 1) * arr[leftIndex] : 0
    // 只有左组数严格小于右组数的时候才将左组数放入到help数组中，否则将右组数放入到help数组中
    help[i++] = arr[leftIndex] < arr[rightIndex] ? arr[leftIndex++] : arr[rightIndex++]
  }

  while (leftIndex <= M) {
    help[i++] = arr[leftIndex++]
  }

  while (rightIndex <= R) {
    help[i++] = arr[rightIndex++]
  }
  for (let i = 0; i < help.length; i++) {
    arr[L + i] = help[i]
  }
  return result
}

console.log(smallSum([1, 3, 4, 2, 5]))
```

### 逆序对问题

在一个数组中，左边的数如果比右边的数大， 则这两个数构成一个逆序对，打印所有的逆序对。

这道题的逻辑思路与小和问题一样，只不过小和问题求的是右边的数有多少比左边的数大，**逆序对求的是右边的数有多少比左边的数要小**

https://leetcode.cn/problems/shu-zu-zhong-de-ni-xu-dui-lcof/description/

解题思路如图

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751257271127-0ec7b733-f64d-43e7-a7ab-da3fb416279b.png)

解题关键是：**将问题转换成，左边有多少数比右组当前的数要大，有几个就产生几个关于这个数的逆序对**

- **左组数按照从小到大的顺序排列**，分别通过索引从左组数的开头与右组数的开头去对比大小，如果右组的当前数比左组的当前数要小，那么说明目前左组有(mid - leftIndex + 1)个数比当前数要大（因为左组是按照从小到大的顺序排列的），也就是说会产生(mid - leftIndex + 1)个逆序对
- 对比完这轮后，将右组的这个比较小的数放到 help 中，再把左组较大的数依次放到 help 中

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751259416854-808ef09f-a0d5-4283-90dd-7ef2e5980f84.png)

- 绿色背景为递归 merge 与最终 merge 时产生的逆序对数量

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
  return process(record, 0, record.length - 1)
}

function process(record: number[], L: number, R: number) {
  if (L === R) {
    return 0
  }
  const mid = L + ((R - L) >> 1)
  return process(record, L, mid) + process(record, mid + 1, R) + merge(record, L, mid, R)
}

function merge(record: number[], L: number, M: number, R: number) {
  const help = new Array(R - L + 1)
  let i = 0
  let total = 0
  // 左组数最左侧索引
  let leftIndex = L
  // 右组数最左侧索引
  let rightIndex = M + 1

  while (leftIndex <= M && rightIndex <= R) {
    total += record[rightIndex] < record[leftIndex] ? M - leftIndex + 1 : 0
    help[i++] = record[rightIndex] < record[leftIndex] ? record[rightIndex++] : record[leftIndex++]
  }

  while (leftIndex <= M) {
    help[i++] = record[leftIndex++]
  }

  while (rightIndex <= R) {
    help[i++] = record[rightIndex++]
  }
  for (let i = 0; i < help.length; i++) {
    record[L + i] = help[i]
  }
  return total
}

console.log(reversePairs([9, 7, 5, 4, 6]))
```

# 5、快速排序

快速排序（也叫划分交换排序）也是一种基于分治思想的排序算法：

- 将一个大数组分成两个小数组然后递归对两个小数组进行排序
- 排序过程中会选择一个**基准元素（pivot）（一般取第一个元素或者最后一个元素作为基准元素，\*\***但最推荐随机选择，避免选择最大或最小元素\***\*）**，将数组分成左右两个部分， 左边的元素都小于基准元素，右边的元素都大于基准元素
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

1. 采用随机方式选择某个元素作为 pivot 基准值，然后与**最后一个元素进行交换，此时 arr[right]为基准值 pivot**。
2. 将 less 区域（比基准值小的）的右边界初始为 left - 1，将 more 区域的左边界初始为 right，也就是此时基准值的位置
3. 从 left 一直 **向后遍历：**如果`arr[left] < pivot`,那么让 arr[left]与 less 区域边界的下一个数交换，less 区域边界向右扩一位，left++；如果`arr[left]>pivot`，那么让 arr[left]与 more 区域边界的前一个数进行交换，并让 more 区域边界向左扩一位；如果`arr[left] = pivot`则不进行交换操作，让 left++即可
4. 重复第 3 步，直到 left 进入到 more 区域
5. 最后让 left 指向的数与 pivot 进行交换

下面是一个具体的图解：

（1）原始数组，left 一开始指向第一个元素，right 指向最后一个元素，最后一个元素是基准值

- less 区域的边界值为 left - 1
- more 区域的边界值为 right

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751269796641-d333e037-d43d-4efa-89c7-fc4a938a4a55.png)

（2）arr[left]与 arr[right]也就是基准值进行对比，arr[left]小于基准值，此时，arr[left]与 less 的下一个数进行交换，也就是自己，然后 less 区域向右扩一位（less++），left 向右继续移动（left++）

- **可以写成**`**swap(arr, ++less, left++)**`**，这样实现交换的同时又进行了++操作**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751269954602-69131b82-4ca8-448c-aaf9-491e5eeb0461.png)

（3）此时 arr[left]为 1 比基准值 5 大，arr[left]与 more 区域边界的前一个数进行交换，也就是 9，然后 more 区域向左扩一位

- 写为：`swap(arr, left, --more)`
- **需要注意，此时 left 不向右移动，因为 left 上的数发生了改变，需要继续拿这个位置上的数同基准值做对比**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270011775-da3c8ac5-8b9f-4ac4-ac7e-9f09260ab9a7.png)

（4）此时 arr[left]为 9 比基准值大，重复（3）步骤

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270200636-194f9bd7-7037-4b54-88a8-8a0b321dbfa1.png)

（5）接下来 arr[left]为 5，与基准值相等，直接 left++

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270358898-a773557e-922c-4947-8ff7-2178f27efa95.png)

（6）arr[left]为 7 比基准值大，重复（3）步骤

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270472231-1c4ddf65-3532-4d5b-b97c-7ec45634c62d.png)

（7）此时 arr[left]比基准值要小，与 less 区域的下一个数也就是 5 进行交换，然后 less 区域扩一位，left 向后走一位

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751270993087-adf89866-fc23-40c2-86da-719479053adc.png)

（8）此时 arr[left]为 3 比基准值小，与 less 区域的下一个数也就是 5 进行交换，然后 less 区域扩一位，left 向后走一位

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751271077892-80d17bcb-a68b-407c-b671-c5bdb39a237e.png)

（9）此时 left 与 more 区域的左边界相等，说明已经完成了一轮遍历，退出循环，并将 arr[right]与 arr[more]进行交换

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751271155389-5eb02950-ec33-4a4b-a7b0-635e57215002.png)

然后走完一轮之后，基准值左边的元素都是比基准值小的，基准值右边的元素都是比基准值大的。

（10）**由于需要继续进行递归处理基准值左侧部分与右侧部分的数组，所以需要返回一个数组来告知接下来要处理的分界线在哪**。为什么要返回数组呢？如下图所示：

- 因为中间部分可能有多个与基准值相等的数，所以左半部分递归处理的数组区间为[**left, b0-1]\*\*；右半部分递归处理的数组区间为[b1 + 1, right]

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
  while (left < more) {
    if (arr[left] < pivot) {
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

const arr = [2, 8, 7, 3, 0, 5, 9, 5]
quickSort(arr)
console.log(arr)
```

## 相关问题

### 问题一

给定一个数组 arr，和一个数 num，请把小于等于 num 的数放在数组的左边，大于 num 的数放在数组的右边。要求额外空间复杂度为 O(1)，时间复杂度为 O(N)

- 注意，没有要求左半部分与右半部分都是有序的

具体思路如下：

- 准备一个变量用来表示小于等于 num 区域 A 的右边界，一开始在数组的左侧
- 首先 i 指向数组的第一个位置，此时就分两种情况来处理

- 如果 arr[i]等于 num，那么就将区域的右边界的下一个数与当前数进行交换，并且区域 A 往后扩一个位置，i++
- 如果当前数大于 num，那么就不进行交换，直接 i++

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751261455760-d7641913-9180-44f7-ab71-6691fbf4ab85.png)

### 问题二（荷兰国旗问题）

给定一个数组 arr，和一个数 num，请把小于 num 的数放在数组的左边，等于 num 的数放在数组的中间，大于 num 的数放在数组的右边。要求额外空间复杂度为 O(1)，时间复杂度为 O(N)。

具体思路如下：

- 准备一个变量作为小于区域 A 的右边界，指向数组的最左侧
- 准备一个变量作为大于区域 B 的左边界，指向数组的最右侧
- arr[i] < num，那么将 arr[i]与区域 A 右边界的下一个数交换，区域 A 向右扩一位，i++
- arr[i] = num，直接 i++
- arr[i] > num，那么将 arr[i]与区域 B 左边界的前一个数进行交换，区域 B 向左扩一位，i 不变（**需要注意的是此时 i 不需要加一，因为交换后，arr[i]的数变了，需要继续做对比**）
- 直到 i 与 B 区域重合，停止遍历

## 时间复杂度

**最好情况： O(nlogn)**

当每次划分后，两部分的大小都相等，即基准元素恰好位于数组的中间位置，此时递归的深度为 O(log n)。

每一层需要进行 n 次比较，因此最好情况下的时间复杂度为 O(nlogn)。

**最坏情况：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

当每次划分后，其中一部分为空，即基准元素是数组中的最大或最小值，此时递归的深度为 O(n)。每一层需要进行 n 次比较，因此最坏情况下的时间复杂度为![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)。

**需要注意的是，采用三数取中法或随机选择基准元素可以有效避免最坏情况的发生。**

## 额外空间复杂度

快速排序的额外空间复杂度为 O(logN)，这是最好的情况。

- 在基准数近似在中间位置的时候，递归栈空间最多是 logN 层

最坏情况的额外空间复杂度为 O(N)。

# 6、堆排序

## 堆结构

堆在逻辑上**是一个完全二叉树**结构

完全二叉树可以使用**连续的一段数组**来表示，那么就有了以下的规律：

- i 位置的左子节点所在的位置为 `2 * i + 1`
- i 位置的右子节点所在的位置为 `2 * i + 2`
- i 位置的父节点所在的位置为 `i - 1 /2`

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751281645697-3ded2af0-42db-4033-aaf0-f239729b4dcd.png)

## 堆的分类

堆是一种特殊的完全二叉树，分为大根堆和小根对

- **大根堆：每个节点为头的子树中的最大值就是这个头节点**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751281149733-2559b399-cd97-411b-986d-51e1b4e788d2.png)

- **小根堆，每个节点为头的子树中的最小值就是这个头节点**

## heapinsert-如何将数组变成堆

比如提供一个方法，将传递进来的数依次放入数组中，并让该数组满足大根堆的特性。（这个过程称为`**heapInsert**`）

1. 初始状态下声明一个数组用于存放传入的数据，heapsize = 0
2. 先进来了一个 5，首先将其放入第一个位置，heapsize=1

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751283377264-545f63c9-574d-459d-924c-65ff20667982.png)

1. 进来了一个 3，将其放入第二个位置，heapsize=2，此时仍满足大根堆特性

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751283405452-8a68de2d-6ae0-43e5-a432-6ec899e4ef10.png)

1. 进来了一个 6，放入数组第三个位置，heapsize=3

- 此时不满足大根堆的特性了，将 6 与其父节点开始交换
- 交换后满足了大根堆特性

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751283457204-a63d7b87-1d77-45fe-ad2a-0aee5f3074ce.png)

1. 进来了一个 7，放入第四个位置，heapsize=4

- 此时不满足大根堆特性了，与其父节点 i - 1 / 2 = 1 的位置进行交换

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751283558027-006b3102-79b6-46aa-b630-81ae6d8bf81e.png)

- 交换后仍然不满足大根堆，与其父节点 0 位置开始进行交换

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751283628797-bfc55d4c-8d4d-4e70-858c-1cb0c9f877c5.png)

1. 又进来一个 7，放入数组第 5 个位置

- 此时不满足大根堆了，将其与父节点 1 位置开始进行交换
- 交换后由于 7 与现在的父节点的值相同，停止交换

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751283682610-c96cf7fd-31ac-4d38-897f-daa13feef99c.png)

至此，就讲传入的数转换成了大根堆

总得来说，就是需要将传入的数不断与其父节点进行比较

- 如果比父节点大则进行交换
- 如果比父节点小或者相等则不进行交换
- 如果没有父节点了也停止交换

```typescript
const heapArr = []
let heapSize = 0
function heapInsert(value: number) {
  // 要插入的位置
  let index = heapSize
  // 先插入到最后
  heapArr[index] = value
  // 如果插入的值比父节点大，则交换，直到比不比父节点大或者到根节点为止
  while (index > 0 && heapArr[index] > heapArr[(index - 1) >> 1]) {
    swap(index, (index - 1) >> 1)
    index = (index - 1) >> 1
  }
  heapSize++
}

function swap(i: number, j: number) {
  const temp = heapArr[i]
  heapArr[i] = heapArr[j]
  heapArr[j] = temp
}

heapInsert(5)
heapInsert(3)
heapInsert(6)
heapInsert(7)
heapInsert(7)
console.log(heapArr)
```

## heapify

现在已经可以在接收传入数组的数字后将数组变成大根堆了。

那么现在又有个需求：删除数组中最大的数，也就是大根堆的根节点，删除后，让数组仍然维持大根堆的特性，如何做呢？

具体流程为：

- 首先拿一个变量**记录一下需要移除的根节点**
- 把数组中最后一个位置的数拷贝一下放入到根节点的位置
- `heapsize--`，此时由于 heapsize 减少了 1，等同于原来数组中的最后一个位置不算做堆中的内容了
- 由于将最后一个位置的数放在了头节点的位置会导致可能此时就不满足大根堆的特性了，所以需要进行`**heapify**`：

- 从头节点的位置开始，从其左子节点与右子节点中选取一个最大值，拿头节点的值与这个最大值对比，如果比这个子节点的最大值要大则保持不动；如果比这个最大值小，那么让这个子节点与其进行交换
- 交换后，继续去和这个位置的左子节点和右子节点中的最大值去对比，直到没有子节点或者该值比子节点中的最大值要大位置

- 往下移动的过程称为`**heapify**`

以下代码是 heapify 过程：

```typescript
/**
 *
 * @param arr
 * @param index 从index开始，往下看，不断的下沉
 * @param heapSize 堆的大小，用来找子节点的时候，判断是否越界
 */
function heapify(arr: number[], index: number, heapSize: number) {
  // 找到其左子节点
  let left = index * 2 + 1

  // left < heapSize说明还有子节点，继续进行heapify操作
  while (left < heapSize) {
    // 两个子节点中找到最大值
    const right = left + 1

    // 如果有右节点且右节点比左节点大那么最大值索引为由节点的否则为左节点的
    let largest = right < heapSize && arr[right] > arr[left] ? right : left

    // 对比此时的largest与index位置节点哪个大
    largest = arr[largest] < arr[index] ? index : largest

    // 如果最大值为当前位置，说明不需要继续heapify了，跳出循环
    if (largest === index) {
      break
    }

    // 交换
    swap(arr, largest, index)
    // 将索引值变更为下沉后的索引位置，继续进行
    index = largest
    left = index * 2 + 1
  }
}

function swap(arr: number[], i: number, j: number) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const heapifyArr = [6, 7, 5, 3]
heapify(heapifyArr, 0, 4)
console.log(heapifyArr)
```

- 这里传入的 heapSize，就是用来判断越不越界的
- 之所以还需要传递 index，是因为可以从任何一个位置开始进行 heapify，不一定就是从头节点的位置开始
- `left < heapSize`来判断是否还有子节点，如果存在左子节点则继续 heapify，如果左子节点越界了说明也没有右子节点了

## 堆结构中某一位置的数值变了怎么办

了解`heapInsert`与`heapify`流程后，再来思考一个问题：**如果此时修改了某一位置节点的数值怎么办？**

**修改数值无非两种情况：变大了或变小了，所以需要考虑两种情况：**

- **如果变大了，那么就让该节点往上去 heapInsert（不断与其父节点进行对比大小，直到不比父节点大或没有父节点为止）**
- **如果变小了，那么就让该节点往下去 heapify 即可**

## 堆排序

### 基本思路

1. 首先**将数组构建成一个大根堆**：等同于从数组中一个一个拿数据去进行 heapInsert
2. 此时头节点也就是数组第 0 个位置上的数是最大值，**此时让第 0 个位置上的数与数组最后一个位置上的数进行交换**
3. **把 heapSize--**，也就是让最后一个位置和堆断掉联系，因为此时最大值已经来到了正确的位置，接下来需要的是找其他位置的最大值，就没必要再看这个最大值了
4. **此时让 0 位置上的数向下进行**`**heapify**`，把堆再次构建成大根堆
5. 然后重复 2、3、4 步骤，直到 heapSize 为 1 为止

### 代码实现

```typescript
function heapSort(arr: number[]) {
  if (arr.length < 2) {
    return arr
  }
  // 当前最大堆的heapSize，用于判断接下来的操作是否越界
  let heapSize = arr.length
  // 遍历数组，对数组中的每一个元素进行heapInsert操作，让数组始终满足最大堆（大根堆）
  for (let i = 0; i < arr.length; i++) {
    // O(N
    // 从i位置开始进行heapInsert
    heapInsert(arr, i) // O(logN)
  }
  // 将最大节点与最后一个元素进行交换，并且heapSize减1
  // --heapSize：先将heapSize减1，也正好是最后一个节点的索引
  swap(arr, 0, --heapSize)

  while (heapSize > 1) {
    // O(N)
    // 将此时的头节点进行向下对比，继续构成大根堆
    heapify(arr, 0, heapSize) // O(logN)
    // 再次进行交换
    swap(arr, 0, --heapSize) // O(1)
  }
}

function heapInsert(arr: number[], i: number) {
  // 如果当前元素的值比父节点的大，那么交换
  while (i > 0 && arr[i] > arr[(i - 1) >> 1]) {
    swap(arr, i, (i - 1) >> 1)
    i = (i - 1) >> 1
  }
}

function heapify(arr: number[], index: number, heapSize: number) {
  // 该节点的左子节点
  let left = index * 2 + 1
  // 有子节点就进行对比
  while (left < heapSize) {
    const right = left + 1

    // 取出子节点中较大值的索引
    let largest = right < heapSize && arr[right] > arr[left] ? right : left

    // 对比子节点与父节点，去除最大值的索引
    largest = arr[index] > arr[largest] ? index : largest

    // 当前节点已经是其中的最大值了，就直接跳出
    if (largest === index) {
      break
    }
    // 否则进行交换，并更新index位置
    swap(arr, index, largest)
    index = largest
    // 别忘了更新子节点索引
    left = index * 2 + 1
  }
}

function swap(arr: number[], i: number, j: number) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const arr = [3, 5, 6, 7, 7]
heapSort(arr)
console.log(arr)
```

### 优化

上述的代码实现是将数组中的数挨个遍历去构建大根堆的，能否直接将数组不通过遍历的方式整体变成大根堆呢？

**那么此时就可以从堆结构的叶子节点开始（也就是数组从右向左），依次做 heapify：**

以满二叉树为例：

- 由于叶子节点没有可以对比大小的子节点，所以对于叶子节点来说就相当于只看了一眼

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751364765526-7969eb71-1dc3-4663-a006-c2d21d23eaaa.png)

- 对于倒数第二层子节点来说，其中的每个节点都有两个子节点，且下面子节点高度 1，所以最多每个节点交换 1 次

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751364842799-1429d8fa-470e-44f3-b860-c3a566f5be8a.png)

- 对于倒数第三层子节点来说，其中的每个节点都有 2 个子节点，且高度为 2，所以最多每个节点交换 2 次

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751364929911-556b967a-b278-4248-a69e-c60ef1277579.png)

- 最后再让根节点进行 heapify 即可

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751365064299-1c25dcef-d032-4a88-9fbe-e12f7a2031a8.png)

为什么这样更好呢？

- 其次以满二叉树为例，如果节点数量为 N，那么叶子节点基本上有 N/2 个
- N/2 个叶子节点不需要往下 heapify，只是读取一下，所以对于这个操作来说复杂度为`N/2 * 1`
- 倒数第二层节点为 N/4 个，每个节点需要读取一下并且最多移动一步，所以对应的时间复杂度为`N/4 * 2`
- 倒数第三层节点为 N/8 个，每个节点读取一下+最多移动两步，所以对应的时间复杂度为`N/8 * 3`
- 依次类推，整体的时间复杂度 = N/2 + N/4 _ 2 + N/8 _ 3 + N/16 _ 4 + N/32 _ 5...

这个复杂度如何估算呢？

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751365944411-03cb2f67-971b-4162-aeda-2661a6379819.png)

两边乘 2 再相减，通过等比数列求和公式最后算得时间复杂度为 O(N)

```typescript
function heapSort(arr: number[]) {
  if (arr.length < 2) {
    return arr
  }
  // 当前最大堆的heapSize，用于判断接下来的操作是否越界
  let heapSize = arr.length
  // 遍历数组，对数组中的每一个元素进行heapInsert操作，让数组始终满足最大堆（大根堆）
  // for(let i = 0; i < arr.length; i++) { // O(N
  //   // 从i位置开始进行heapInsert
  //   heapInsert(arr, i) // O(logN)
  // }

  for (let i = arr.length - 1; i >= 0; i--) {
    heapify(arr, i, heapSize)
  }
  //...省略
}
```

也可以直接从第一个非叶子节点开始进行 heapify

- 第一个非叶子节点的索引位置为`节点数量/2 - 1`

```typescript
for (let i = (arr.length >> 1) - 1; i >= 0; i--) {
  heapify(arr, i, heapSize)
}
```

### 时间复杂度

步骤一：堆的建立过程时间复杂度为 O(n)。

步骤二：排序过程排序过程需要执行 n 次堆的删除最大值操作，每次操作都需要将堆的最后一个元素与堆顶元素交换，然后向下 调整堆。

每次向下 调整操作的时间复杂度为 O(logn)，因此整个排序过程的时间复杂度为 O(n log n)。

综合起来，堆排序的时间复杂度为 O(nlogn)。

### 额外空间复杂度

O(1)，只需要有限的几个变量就可以完成

## 堆排序扩展题目

已知一个几乎有序的数组，几乎有序是指如果把数组顺序排好的话，每个元素移动的距离不超过 K，并且 K 相对于整个数组来说比较小，请选择一个合适的排序算法来对这个数组进行排序。

此时就可以考虑使用堆排序。

假设 K = 3

- 准备一个小根堆
- 先遍历前 4 个(k+1)数字，也就是索引位置为 0-3 的数字，将这 4 个数字构建成小根堆（最小堆）。
- 此时小根堆的最小值一定在堆顶了
- **因为最大的移动距离为 3，所以索引位置为 4 以及 4 后面的数不可能有最小值**
- 此时将小根堆的最小值放到数组的第一个位置上
- 然后再取出数组中第五个位置的数字放入到小根堆的堆顶上，再进行小根堆的构建，然后再将第 0 个位置的数放到数组的第二个位置上。再从数组中取出第六个位置上的数放到小根堆堆顶，再次进行构建，依次类推...
- 直到数组中的数全都放进了小根堆中，然后循环对没有处理完毕的小根堆进行遍历，先将堆顶元素赋值到数组对应位置上，然后将最后一个节点赋值到堆顶，再将堆中最后一个节点弹出，然后对这些节点进行 heapify。直到堆的长度为 0 结束。

**这个算法的时间复杂度为 O(N\*logK),又已知 K 很小，所以整体复杂度接近 O(N)**

1. 比如有如下数组【3,1,4,2,7,6,5】，最大移动距离为 3，那么首先把前 4 个数构建成小根堆（最小堆）

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751448500119-4f97e397-b02e-4323-b1ee-98265233c6e5.png)

1. 此时最小值一定是头节点了，在小根堆中将头节点赋值到数组第一个位置上，然后将第 5 个位置的数赋值给堆顶，重新构建成小根堆。此时完成了第一个数字的排序

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751448514734-67e33b66-5979-4ffc-8165-64bbf29d06da.png)

1. 然后重复第二步的操作，将现在的堆顶元素赋值给数组的第 2 个位置，再将第 6 个位置上的数放入到小根堆中进行构建。此时完成了第二个数字的排序

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751448619469-5d28fe8e-f4c7-4e6f-960b-5aab9e80fecd.png)

1. 重复步骤 2

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751448698765-860fb9c3-4974-4515-b092-c0e36088624a.png)

1. 此时数组中的元素都放入到了堆中进行处理了。接下来就是循环对堆进行操作，首先将头节点赋值给数组对应位置的节点。再将最后一个节点赋值到头节点位置，再弹出此时的最后一个位置的节点。然后堆剩余的节点进行 heapify。直到 heap 中节点数量为 0 为止

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751448728271-53e528e6-098e-4a4c-8123-11cb014fdd02.png)

```typescript
function sortedArrDistanceLessK(arr: number[], k: number) {
  if (k === 0 || arr.length < 2) {
    return
  }
  const heapSize = Math.min(arr.length, k + 1)
  const heap = new Array(heapSize)
  for (let i = 0; i < heapSize; i++) {
    heap[i] = arr[i]
  }
  // 构建成最小堆，此时前K + 1个数的最小值也就是整个数组的最小值就在堆顶
  buildMinHeap(heap)

  // 排好序的索引
  let sortedIndex = 0
  // 处理K+1 到 arr.length 的数
  for (let i = k + 1; i < arr.length; i++) {
    // 取出堆顶的元素放入到对应位置
    arr[sortedIndex++] = heap[0]
    // 将新元素放入堆中
    heap[0] = arr[i]
    // 重新heapify
    heapify(heap, 0, heapSize)
  }

  while (heap.length > 0) {
    arr[sortedIndex++] = heap[0]
    heap[0] = heap[heap.length - 1]
    heap.pop()
    if (heap.length > 0) {
      heapify(heap, 0, heap.length)
    }
  }
}

function buildMinHeap(arr: number[]) {
  // 从第一个非叶子节点开始进行heapify，构建成最小堆
  for (let i = (arr.length >> 1) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length)
  }
}

function heapify(arr: number[], index: number, heapSize: number) {
  let left = index * 2 + 1
  while (left < heapSize) {
    const right = left + 1
    let minimum = right < heapSize && arr[right] < arr[left] ? right : left
    minimum = arr[index] < arr[minimum] ? index : minimum
    if (minimum === index) {
      break
    }
    swap(arr, index, minimum)
    // 此时交换了位置，由于大的数跑到了下面，可能此时它的子节点有更小的，所以继续对比
    index = minimum
    left = index * 2 + 1
  }
}

function swap(arr: number[], i: number, j: number) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const arr = [3, 1, 4, 2, 6, 7, 5]
sortedArrDistanceLessK(arr, 3)
console.log(arr)
```

补充说明：优先级队列结构，就是堆结构（堆顶就是优先级最大的那个）

# 7、基数排序

前面的排序都和怎么比较两个数大小有关，都是基于比较的。

排序还有不基于比较的排序，比如**基数排序**。

# 具体思路

比如数组为【17,13,25,100,72】

1. 首先按照十进制来看最大的数字有几位，有 3 位
2. 把长度不够 3 位的数字的左侧用 0 来补齐，变成【017，013，025，100，72】
3. **准备 10 个队列**作为桶，编号 0-9，遍历数组，先根据个位来将数字放入到对应编号的桶中，然后再从左到右从桶中依次取出放入到数组中

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751450971991-2a61d2bf-11b2-46dc-ab30-c61b386c0f2c.png)

1. 再将数组中的数按照十位上的数依次放入桶中，然后再从桶中倒出来放入到数组中，桶中的数先进先出

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751451372028-3d70b7c3-e19b-4895-aeaf-c0c97a7f8c8a.png)

1. 最后将数组中的数按照百位上的数依次放入桶中，然后再从桶中倒出放入到数组中，即可完成排序

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751451532186-02007d05-df58-427c-9475-017a4b702038.png)

# 代码实现

## 实现流程

1. 首先依次获取数组中的数的个位，准备好一个 count 数组（最长是 10，因为每一位的数字只能在 0-9 这个范围），按照个位的数字进行统计，**通过**`**count[数字]++**`**统计好每个数字对应的数量有多少个**
2. 再从索引为 1 的位置遍历 count 数组将对应对应位置上的数与前一个位置上的数相加，**比如计算出 count[2] = 5，也就是说小于等于 2 的数一共有 5 个**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751508786758-f933ffcc-d06d-4fc2-a78f-bdf94a8453d8.png)

1. 准备好一个 bucket 辅助数组，与原数组等规模，再对原数组**从右向左遍历**，取出对应位的数字，然后去 count 数组中取出对应数字所对应的个数，然后按照`bucket[count[数字]-1]=arr[i]`的方式将元素依次放入到 bucket 数组中，再将 count 数组中对应数字的计数减少 1，`count[数字]--`

- 为什么从右向左遍历呢？比如遍历到了 62，然后通过 count 数组`count[2]`看到**小于等于 2 的有 5 个**。根据**先入桶先出桶**来说，由于 62 在数组靠后的位置，所以从右向左遍历就知道 62 应该放到`bucket[4]`上了
- **通过 count 数组的计数就相当于对原数组进行了分片处理，根据 count 数组对应数字的计数可以将原数组中的数根据划分的片放到 bucket 辅助数组中，这就相当于完成了一次入桶出桶**

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1751509038900-92188c24-f855-4773-b170-8bf6f2242f05.png)

1. 依次类推，再根据十位、百位对数字按照流程 3 来处理即可

- **数组中最大数字有多少位，就要进行几次入桶出桶**

## 代码

```typescript
function radixSort(arr: number[]) {
  if (arr.length < 2) {
    return arr
  }

  // 取出数组中的最大值
  const max = getMax(arr)
  // 取出最大值的位数
  const maxDigit = getDigit(max)
  // 十个空间
  const radix = 10

  // 准备一个辅助空间与原数组等规模，用于存放取出来的数
  const bucket = new Array(arr.length)
  let digit
  // 最大值有几位就要进行几次入桶出桶
  for (let d = 1; d <= maxDigit; d++) {
    // 准备一个数组，用来存放某一位小于等于i的数量
    // count[0] 当前d位是0的数字有多少个
    // count[1] 当前d位小于等于1的数字有多少个
    // count[2] 当前d位小于等于2的数字有多少个
    const count = new Array(10).fill(0)
    // 遍历数组中的数，获取d位上的数，进行计数
    // count[对应数字]++
    for (let i = 0; i < arr.length; i++) {
      digit = getDigitNumber(arr[i], d)
      count[digit]++
    }
    // 累加，将count处理成前缀和
    for (let i = 1; i < radix; i++) {
      count[i] = count[i] + count[i - 1]
    }

    // 从右向左取出放入辅助空间中
    for (let i = arr.length - 1; i >= 0; i--) {
      digit = getDigitNumber(arr[i], d)
      // 将数组中的数放到辅助数组对应位置上
      bucket[count[digit] - 1] = arr[i]
      count[digit]--
    }
    // 再将处理完毕后的bucket中的数放到原数组中
    // 相当于维持了此次处理结果，然后再进行下一轮
    for (let i = 0; i < bucket.length; i++) {
      arr[i] = bucket[i]
    }
  }
  return arr
}

function getMax(arr: number[]) {
  let max = Number.MIN_VALUE
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}
function getDigit(num: number) {
  let digit = 0
  while (num > 0) {
    digit++
    num = Math.floor(num / 10)
  }
  return digit
}
function getDigitNumber(num: number, digit: number) {
  return Math.floor((num / Math.pow(10, digit - 1)) % 10)
}
const arr = [12, 123, 32, 8, 24]
radixSort(arr)
console.log(arr)
```
