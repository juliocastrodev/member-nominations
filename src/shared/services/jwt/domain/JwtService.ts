import { JwtPayload } from './JwtPayload'
import { Role } from '../../../domain/users/Role'
import { AccessToken } from './AccessToken'
import { UserId } from '../../../domain/users/UserId'

export interface JwtService {
  sign(id: UserId, role: Role): AccessToken
  verify(roles: Role[], jwt?: AccessToken): JwtPayload
}
