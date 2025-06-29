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

归并排序进本思想是将待排序的数组分成若干个子数组，然后将相邻的子数组归并成一个有序数组，最后再将这些有序数组归并成一个整体有序的数组。

## 基本思路

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735887324618-71d87386-138a-4780-beab-8c43935224ed.png)

归并排序是一种基于分治思想的排序算法，其基本思路可以分为三个步骤：

1. 分解

1. 如果待排序数组长度为1，认为这个数组已经有序直接返回
2. 否则，将待排序数组分成两个子数组，分别对这两个子数组进行递归分解，直到数组长度为1

1. 合并：比较两个子数组中的元素大小并合并成一个新数组

1. 可以设置两个指针，分别指向两个子数组的开始位置，比较它们的大小放入到有序数组中。较小数据的数组指针+1，较大数据数组指针不变，然后循环比较。
2. 如果其中一个子数组已经遍历完成，就将另一个数组剩余部分直接插入到有序数组中即可
3. 最后返回这个有序数组

![img](https://cdn.nlark.com/yuque/0/2025/gif/22253064/1735890119446-0551954c-78ea-47be-aaaf-619ee05570a4.gif)

## 实现

```typescript
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr
  }
  // 找到中间位置进行分割
  const mid = Math.floor(arr.length / 2)
  const leftArr = arr.slice(0, mid)
  const rightArr = arr.slice(mid)

  // 进行递归分割
  const newLeftArr = mergeSort(leftArr)
  const newRightArr = mergeSort(rightArr)

  // 声明一个新的数组存放排好序的数据
  const newArr: number[] = []
  // 进行合并排序
  let i = 0
  let j = 0
  while (i < newLeftArr.length && j < newRightArr.length) {
    if (newLeftArr[i] <= newRightArr[j]) {
      newArr.push(newLeftArr[i])
      i++
    } else {
      newArr.push(newRightArr[j])
      j++
    }
  }
  // 将剩余的数据放入新数组中
  if (i < newLeftArr.length) {
    newArr.push(...newLeftArr.slice(i))
  } 
  if (j < newRightArr.length) {
    newArr.push(...newRightArr.slice(j))
  }
  // 将合并后的数组进行返回
  return newArr
}
```

以`[7, 3, 2, 16, 24, 4, 11, 9]`为例，在归并排序中的执行过程如下：

**第一次分割**

- 数组被分割为`[7,3,2,16]`和`[24,4,11,9]`

```typescript
const leftArr = [7, 3, 2, 16]
const rightArr = [24, 4, 11, 9]
```

**递归分割左半部分[7,3,2,16]**

- 数组被分为[7,3]和[2,16]

```typescript
const newLeftArr = mergeSort([7,3])
const newRightArr = mergeSort([2,16])
```

**递归分割[7,3]**

被分割为[7]和[3]，由于此时数组长度为1，所以直接被返回

```typescript
const newLeftArr = mergeSort([7]) // 返回[7]
const newRightArr = mergeSort([3]) // 返回[3]
```

**合并[7]和[3]**

得到新数组newArr = [3, 7]并返回

**递归分割[2,16]**

被分割为[2]和[16]，由于此时数组长度为1，所以直接被返回

```typescript
const newLeftArr = mergeSort([2]) // 返回[2]
const newRightArr = mergeSort([16]) // 返回[16]
```

**合并[2]和[16]**

得到新数组newArr = [2, 16]并返回

**至此，递归分割的[7,3]和[2,16]已拿到结果，进行合并**

```typescript
const newLeftArr = mergeSort([7,3]) // [3,7]
const newRightArr = mergeSort([2,16]) // [2,16]
```

- 得到新数组[2,3,7,16]并返回

**递归分割右半部分[24,4,11,9]**

- 被分割为[24,4]和[11,9]

```typescript
const newLeftArr = mergeSort([24,4])
const newRightArr = mergeSort([11,9])
```

**然后去递归分割[24,4]，得到[24]与[4]，接着[24]与[4]进行合并得到新数组[4,24]并返回**

**接着递归分割[11,9]....**

**递归分割的右半部分也拿到了结果，最后进行合并输出拿到最终结果**

## 时间复杂度

归并排序的时间复杂度为O(nlogn)

- 分解过程通过递归将数组不断分成两版，直到每个子数组只有一个元素位置，因此分解层数是logn
- 合并过程是在每一层去遍历整个数组，因此每一层的合并操作为O(n)

因此总时间复杂度为O(nlogn)



# 5、快速排序 



快速排序（也叫划分交换排序）也是一种基于分治思想的排序算法：

- 将一个大数组分成两个小数组然后递归对两个小数组进行排序
- 排序过程中会选择一个**基准元素（pivot）（一般取第一个元素或者最后一个元素作为基准元素）**，将数组分成左右两个部分， 左边的元素都小于基准元素，右边的元素都大于基准元素
- 然后再对左右两部分分别递归调用快速排序，最终将整个数组排序完成

与归并排序不同的是，快速排序是边划分区域边进行排序，每个区域去选择一个基准元素来进行排序：比基准元素小的放在左边、比基准元素大的放在右边；再递归对以基准元素分割的左右两个区域进行排序...

## 基本思路

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1735897736090-34de5cdb-8161-44db-aa69-605deab3cc65.png)

