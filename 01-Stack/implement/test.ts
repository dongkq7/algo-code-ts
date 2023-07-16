import ArrayStack from "./ArrayStack";

const arrayStack = new ArrayStack<number>()
arrayStack.push(1)
arrayStack.push(2)
arrayStack.push(3)

console.log(arrayStack.pop())
console.log(arrayStack.peek())
console.log(arrayStack.isEmpty())
console.log(arrayStack.size())