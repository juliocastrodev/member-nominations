import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Nomination } from '../domain/Nomination'
import { NominationQuery } from '../domain/NominationQuery'
import { NominationRepository } from '../domain/NominationRepository'

export class NominationLister extends UseCase<NominationQuery, Nomination[]> {
  constructor(private readonly nominationRepository: NominationRepository) {
    super()
  }

  async execute(query: NominationQuery) {
    return this.nominationRepository.find(query)
  }
}
