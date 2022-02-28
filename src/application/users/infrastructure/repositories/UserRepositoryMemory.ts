import { EmailAdress } from '../../domain/EmailAddress'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'

export class UserRepositoryMemory implements UserRepository {
  constructor(private repository: User[] = []) {}

  async findByEmail(email: EmailAdress) {
    return this.repository.find((user) => user.toSnapshot().email === email.toSnapshot())
  }

  async save(user: User) {
    this.repository = [...this.repository, user]
  }
}
