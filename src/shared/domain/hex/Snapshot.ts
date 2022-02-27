import { AggregateRoot } from './AggregateRoot'
import { ValueObject } from './ValueObject'

export type Snapshot<T extends AggregateRoot | ValueObject> = ReturnType<T['toSnapshot']>
