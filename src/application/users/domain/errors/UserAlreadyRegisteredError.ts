import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'
import { EmailAddress } from '../EmailAddress'

export class UserAlreadyRegisteredError extends DomainError {
  constructor(userEmail: EmailAddress) {
    super({
      code: DomainErrorCode.USER_ALREADY_REGISTERED,
      message: `User with email ${userEmail} is already registered`,
    })
  }
}
