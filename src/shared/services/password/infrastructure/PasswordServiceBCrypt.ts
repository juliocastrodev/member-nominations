import { Password } from '../../../domain/users/Password'
import { PasswordService } from '../domain/PasswordService'
import bcrypt from 'bcrypt'
import { HashedPassword } from '../../../domain/users/HashedPassword'

export class PasswordServiceBCrypt implements PasswordService {
  async hash(password: Password) {
    const passwordStr = password.toSnapshot()
    const hashedPasswordStr = await bcrypt.hash(passwordStr, 10)

    return new HashedPassword(hashedPasswordStr)
  }

  areEqual(pwd: Password, hashedPwd: HashedPassword): Promise<boolean> {
    return bcrypt.compare(pwd.toSnapshot(), hashedPwd.toSnapshot())
  }
}
