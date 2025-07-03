import { testSort, swap } from './utils'

function heapSort(arr: number[]) {
  if (arr.length < 2) {
    return arr
  }
  // 当前最大堆的heapSize，用于判断接下来的操作是否越界
  let heapSize = arr.length
  // // 遍历数组，对数组中的每一个元素进行heapInsert操作，让数组始终满足最大堆（大根堆）
  // for(let i = 0; i < arr.length; i++) { // O(N
  //   // 从i位置开始进行heapInsert
  //   heapInsert(arr, i) // O(logN)
  // }

  for (let i = (arr.length >> 1) - 1; i >= 0; i--) {
    heapify(arr, i, heapSize)
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
  return arr
}

// function heapInsert(arr: number[], i: number) {
//   // 如果当前元素的值比父节点的大，那么交换
//   while (i > 0 && arr[i] > arr[(i - 1) >> 1]) {
//     swap(arr, i, (i - 1) >> 1)
//     i = (i - 1) >> 1
//   }
// }

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

// const arr = [3, 5, 6, 7, 7]
// heapSort(arr)
// console.log(arr)
testSort(heapSort)
