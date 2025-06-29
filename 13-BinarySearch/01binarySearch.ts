function binarySearch(arr: number[], target: number): number {
  if (arr.length < 1) return -1
  let left = 0
  let right = arr.length - 1
  while(left <= right) {
    const mid = left + ((right - left) >> 1)
    if (arr[mid] === target) return mid
    if (arr[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1
}

console.log(binarySearch([1, 2, 3, 4, 5], 3))