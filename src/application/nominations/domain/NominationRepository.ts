import { Nomination } from './Nomination'
import { NominationQuery } from './NominationQuery'

export interface NominationRepository {
  find(query: NominationQuery): Promise<Nomination[]>
  save(nomination: Nomination): Promise<void>
  update(nomination: Nomination): Promise<void>
}
