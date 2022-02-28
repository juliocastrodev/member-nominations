import { EventEmitter } from '../../../../shared/services/event-emitter/domain/EventEmitter'
import { NominationRegisteredEvent } from './NominationRegisteredEvent'

type NominationEvent = NominationRegisteredEvent

export type NominationEmitter = EventEmitter<NominationEvent>
