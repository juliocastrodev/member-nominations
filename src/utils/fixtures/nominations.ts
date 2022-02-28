import { Status } from '../../application/nominations/domain/Status'
import { MARGOT } from './people'

export const UNIVERSITY_PARTNER = {
  refererEmail: MARGOT.email,
  nomineeEmail: 'university@partner.com',
  reason: 'He is passionate about technology and has won several public speaking awards',
  scores: {
    involvementWithOtherCommunities: 8,
    overallTalent: 9,
  },
  status: Status.PENDING,
}
