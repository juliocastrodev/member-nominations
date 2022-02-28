import { DomainEvent } from '../../../domain/events/DomainEvent'

export interface EventEmitter<E extends DomainEvent = DomainEvent> {
  emit(event: E): void
}
