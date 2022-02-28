/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class DomainEvent<Type extends string = string, Payload = any> {
  abstract type: Type

  payload?: Payload
}
