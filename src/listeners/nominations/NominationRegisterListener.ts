import { NominationRegisteredEvent } from '../../application/nominations/domain/events/NominationRegisteredEvent'
import { NominationRejecter } from '../../application/nominations/use-cases/NominationRejecter'
import { Listener } from '../../shared/infrastructure/listeners/Listener'

export class NominationRegisterListener extends Listener {
  constructor(private readonly nominationRejecter: NominationRejecter) {
    super(NominationRegisteredEvent.type)
  }

  async handle(e: NominationRegisteredEvent) {
    const { nomination } = e.payload

    if (nomination.shouldBeRejected()) await this.nominationRejecter.execute(nomination)
  }
}
