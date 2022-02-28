import { NominationRepositoryFiles } from '../../application/nominations/infrastructure/repositories/NominationRepositoryFiles'
import { UserFetcherFiles } from '../../application/nominations/infrastructure/user-fetcher/infrastructure/UserFetcherFiles'
import { NominationLister } from '../../application/nominations/use-cases/NominationLister'
import { NominationRegistrar } from '../../application/nominations/use-cases/NominationRegistrar'
import { Controller } from '../../shared/infrastructure/api/Controller'
import { EventEmitterNode } from '../../shared/services/event-emitter/infrastructure/EventEmitterNode'
import { JwtServiceJsonWebToken } from '../../shared/services/jwt/infrastructure/JwtServiceJsonWebToken'
import { RandomServiceUuid } from '../../shared/services/random/infrastructure/RandomServiceUuid'
import { ValidationServiceClassValidator } from '../../shared/services/validation/infrastructure/ValidationServiceClassValidator'
import { NominationListController } from './NominationListController'
import { NominationRegisterController } from './NominationRegisterController'

const services = {
  repository: new NominationRepositoryFiles(),
  random: new RandomServiceUuid(),
  validator: new ValidationServiceClassValidator(),
  jwt: new JwtServiceJsonWebToken(),
  userFetcher: new UserFetcherFiles(),
  emitter: new EventEmitterNode(),
}

const useCases = {
  nominationRegistrar: new NominationRegistrar(
    services.repository,
    services.userFetcher,
    services.emitter
  ),
  nominationLister: new NominationLister(services.repository),
}

export const controllers: Controller[] = [
  new NominationRegisterController(
    services.random,
    services.validator,
    services.jwt,
    useCases.nominationRegistrar
  ),
  new NominationListController(services.validator, services.jwt, useCases.nominationLister),
]
