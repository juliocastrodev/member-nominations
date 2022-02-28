import { Nomination } from './Nomination'
import { NominationQuery } from './NominationQuery'

export interface NominationRepository {
  find(query: NominationQuery): Promise<Nomination[]>
  save(user: Nomination): Promise<void>
}
