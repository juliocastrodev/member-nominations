import { EmailAddress } from './EmailAddress'
import { User } from './User'

export interface UserRepository {
  findByEmail(email: EmailAddress): Promise<User | undefined>
  save(user: User): Promise<void>
}
