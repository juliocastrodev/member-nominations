import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserAlreadyRegisteredError } from '../domain/errors/UserAlreadyRegisteredError'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'

export class UserRegistrar extends UseCase<User, void> {
  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  async execute(user: User) {
    await this.ensureUserIsNotAlreadyRegistered(user)

    await this.userRepository.save(user)
  }

  private async ensureUserIsNotAlreadyRegistered(user: User) {
    const userEmail = user.getEmail()

    const foundUser = await this.userRepository.findByEmail(userEmail)

    if (foundUser) throw new UserAlreadyRegisteredError(userEmail)
  }
}
