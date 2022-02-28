import { UserRepositoryMemory } from '../../application/users/infrastructure/repositories/UserRepositoryMemory'
import { UserRegistrar } from '../../application/users/use-cases/UserRegistrar'
import { Controller } from '../../shared/infrastructure/api/Controller'
import { PasswordServiceBCrypt } from '../../shared/services/password/infrastructure/PasswordServiceBCrypt'
import { RandomServiceUuid } from '../../shared/services/random/infrastructure/RandomServiceUuid'
import { ValidationServiceClassValidator } from '../../shared/services/validator/infrastructure/ValidationServiceClassValidator'
import { UserRegisterController } from './UserRegisterController'

const services = {
  validator: new ValidationServiceClassValidator(),
  random: new RandomServiceUuid(),
  password: new PasswordServiceBCrypt(),
  repository: new UserRepositoryMemory(),
}

const useCases = {
  userRegistrar: new UserRegistrar(services.repository),
}

export const controllers: Controller[] = [
  new UserRegisterController(
    services.validator,
    services.random,
    services.password,
    useCases.userRegistrar
  ),
]
