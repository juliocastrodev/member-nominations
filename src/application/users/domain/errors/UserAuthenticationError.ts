import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'
import { DomainError } from '../../../../shared/domain/errors/DomainError'

export class UserAuthenticationError extends DomainError {
  constructor() {
    super({
      code: DomainErrorCode.USER_AUTHENTICATION_ERROR,
      message: `Either the password is wrong or the user does not exist`,
    })
  }
}
