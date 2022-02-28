import { ValueObject } from './ValueObject'

export abstract class SingleValueObject<T> extends ValueObject {
  constructor(private readonly value: T) {
    super()
  }

  toSnapshot() {
    return this.value
  }

  toString() {
    return this.toSnapshot()
  }
}
