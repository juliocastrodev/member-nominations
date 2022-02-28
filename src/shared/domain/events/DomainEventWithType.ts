import { DomainEvent } from './DomainEvent'

export function DomainEventWithType<Type extends string>(type: Type) {
  return class DomainEventWithTypeClass extends DomainEvent<Type> {
    static type = type

    type = type

    static andPayload<Payload = undefined>() {
      return class DomainEventWithTypeAndPayloadClass extends DomainEventWithTypeClass {
        payload!: Payload

        constructor(...params: Payload extends undefined ? [] : [Payload]) {
          super()

          if (params[0]) this.payload = params[0]
        }
      }
    }
  }
}
