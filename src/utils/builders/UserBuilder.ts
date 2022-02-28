import { v4 } from 'uuid'
import { EmailAddress } from '../../application/users/domain/EmailAddress'
import { User, UserSnapshot } from '../../application/users/domain/User'
import { Role } from '../../shared/domain/users/Role'
import { MARGOT } from '../fixtures/people'

export class UserBuilder {
  constructor(private built: UserSnapshot = { ...MARGOT, userId: v4() }) {}

  from({
    userId = v4(),
    name = MARGOT.name,
    email = MARGOT.email,
    password = MARGOT.password,
    role = MARGOT.role,
  } = {}) {
    this.built = { userId, name, email, password, role }

    return this
  }

  withEmail(email: EmailAddress | string) {
    this.built.email = email instanceof EmailAddress ? email.toSnapshot() : email

    return this
  }

  withRole(role: Role) {
    this.built.role = role

    return this
  }

  build() {
    return User.fromSnapshot(this.built)
  }
}
