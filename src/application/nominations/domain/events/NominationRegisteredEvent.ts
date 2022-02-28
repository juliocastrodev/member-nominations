import { DomainEventWithType } from '../../../../shared/domain/events/DomainEventWithType'
import { Nomination } from '../Nomination'

type NominationRegisteredEventPayload = {
  nomination: Nomination
}

export class NominationRegisteredEvent extends DomainEventWithType(
  'nomination.registered'
).andPayload<NominationRegisteredEventPayload>() {}
