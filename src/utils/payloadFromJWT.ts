import { JwtPayload } from '../shared/services/jwt/domain/JwtPayload'

export function payloadFromJWT(jwt: string): JwtPayload {
  return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString('utf-8'))
}
