import { v4 } from 'uuid'
import { EmailAddress } from '../../application/users/domain/EmailAddress'
import { User, UserSnapshot } from '../../application/users/domain/User'
import { MARGOT } from '../fixtures/people'

export class UserBuilder {
  constructor(private built: UserSnapshot = { ...MARGOT, userId: v4() }) {}

  withEmail(email: EmailAddress | string) {
    this.built.email = email instanceof EmailAddress ? email.toSnapshot() : email

    return this
  }

  build() {
    return User.fromSnapshot(this.built)
  }
}
