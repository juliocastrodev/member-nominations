import { SingleValueObject } from '../../../shared/domain/hex/SingleValueObject'
import { InvalidNominationScoreError } from './errors/InvalidNominationScoreError'

export class Score extends SingleValueObject<number> {
  constructor(score: number) {
    super(score)

    if (score < 0 || score > 10) throw new InvalidNominationScoreError(score)
  }
}
