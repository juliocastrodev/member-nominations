import { NominationConstructor } from './Nomination'

export type NominationQuery = Partial<Pick<NominationConstructor, 'nomineeEmail' | 'status'>>
