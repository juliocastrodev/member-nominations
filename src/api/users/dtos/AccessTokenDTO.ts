import { AccessToken } from '../../../shared/services/jwt/domain/AccessToken'

export class AccessTokenDTO {
  token!: string

  static fromDomain(accessToken: AccessToken): AccessTokenDTO {
    return {
      token: accessToken.toSnapshot(),
    }
  }
}
