import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { Snapshot } from '../../../shared/domain/hex/Snapshot'
import { UserId } from '../../../shared/domain/users/UserId'
import { EmailAdress } from './EmailAddress'
import { Name } from './Name'
import { Role } from '../../../shared/domain/users/Role'
import { HashedPassword } from '../../../shared/domain/users/HashedPassword'

type UserConstructor = {
  userId: UserId
  name: Name
  email: EmailAdress
  password: HashedPassword
  role: Role
}

type UserSnapshot = Snapshot<User>

export class User extends AggregateRoot {
  constructor(private readonly props: UserConstructor) {
    super()
  }

  static toSnapshot(user: User) {
    return user.toSnapshot()
  }

  toSnapshot() {
    return {
      userId: this.props.userId.toSnapshot(),
      name: this.props.name.toSnapshot(),
      email: this.props.email.toSnapshot(),
      password: this.props.password.toSnapshot(),
      role: this.props.role,
    }
  }

  static fromSnapshot(snapshot: UserSnapshot) {
    return new User({
      userId: new UserId(snapshot.userId),
      name: new Name(snapshot.name),
      password: new HashedPassword(snapshot.password),
      email: new EmailAdress(snapshot.email),
      role: snapshot.role,
    })
  }

  getEmail() {
    return this.props.email
  }
}
