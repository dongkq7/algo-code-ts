import { testSort } from './utils'

// function mergeSort(arr: number[]): number[] {
//   if (arr.length <= 1) {
//     return arr
//   }
//   // 找到中间位置进行分割
//   const mid = Math.floor(arr.length / 2)
//   const leftArr = arr.slice(0, mid)
//   const rightArr = arr.slice(mid)

//   // 进行递归分割
//   const newLeftArr = mergeSort(leftArr)
//   const newRightArr = mergeSort(rightArr)

//   // 声明一个新的数组存放排好序的数据
//   const newArr: number[] = []
//   // 进行合并排序
//   let i = 0
//   let j = 0
//   while (i < newLeftArr.length && j < newRightArr.length) {
//     if (newLeftArr[i] <= newRightArr[j]) {
//       newArr.push(newLeftArr[i])
//       i++
//     } else {
//       newArr.push(newRightArr[j])
//       j++
//     }
//   }
//   // 将剩余的数据放入新数组中
//   if (i < newLeftArr.length) {
//     newArr.push(...newLeftArr.slice(i))
//   }
//   if (j < newRightArr.length) {
//     newArr.push(...newRightArr.slice(j))
//   }
//   // 将合并后的数组进行返回
//   return newArr
// }

// testSort(mergeSort)

function mergeSort(arr: number[]) {
  if (arr.length < 2) {
    return arr
  }
  // 开始排序
  return process(arr, 0, arr.length - 1)
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
  return arr
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
  return arr
}

// const arr = [38, 27, 43, 3, 9, 82, 10]
// mergeSort(arr)
// console.log(arr)

testSort(mergeSort)
