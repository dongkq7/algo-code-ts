import { testSort } from './utils'

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
// const arr = [12, 123, 32, 8, 24]
// radixSort(arr)
// console.log(arr)
testSort(radixSort)
