import { UseCase } from '../../../shared/domain/hex/UseCase'
import { EmailSender } from '../../../shared/services/email-sender/domain/EmailSender'
import { NominationRejectedEmail } from '../../../shared/services/email-sender/domain/NominationRejectedEmail'
import { Nomination } from '../domain/Nomination'
import { NominationRepository } from '../domain/NominationRepository'

export class NominationRejecter extends UseCase<Nomination, void> {
  constructor(
    private readonly nominationRepository: NominationRepository,
    private readonly emailSender: EmailSender
  ) {
    super()
  }

  async execute(nomination: Nomination) {
    const updatedNomination = nomination.reject()

    await this.nominationRepository.update(updatedNomination)

    await this.notifyRejectedNomination(updatedNomination)
  }

  private async notifyRejectedNomination(nomination: Nomination) {
    await this.emailSender.send(new NominationRejectedEmail({ to: nomination.getNomineeEmail() }))
    await this.emailSender.send(new NominationRejectedEmail({ to: nomination.getRefererEmail() }))
  }
}
