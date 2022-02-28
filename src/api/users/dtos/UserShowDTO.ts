import { User } from '../../../application/users/domain/User'
import { Role } from '../../../shared/domain/users/Role'

export class UserShowDTO {
  userId!: string
  name!: string
  email!: string
  role!: Role

  static fromDomain(user: User) {
    const snapshot = user.toSnapshot()

    return {
      userId: snapshot.userId,
      name: snapshot.name,
      email: snapshot.email,
      role: snapshot.role,
    }
  }
}
