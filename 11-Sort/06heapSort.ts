import { swap, testSort } from "./utils"

function heapSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr

  const n = arr.length
  // 找到第一个非叶子节点
  const index = Math.floor(n/2 - 1)
  // 从第一个非叶子节点开始进行下滤操作
  for(let i = index; i >= 0; i--) {
    heapifyDown(arr, i, n)
  }

  // 此时第一个数据是最大值，将第一个数据放到最后，然后将前n-1个数据重新进行堆的构建，重复此操作
  for(let i = n - 1; i > 0; i--) {
    swap(arr, 0, i)
    heapifyDown(arr, 0, i)
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

testSort(heapSort)