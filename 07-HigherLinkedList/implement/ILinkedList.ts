import IList from '../../types/IList'

interface ILinkedList<T> extends IList<T> {
  append(value: T): void
  insert(position: number, value: T) : boolean
  removeAt(position: number): T | null
  remove(value: T): T | null
  get(positon: number): T | null
  update(position: number, value: T): boolean
  indexOf(value: T): number
  traverse(): void
}

export default ILinkedList