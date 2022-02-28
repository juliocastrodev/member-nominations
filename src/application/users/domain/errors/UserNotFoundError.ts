import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'
import { UserId } from '../../../../shared/domain/users/UserId'

export class UserNotFoundError extends DomainError {
  constructor(userId: UserId) {
    super({
      code: DomainErrorCode.USER_NOT_FOUND,
      message: `User with id ${userId} was not found`,
    })
  }
}
