import { User } from '../../../application/users/domain/User'

export class UserListDTO {
  userId!: string

  static fromDomain(user: User): UserListDTO {
    const snapshot = user.toSnapshot()

    return {
      userId: snapshot.userId,
    }
  }
}
