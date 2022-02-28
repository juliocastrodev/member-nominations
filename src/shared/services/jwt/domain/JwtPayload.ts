import { Snapshot } from '../../../domain/hex/Snapshot'
import { ValueObject } from '../../../domain/hex/ValueObject'
import { Role } from '../../../domain/users/Role'
import { UserId } from '../../../domain/users/UserId'

export type JwtPayloadConstructor = {
  iat: Date
  exp?: Date
  sub: UserId
  role: Role
}

export type JwtPayloadSnapshot = Snapshot<JwtPayload>

export class JwtPayload extends ValueObject {
  constructor(private readonly props: JwtPayloadConstructor) {
    super()
  }

  static toSnapshot(payload: JwtPayload) {
    return payload.toSnapshot()
  }

  toSnapshot() {
    return {
      iat: this.props.iat,
      ...(this.props.exp && { exp: this.props.exp }),
      sub: this.props.sub.toSnapshot(),
      role: this.props.role,
    }
  }

  static fromSnapshot(snapshot: JwtPayloadSnapshot) {
    return new JwtPayload({
      iat: snapshot.iat,
      exp: snapshot.exp,
      sub: new UserId(snapshot.sub),
      role: snapshot.role,
    })
  }
}
