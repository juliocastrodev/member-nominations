import { NominationConstructor } from './Nomination'

export type NominationQuery = Partial<
  Pick<NominationConstructor, 'refererEmail' | 'status' | 'nomineeEmail'>
>
