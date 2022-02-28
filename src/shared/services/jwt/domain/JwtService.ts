import { JwtPayload } from './JwtPayload'
import { Role } from '../../../domain/users/Role'
import { AccessToken } from './AccessToken'
import { User } from '../../../../application/users/domain/User'

export interface JwtService {
  signFor(user: User): AccessToken
  verify(roles: Role[], jwt?: AccessToken): JwtPayload
}
