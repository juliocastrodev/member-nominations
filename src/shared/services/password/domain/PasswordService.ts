import { HashedPassword } from '../../../domain/users/HashedPassword'
import { Password } from '../../../domain/users/Password'

export interface PasswordService {
  hash(password: Password): Promise<Password>
  areEqual(pwd: Password, hashedPwd: HashedPassword): Promise<boolean>
}
