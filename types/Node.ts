export default class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T) {
    this.value = value
  }
}