export class Node<T> {
  value: T
  next: Node<T> | null
  constructor(value: T) {
    this.value = value
  }
}

export class DoublyNode<T> extends Node<T> {
  next: DoublyNode<T> | null = null
  prev: DoublyNode<T> | null = null
}