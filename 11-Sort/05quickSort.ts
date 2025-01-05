import { swap, testSort } from "./utils"

function quickSort(arr: number[]): number[] {
  // 首先对整个数组区域数据进行以基准元素为标准的排序
  partition(0, arr.length - 1)

  function partition(left: number, right: number) {
    // 注意此时需要加上结束递归调取的条件
    if (left >= right) return
    const qivot = arr[right]
    // 设置两个指针分别指向开始位置与基准元素的前一个位置
    let i = 0
    let j = right - 1
  
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
    swap(arr, i, right)
    // 对基准元素左部分区域数据进行同样方式的排序
    partition(left, j)
    // 对基准元素右部分区域数据进行同样方式的排序
    partition(i + 1, right)
  }
  return arr
}

testSort(quickSort)