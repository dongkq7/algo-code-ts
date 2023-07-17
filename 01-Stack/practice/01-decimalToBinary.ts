import ArrayStack from '../implement/ArrayStack'

/**
 * 接收一个十进制数字，转换成二进制
 * @param number 
 */
function deciToBin(deci: number): string {
  let result = ''
  const stack = new ArrayStack<number>()
  while(deci > 0) {
    stack.push(deci % 2)
    deci = Math.floor(deci / 2)
  }
  while(!stack.isEmpty()) {
    result += stack.pop()
  }
  return result
}

console.log(deciToBin(100))