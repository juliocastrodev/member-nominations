import { DomainEvent } from '../../domain/events/DomainEvent'
import { EventEmitterNode } from '../../services/event-emitter/infrastructure/EventEmitterNode'

export abstract class Listener {
  constructor(private readonly type: string) {}

  abstract handle(e: DomainEvent): void | Promise<void>

  register = () => {
    EventEmitterNode.on(this.type, (e) => this.handle(e))
  }
}
