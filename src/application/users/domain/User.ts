import { AggregateRoot } from '../../../shared/domain/hex/AggregateRoot'
import { Snapshot } from '../../../shared/domain/hex/Snapshot'
import { UserId } from '../../../shared/domain/users/UserId'

type UserConstructor = {
  userId: UserId
}

type UserSnapshot = Snapshot<User>

export class User extends AggregateRoot {
  constructor(private readonly props: UserConstructor) {
    super()
  }

  toSnapshot() {
    return {
      userId: this.props.userId.toSnapshot(),
    }
  }

  static toSnapshot(user: User) {
    return user.toSnapshot()
  }

  static fromSnapshot(userSnapshot: UserSnapshot) {
    return new User({
      userId: new UserId(userSnapshot.userId),
    })
  }
}
