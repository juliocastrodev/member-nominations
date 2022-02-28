import { v4 } from 'uuid'
import { EmailAdress } from '../../application/users/domain/EmailAddress'
import { User, UserSnapshot } from '../../application/users/domain/User'
import { MARGOT } from '../fixtures/people'

export class UserBuilder {
  constructor(private built: UserSnapshot = { ...MARGOT, userId: v4() }) {}

  withEmail(email: EmailAdress | string) {
    this.built.email = email instanceof EmailAdress ? email.toSnapshot() : email

    return this
  }

  build() {
    return User.fromSnapshot(this.built)
  }
}
