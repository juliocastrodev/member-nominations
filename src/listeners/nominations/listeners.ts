import { NominationRepositoryFiles } from '../../application/nominations/infrastructure/repositories/NominationRepositoryFiles'
import { NominationRejecter } from '../../application/nominations/use-cases/NominationRejecter'
import { Listener } from '../../shared/infrastructure/listeners/Listener'
import { EmailSenderFake } from '../../shared/services/email-sender/infrastructure/EmailSenderFake'
import { NominationRegisterListener } from './NominationRegisterListener'

const services = {
  repository: new NominationRepositoryFiles(),
  emailSender: new EmailSenderFake(),
}

const useCases = {
  nominationRejecter: new NominationRejecter(services.repository, services.emailSender),
}

export const listeners: Listener[] = [new NominationRegisterListener(useCases.nominationRejecter)]
