function maxSlidingWindow(nums: number[], k: number): number[] {
  // 双端队列，用于存储元素索引，保持队列内元素对应的数值单调递减
  const deque: number[] = []
  const result: number[] = []

  for (let i = 0; i < nums.length; i++) {
    // 1. 移除队列中所有小于当前元素的索引
    // 保证队列从队头到队尾对应的数值是递减的
    while (deque.length > 0 && nums[i] >= nums[deque[deque.length - 1]]) {
      deque.pop()
    }

    // 2. 将当前元素索引加入队列
    deque.push(i)

    // 3. 移除超出窗口范围的索引（队头元素）
    // 窗口范围是 [i - k + 1, i]，超出左边界的索引需要移除
    while (deque[0] <= i - k) {
      deque.shift()
    }

    // 4. 当窗口大小达到 k 时，开始记录最大值（队头元素）
    if (i >= k - 1) {
      result.push(nums[deque[0]])
    }
  }

  return result
}
