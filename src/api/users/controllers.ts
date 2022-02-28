import { UserRepositoryFiles } from '../../application/users/infrastructure/repositories/UserRepositoryFiles'
import { UserRegistrar } from '../../application/users/use-cases/UserRegistrar'
import { Controller } from '../../shared/infrastructure/api/Controller'
import { JwtServiceJsonWebToken } from '../../shared/services/jwt/infrastructure/JwtServiceJsonWebToken'
import { PasswordServiceBCrypt } from '../../shared/services/password/infrastructure/PasswordServiceBCrypt'
import { RandomServiceUuid } from '../../shared/services/random/infrastructure/RandomServiceUuid'
import { ValidationServiceClassValidator } from '../../shared/services/validation/infrastructure/ValidationServiceClassValidator'
import { UserRegisterController } from './UserRegisterController'

const services = {
  validator: new ValidationServiceClassValidator(),
  jwt: new JwtServiceJsonWebToken(),
  random: new RandomServiceUuid(),
  password: new PasswordServiceBCrypt(),
  repository: new UserRepositoryFiles(),
}

const useCases = {
  userRegistrar: new UserRegistrar(services.repository),
}

export const controllers: Controller[] = [
  new UserRegisterController(
    services.validator,
    services.jwt,
    services.random,
    services.password,
    useCases.userRegistrar
  ),
]
