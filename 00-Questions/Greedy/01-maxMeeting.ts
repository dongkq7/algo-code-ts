/**
 *
 * 一些项目要占用一个会议室宣讲，会议室不能同时容纳两个项目的宣讲。
 * 给你每一个项目开始的时间和结束的时间，你来安排宣讲的日程。
 * 要求会议室进行的宣讲的场次最多，返回这个最多的宣讲场次。
 *
 */
function maxMeeting(events: number[][]) {
  // 按照结束时间升序排，优先安排结束时间最早的会议
  events.sort((a, b) => a[1] - b[1])
  let result = 1
  let timePoint = events[0][1] // 当前来的时间点
  for (let i = 1; i < events.length; i++) {
    // 如果上一个会议的结束时间早于当前会议的开始时间，则安排
    if (timePoint <= events[i][0]) {
      result++
      timePoint = events[i][1] // 时间点变为这个会议的结束时间
    }
  }
  return result
}
