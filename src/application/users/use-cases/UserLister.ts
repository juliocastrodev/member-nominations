import { UseCase } from '../../../shared/domain/hex/UseCase'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'

export class UserLister extends UseCase<void, User[]> {
  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  async execute() {
    const users = await this.userRepository.findAll()

    return users
  }
}
