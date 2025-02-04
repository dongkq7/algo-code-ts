import { testSort } from "./utils"

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

testSort(mergeSort)