import { NominationRepositoryFiles } from '../../application/nominations/infrastructure/repositories/NominationRepositoryFiles'
import { UserFetcherFiles } from '../../application/nominations/infrastructure/user-fetcher/infrastructure/UserFetcherFiles'
import { NominationRegistrar } from '../../application/nominations/use-cases/NominationRegistrar'
import { Controller } from '../../shared/infrastructure/api/Controller'
import { JwtServiceJsonWebToken } from '../../shared/services/jwt/infrastructure/JwtServiceJsonWebToken'
import { RandomServiceUuid } from '../../shared/services/random/infrastructure/RandomServiceUuid'
import { ValidationServiceClassValidator } from '../../shared/services/validation/infrastructure/ValidationServiceClassValidator'
import { NominationRegisterController } from './NominationRegisterController'

const services = {
  repository: new NominationRepositoryFiles(),
  random: new RandomServiceUuid(),
  validator: new ValidationServiceClassValidator(),
  jwt: new JwtServiceJsonWebToken(),
  userFetcher: new UserFetcherFiles(),
}

const useCases = {
  nominationRegistrar: new NominationRegistrar(services.repository, services.userFetcher),
}

export const controllers: Controller[] = [
  new NominationRegisterController(
    services.random,
    services.validator,
    services.jwt,
    useCases.nominationRegistrar
  ),
]
