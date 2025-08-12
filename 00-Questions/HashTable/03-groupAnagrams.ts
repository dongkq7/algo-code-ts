// https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked

/**
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */

function groupAnagrams(strs: string[]): string[][] {
  // 创建哈希表，键为排序后的字符串（作为异位词的唯一标识），值为对应的字符串数组
  const anagramMap = new Map<string, string[]>()

  for (const str of strs) {
    // 将字符串拆分为字符数组，排序后再拼接成字符串
    // 字母异位词排序后会得到相同的字符串
    const sortedStr = str.split('').sort().join('')

    // 检查哈希表中是否已有该排序字符串对应的分组
    if (anagramMap.has(sortedStr)) {
      // 有则添加到现有分组
      anagramMap.get(sortedStr)!.push(str)
    } else {
      // 无则创建新分组
      anagramMap.set(sortedStr, [str])
    }
  }

  // 将哈希表中的所有值（分组后的数组）转换为数组返回
  return Array.from(anagramMap.values())
}

// 测试用例
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']))
// 输出: [ ["eat","tea","ate"], ["tan","nat"], ["bat"] ]
console.log(groupAnagrams([''])) // 输出: [[""]]
console.log(groupAnagrams(['a'])) // 输出: [["a"]]
