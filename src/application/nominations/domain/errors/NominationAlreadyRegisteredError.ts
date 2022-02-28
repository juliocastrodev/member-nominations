import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'
import { EmailAdress } from '../../../users/domain/EmailAddress'

export class NominationAlreadyRegisteredError extends DomainError {
  constructor(nomineeEmail: EmailAdress) {
    super({
      code: DomainErrorCode.NOMINATION_ALREADY_REGISTERED,
      message: `${nomineeEmail} already has a nomination in the system`,
    })
  }
}
