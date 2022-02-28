import { Snapshot } from '../../../shared/domain/hex/Snapshot'
import { ValueObject } from '../../../shared/domain/hex/ValueObject'
import { Score } from './Score'

type ScoresConstructor = {
  involvementWithOtherCommunities: Score
  overallTalent: Score
}

export type ScoresSnapshot = Snapshot<Scores>

export class Scores extends ValueObject {
  constructor(private readonly props: ScoresConstructor) {
    super()
  }

  static toSnapshot(scores: Scores) {
    return scores.toSnapshot()
  }

  toSnapshot() {
    return {
      involvementWithOtherCommunities: this.props.involvementWithOtherCommunities.toSnapshot(),
      overallTalent: this.props.overallTalent.toSnapshot(),
    }
  }

  static fromSnapshot(snaphot: ScoresSnapshot) {
    return new Scores({
      involvementWithOtherCommunities: new Score(snaphot.involvementWithOtherCommunities),
      overallTalent: new Score(snaphot.overallTalent),
    })
  }

  isOverallTalentLowerThan(score: Score) {
    return this.props.overallTalent.isLowerThan(score)
  }
}
