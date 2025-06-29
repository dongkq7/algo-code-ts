# 1、最长公共前缀



https://leetcode.cn/problems/longest-common-prefix/description/

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1740622683089-d6277552-94ef-4069-af84-ce91fe70123a.png)

### 解题思路

1. 以第一个字符串作为最长公共前缀
2. 从第二项遍历数组，判断字符串中是否包含该前缀，不包含则依次截取掉前缀的最后一个字母直到能够匹配上或者被截取成了空字符串为止

### 实现

```typescript
function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) return ''

  let prefix = strs[0]
  for(let i = 1; i < strs.length; i++) {
    while(strs[i].indexOf(prefix) !== 0) {
      prefix =  prefix.slice(0, prefix.length - 1)
    }
    // 如果截取完了还没有匹配那么直接返回空字符串
    if (prefix === '') {
      return ''
    }
  }
  return prefix
}

console.log(longestCommonPrefix(["flower","flow","flight"]))

console.log(longestCommonPrefix(["dog","racecar","car"]))
```

【易错点】

- 不要将`strs[i].indexOf(prefix) !== 0`写成`strs[i].indexOf(prefix) < 0` 因为要判断的是前缀！！**前缀的条件是indexOf 等于 0**
- 进行完一轮while后，要判断下是否现在prefix是空字符串了，**因为**`**xx.indexOf('')**`**也会等于0，所以如果不判断的话会一直对比下去！！**



https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1740625342211-7100653d-3731-44a2-ac33-4bace8ade87d.png)

# 2、无重复字符的最长子串



### 解题思路

1. left指向字符串的第一个字符
2. 遍历整个字符串，right向后移动，每遍历一个，那么就记录一下该字符出现的索引位置
3. 如果该字符出现过，那么就把left移到出现位置的后一个位置处，并使用一个变量去记录最长不重复子串的长度

![img](https://cdn.nlark.com/yuque/0/2025/jpeg/22253064/1740638084675-a986a618-12fa-40e7-97c6-a4e5c0055572.jpeg)

### 实现

```typescript
function lengthOfLongestSubstring(s: string): number {
  if (s.length <= 1) return s.length

  const map = new Map<string, number>() // 保存字符及出现的位置
  let left = 0
  let max = 0 // 最长长度

  for (let right = 0; right < s.length; right++) {
    const char = s[right]
    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1
    }
    map.set(char, right)
    max = Math.max(max, right - left + 1)
  }
  return max
}

console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring('bbbbb'))
console.log(lengthOfLongestSubstring('pwwkew'))
```