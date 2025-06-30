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
  while(left < more) {
    if(arr[left] < pivot) {
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

const arr = [2,8,7,3,0,5,9,5]
quickSort(arr)
console.log(arr)