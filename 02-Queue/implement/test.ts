import ArrayQueue from "./ArrayQueue";

const arrayQueue  = new ArrayQueue<number>()
arrayQueue.enqueue(1)
arrayQueue.enqueue(2)
arrayQueue.enqueue(3)
console.log(arrayQueue.size())
console.log(arrayQueue.peek())
console.log(arrayQueue.dequeue())
console.log(arrayQueue.dequeue())
console.log(arrayQueue.dequeue())
console.log(arrayQueue.isEmpty())