1. **首先将整个数组作为一个区域进行排序（将比基准元素大的放在基准元素右边，小的放在左边）：**

   a. 首先选择一个基准元素，比如选择数组最后一个元素8

   b. 然后定义两个指针i与j分别指向数组开始位置i=0与基准元素的前一个位置j=arr.length-2

   c. i从左侧开始向右移动，每次进行+1直到寻找到比基准元素大的元素停止

   d. j从右向左移动，每次进行-1直到寻找到比基准元素小的元素停止

   e. 让i位置的元素与j位置的元素进行交换

   f. 重复3-5，直到i大于j，然后让基准元素与i位置的元素交换位置（**因为当i小于j时说明i在j的左边，一旦i大于j了则i在j右侧了，此时i指向的元素因为时大于基准元素的所以将基准元素与此元素进行交换即可**）

![img](https://cdn.nlark.com/yuque/0/2025/jpeg/22253064/1735899847055-32fc5116-68a4-4cbd-9937-be1316c101ee.jpeg)

2. 递归对基准元素左部分区域[6,2,1,7]进行同样逻辑的排序
3. 递归对基准元素右部分区域[15,9,20,12]进行同样逻辑的排序

## 实现

首先可以先实现以数组整个区域进行排序的逻辑：

1. 假设用数组最后一个元素作为基准元素
2. 首先，将i指向0，将j指向arr.length - 2的位置
3. i依次向右移动直到找到大于基准元素的数据停止；j依次向左移动直到找到小于基准元素的数据停止
4. 如果此时i依旧小于j，那么交换两个指针指向的数据，然后i向右移动一位，j向左移动一位
5. 重复3与4，直到i大于j
6. 最后将基准元素与i位置元素进行交换，至此便完成了整个数组区域以基准元素进行的排序

```typescript
const qivot = arr[arr.length - 1]
let i = 0
let j = arr.length - 2

while(i <= j) {
  while(arr[i] <= qivot) {
    i++
  }
  while(arr[j] >= qivot) {
    j--
  }
  if (i < j) {
    swap(arr, i , j)
    i++
    j--
  }
}
swap(arr, arr.length - 1, i)
```

接下来便是对基准元素左部分区域元素以及右部分区域元素进行同样方式的排序。

- 左部分区域元素区间为0～j
- 有部分区域元素区间为i+1~arr.length-1

那么可以将以上逻辑封装为一个方法进行递归调取。

在此方法中，我们需要传入区域的开始位置索引与结束位置索引。

- 需要注意要添加上结束递归调取的条件

```javascript
function quickSort(arr: number[]): number[] {
  // 首先对整个数组区域数据进行以基准元素为标准的排序
  partition(0, arr.length - 1)

  function partition(start: number, end: number) {
    // 注意此时需要加上结束递归调取的条件
    if (start >= end) return
    const qivot = arr[end]
    // 设置两个指针分别指向开始位置与基准元素的前一个位置
    let i = 0
    let j = end - 1
  
    // 直到i大于j时结束
    while(i <= j) {
      // i向右移动直到找到比qivot大的元素
      while(arr[i] < qivot) {
        i++
      }
      // i向左移动直到找到比qivot小的元素
      while(arr[j] > qivot) {
        j--
      }
      // 如果此时i还比j小那么进行交换
      if (i < j) {
        swap(arr, i , j)
        // 交换后i与j继续移动
        i++
        j--
      }
    }
    // 结束后将基准元素与i位置的元素进行交换
    swap(arr, i, end)
    // 对基准元素左部分区域数据进行同样方式的排序
    partition(start, j)
    // 对基准元素右部分区域数据进行同样方式的排序
    partition(i + 1, end)
  }
  return arr
}
```

需要注意，while循环时，arr[i] < qivot时 i++不要写成arr[i] <= qivot时i++，不然i会超过qivot位置继续向后寻找。j同理。

## 时间复杂度

**最好情况： O(nlogn)**

当每次划分后，两部分的大小都相等，即基准元素恰好位于数组的中间位置，此时递归的深度为 O(log n)。

每一层需要进行 n 次比较，因此最好情况下的时间复杂度为 O(nlogn)。

**最坏情况：**![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)

当每次划分后，其中一部分为空，即基准元素是数组中的最大或最小值，此时递归的深度为 O(n)。每一层需要进行 n 次比较，因此最坏情况下的时间复杂度为![img](https://cdn.nlark.com/yuque/__latex/f2d5f588234eb61a559ff90c41511b85.svg)。

**需要注意的是，采用三数取中法或随机选择基准元素可以有效避免最坏情况的发生。**



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