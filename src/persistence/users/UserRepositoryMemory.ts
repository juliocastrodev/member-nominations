import { User } from '../../application/users/domain/User'
import { UserRepository } from '../../application/users/domain/UserRepository'

export class UserRepositoryMemory implements UserRepository {
  constructor(
    private readonly repository: User[] = [
      User.fromSnapshot({ userId: 'first' }),
      User.fromSnapshot({ userId: 'second' }),
      User.fromSnapshot({ userId: 'third' }),
    ]
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository
  }
}
