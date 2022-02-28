import { Nomination } from '../../../application/nominations/domain/Nomination'
import { Status } from '../../../application/nominations/domain/Status'

export class NominationListItemDTO {
  nominationId!: string
  refererEmail!: string
  nomineeEmail!: string
  status!: Status

  static fromDomain(nomination: Nomination): NominationListItemDTO {
    const snapshot = nomination.toSnapshot()

    return {
      nominationId: snapshot.nominationId,
      refererEmail: snapshot.refererEmail,
      nomineeEmail: snapshot.nomineeEmail,
      status: snapshot.status,
    }
  }
}
