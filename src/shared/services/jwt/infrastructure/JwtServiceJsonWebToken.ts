import { JwtService } from '../domain/JwtService'
import { Role } from '../../../domain/users/Role'
import { AccessToken } from '../domain/AccessToken'
import jwt, { JwtPayload as LibraryPayload } from 'jsonwebtoken'
import { config } from '../../../../config'
import { AuthError } from '../domain/errors/AuthError'
import { UserId } from '../../../domain/users/UserId'
import { JwtPayload } from '../domain/JwtPayload'

type JsonWebTokenPayload = LibraryPayload & { role: Role; sub: string }

export class JwtServiceJsonWebToken implements JwtService {
  sign(id: UserId, role: Role) {
    const payload: JsonWebTokenPayload = { role, sub: id.toSnapshot() }

    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.exp,
    })

    return new AccessToken(accessToken)
  }

  verify(roles: Role[], token?: AccessToken) {
    if (!token) throw new AuthError({ code: 401, message: 'Missing auth token' })

    let verificationPayload: JsonWebTokenPayload

    try {
      verificationPayload = jwt.verify(token.toSnapshot(), config.jwt.secret) as JsonWebTokenPayload
    } catch (err) {
      throw new AuthError({ code: 400, message: `There is a problem with auth token - ${err}` })
    }

    const { role, sub, iat, exp } = verificationPayload

    if (!roles.includes(role))
      throw new AuthError({
        code: 403,
        message: 'Access token does not have the right permissions',
      })

    if (iat == undefined)
      throw new AuthError({ code: 500, message: 'Inconsistent auth token. Missing iat' })

    return new JwtPayload({
      role,
      sub: new UserId(sub),
      iat: new Date(iat * 1000),
      exp: exp != undefined ? new Date(exp * 1000) : undefined,
    })
  }
}
