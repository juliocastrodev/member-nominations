import { EmailAdress } from './EmailAddress'
import { User } from './User'

export interface UserRepository {
  findByEmail(email: EmailAdress): Promise<User | undefined>
  save(user: User): Promise<void>
}
