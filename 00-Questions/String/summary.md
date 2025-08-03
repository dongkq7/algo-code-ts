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
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1)
    }
    // 如果截取完了还没有匹配那么直接返回空字符串
    if (prefix === '') {
      return ''
    }
  }
  return prefix
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight']))

console.log(longestCommonPrefix(['dog', 'racecar', 'car']))
```

【易错点】

- 不要将`strs[i].indexOf(prefix) !== 0`写成`strs[i].indexOf(prefix) < 0` 因为要判断的是前缀！！**前缀的条件是 indexOf 等于 0**
- 进行完一轮 while 后，要判断下是否现在 prefix 是空字符串了，**因为**`**xx.indexOf('')**`**也会等于 0，所以如果不判断的话会一直对比下去！！**

https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/

![img](https://cdn.nlark.com/yuque/0/2025/png/22253064/1740625342211-7100653d-3731-44a2-ac33-4bace8ade87d.png)

# 2、无重复字符的最长子串

### 解题思路

1. left 指向字符串的第一个字符
2. 遍历整个字符串，right 向后移动，每遍历一个，那么就记录一下该字符出现的索引位置
3. 如果该字符出现过，那么就把 left 移到出现位置的后一个位置处，并使用一个变量去记录最长不重复子串的长度

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

# 3、使括号有效

https://leetcode.cn/problems/minimum-add-to-make-parentheses-valid/description/

一个完整的括号字符串定义规则如下： 

- 空字符串是完整的。 
- 如果s是完整的字符串，那么（)也是完整的。 
- 如果s和t是完整的字符串，将它们连接起来形成的st也是完整的。 例如，"(00）"，"“和”(Q）0“是完整的括号字符串，"0）（"，“0（” 和")” 是不完整的括号字符串

 牛牛有一个括号字符串s，现在需要在其中任意位置尽量少地添加括号，将其转化 为一个完整的括号字符串。请问牛牛至少需要添加多少个括号？



## 具体思路

先来看下如果一个字符串只有左括号与有括号如何判断括号是否完整？

将字符串从左往右遍历，使用count去记录

- 遇到左括号count++
- 遇到右括号count--

如果count小于0那么括号一定不完整（右括号多了），当最后count为0那么括号一定完整。**如果遍历过程中count不小于0，那么说明每一个右括号都有个配对的左括号。**

再来看如果让不完整括号变得完整，声明一个需要多少个括号的变量ans等于0，也是先从左往右遍历，如果在某一个时候count刚小于0，那么说明这个时候少了个左括号，**那么先让count变成0，然后让ans++。**

- 遍历完后，如果count为0那么直接返回ans
- 如果不为0，说明还需要count个右括号，最后返回ans+count即可

## 实现

```typescript
function minAddToMakeValid(s: string): number {
    if (!s.length) return 0

    let count = 0
    let ans = 0
    for(let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            count++
        } else {
          // 说明接下来再减就小于0了，没必要减了，直接ans++就可以了
            if (count === 0) {
                ans++
            } else {
                count--
            }
        }
    }
    return ans + count
}
```

## 扩展-求括号深度

https://leetcode.cn/problems/maximum-nesting-depth-of-the-parentheses/description/

count达到的最大值就是括号的深度

```typescript
function maxDepth(s: string): number {
  if (!s.length) return 0

  let count = 0
  let maxDepth = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      count++
      maxDepth = Math.max(maxDepth, count)
    }
    if (s[i] === ')') {
      count--
    }
  }
  return maxDepth
}
```
