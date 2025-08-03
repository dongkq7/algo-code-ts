/**
 * 小虎去附近的商店买苹果，奸诈的商贩使用了捆绑交易
 * 只提供6个每袋和8个每袋的包装包装不可拆分
 * 可是小虎现在只想购买恰好n个苹果
 * 小虎想购买尽量少的袋数方便携带。如果不能购买恰好n个苹果，小虎将不会购买。
 * 输入一个整数n，表示小虎想购买的个苹果，返回最小使用多少袋子。
 * 如果无论如何都不能正好装下，返回-1。
 */

function minAppleBags(n: number): number {
  let minBags = Infinity
  // 优先用8个装袋子进行装
  const max8 = Math.floor(n / 8)
  // 逐步减少8个装袋子，去尝试要使用多少6个装袋子
  for (let count8 = max8; count8 >= 0; count8--) {
    const remaining = n - count8 * 8
    if (remaining >= 0 && remaining % 6 === 0) {
      const count6 = remaining / 6
      minBags = Math.min(minBags, count8 + count6)
    }
  }
  return minBags === Infinity ? -1 : minBags
}

console.log(minAppleBags(20))
console.log(minAppleBags(10))
