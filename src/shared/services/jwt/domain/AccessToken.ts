import { SingleValueObject } from '../../../domain/hex/SingleValueObject'

export class AccessToken extends SingleValueObject<string> {
  static create(token?: string) {
    if (!token) return undefined

    return new AccessToken(token)
  }
}
