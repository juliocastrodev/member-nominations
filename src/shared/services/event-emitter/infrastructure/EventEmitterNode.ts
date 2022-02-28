/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainEvent } from '../../../domain/events/DomainEvent'
import { EventEmitter } from '../domain/EventEmitter'
import { EventEmitter as NodeEventEmitter } from 'events'

export class EventEmitterNode implements EventEmitter {
  private static emitter: NodeEventEmitter = new NodeEventEmitter()

  emit(event: DomainEvent) {
    EventEmitterNode.emitter.emit(event.type, event)
  }

  static on(type: string, listener: (...args: any[]) => void) {
    EventEmitterNode.emitter.on(type, listener)
  }
}
