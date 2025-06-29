import { testSort, swap } from "./utils"

function insertionSort(arr: number[]): number[] {
  const n = arr.length
  // 假设第一个元素已经排好序了，从第二个元素开始依次取出数据进行对比
  for(let i = 1; i < n; i++) {
    const newNum = arr[i]
    let j = i - 1
    // 从该元素的前一个元素开始依次向前去对比，如果大于当前元素，那么向后移动，直到小于当前元素或者对比到了第一个元素为止
    while(arr[j] > newNum && j >= 0) {
      arr[j+1] = arr[j]
      j--
    }
    // 在找到的比当前元素小的元素后面插入
    arr[j+1] = newNum
  }
  return arr
}


function insertionSort2(arr: number[]): number[] {
  const n = arr.length
  for(let i = 1; i < n; i++) {
    for(let j = i - 1; j >= 0 && arr[j] > arr[j+1]; j--) {
      swap(arr, j, j+1)
    }
  }
  return arr
}

// testSort(insertionSort)
testSort(insertionSort2)