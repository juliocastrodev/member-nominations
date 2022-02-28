import { Nomination } from '../../../application/nominations/domain/Nomination'
import { ScoresSnapshot } from '../../../application/nominations/domain/Scores'
import { Status } from '../../../application/nominations/domain/Status'

export class NominationShowDTO {
  nominationId!: string
  refererEmail!: string
  nomineeEmail!: string
  reason!: string
  scores!: ScoresSnapshot
  status!: Status

  static fromDomain(nomination: Nomination): NominationShowDTO {
    const snapshot = nomination.toSnapshot()

    return {
      nominationId: snapshot.nominationId,
      refererEmail: snapshot.refererEmail,
      nomineeEmail: snapshot.nomineeEmail,
      reason: snapshot.reason,
      scores: snapshot.scores,
      status: snapshot.status,
    }
  }
}
