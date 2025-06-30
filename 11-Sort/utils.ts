type SortFunType = (arr: number[]) => number[]


export function swap(arr: number[], i: number, j: number) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
   // [arr[i], arr[j]] = [arr[j], arr[i]]
}

// export function swap(arr: number[], i: number, j: number) {
//   arr[i] = arr[i] ^ arr[j]
//   arr[j] = arr[i] ^ arr[j]
//   arr[i] = arr[i] ^ arr[j]
// }

export function testSort(sortFun: SortFunType) {
  const arr = Array.from({length: 10}, () => {
    return Math.floor(Math.random() * 100)
  })

  console.log('排序前 =>', arr)
  const newArr = sortFun(arr)
  console.log('排序后 =>', newArr)
  console.log('是否完成排序？', isSorted(newArr))
}


function isSorted(arr: number[]): boolean {
  for(let i = 0; i<arr.length; i++) {
    if (arr[i] > arr[i+1]) {
      return false
    }
  }
  return true
}