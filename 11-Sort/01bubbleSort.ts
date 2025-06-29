import { testSort, swap } from './utils'
function bubbleSort(arr: number[]): number[] {
  const n = arr.length
  if (n < 2) return arr
  // 表示进行的第几轮
  for(let i = 0; i < n; i++) {
    let swapped = false
    // 表示两两比较次数
    for(let j = 0; j < n - 1 - i; j++) {
      if(arr[j] > arr[j+1]) {
        swap(arr, j, j+ 1)
        swapped = true
      }
    }
    if (!swapped) {
      break
    }
  }
  return arr
}

testSort(bubbleSort)

