import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/users/UserId'
import { UserNotFoundError } from '../../users/domain/errors/UserNotFoundError'
import { NominationAlreadyRegisteredError } from '../domain/errors/NominationAlreadyRegisteredError'
import { Nomination, NominationConstructor } from '../domain/Nomination'
import { NominationRepository } from '../domain/NominationRepository'
import { UserFetcher } from '../infrastructure/user-fetcher/domain/UserFetcher'

type NominationRegisterParams = Pick<
  NominationConstructor,
  'nominationId' | 'nomineeEmail' | 'reason' | 'scores'
> & {
  refererId: UserId
}

export class NominationRegistrar extends UseCase<NominationRegisterParams, Nomination> {
  constructor(
    private readonly nominationRepository: NominationRepository,
    private readonly userFetcher: UserFetcher
  ) {
    super()
  }

  async execute({ refererId, ...rest }: NominationRegisterParams) {
    const refererEmail = await this.findRefererEmail(refererId)
    const nomination = Nomination.create({ ...rest, refererEmail })

    await this.ensureNominationIsNotAlreadyRegistered(nomination)
    await this.nominationRepository.save(nomination)

    return nomination
  }

  private async findRefererEmail(refererId: UserId) {
    const email = await this.userFetcher.findEmailOf(refererId)

    if (!email) throw new UserNotFoundError(refererId)

    return email
  }

  private async ensureNominationIsNotAlreadyRegistered(nomination: Nomination) {
    const nomineeEmail = nomination.getNomineeEmail()

    const foundNominations = await this.nominationRepository.find({ nomineeEmail })

    if (foundNominations.length > 0) throw new NominationAlreadyRegisteredError(nomineeEmail)
  }
}
