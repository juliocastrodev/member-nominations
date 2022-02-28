import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { Snapshot } from '../../../shared/domain/hex/Snapshot'
import { NominationId } from '../../../shared/domain/nominations/NominationId'
import { EmailAdress } from '../../../shared/domain/users/EmailAddress'
import { Reason } from './Reason'
import { Score } from './Score'
import { Scores } from './Scores'
import { Status } from './Status'

export type NominationConstructor = {
  nominationId: NominationId
  refererEmail: EmailAdress
  nomineeEmail: EmailAdress
  reason: Reason
  scores: Scores
  status: Status
}

export type NominationSnapshot = Snapshot<Nomination>

export class Nomination extends AggregateRoot {
  constructor(private readonly props: NominationConstructor) {
    super()
  }

  static create(params: Omit<NominationConstructor, 'status'>) {
    return new Nomination({ ...params, status: Status.PENDING })
  }

  static toSnapshot(user: Nomination) {
    return user.toSnapshot()
  }

  toSnapshot() {
    return {
      nominationId: this.props.nominationId.toSnapshot(),
      refererEmail: this.props.refererEmail.toSnapshot(),
      nomineeEmail: this.props.nomineeEmail.toSnapshot(),
      reason: this.props.reason.toSnapshot(),
      scores: this.props.scores.toSnapshot(),
      status: this.props.status,
    }
  }

  static fromSnapshot(snapshot: NominationSnapshot) {
    return new Nomination({
      nominationId: new NominationId(snapshot.nominationId),
      refererEmail: new EmailAdress(snapshot.refererEmail),
      nomineeEmail: new EmailAdress(snapshot.nomineeEmail),
      reason: new Reason(snapshot.reason),
      scores: Scores.fromSnapshot(snapshot.scores),
      status: snapshot.status,
    })
  }

  getNomineeEmail() {
    return this.props.nomineeEmail
  }

  getRefererEmail() {
    return this.props.refererEmail
  }

  shouldBeRejected() {
    return this.props.scores.isOverallTalentLowerThan(new Score(8))
  }

  reject() {
    return new Nomination({ ...this.props, status: Status.REJECTED })
  }
}
