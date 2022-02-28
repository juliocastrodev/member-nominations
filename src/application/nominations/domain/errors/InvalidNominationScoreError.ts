import { DomainError } from '../../../../shared/domain/errors/DomainError'
import { DomainErrorCode } from '../../../../shared/domain/errors/DomainErrorCode'

export class InvalidNominationScoreError extends DomainError {
  constructor(score: number) {
    super({
      code: DomainErrorCode.INVALID_NOMINATION_SCORE,
      message: `Score ${score} is invalid`,
    })
  }
}
