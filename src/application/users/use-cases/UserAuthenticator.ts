import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Password } from '../../../shared/domain/users/Password'
import { AccessToken } from '../../../shared/services/jwt/domain/AccessToken'
import { JwtService } from '../../../shared/services/jwt/domain/JwtService'
import { PasswordService } from '../../../shared/services/password/domain/PasswordService'
import { EmailAdress } from '../domain/EmailAddress'
import { UserAuthenticationError } from '../domain/errors/UserAuthenticationError'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'

type UserAuthenticatorParams = {
  email: EmailAdress
  password: Password
}

export class UserAuthenticator extends UseCase<UserAuthenticatorParams, AccessToken> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {
    super()
  }

  async execute({ email, password }: UserAuthenticatorParams) {
    const user = await this.userRepository.findByEmail(email)

    if (!user || !(await this.isPasswordCorrect(password, user)))
      throw new UserAuthenticationError()

    return this.jwtService.signFor(user)
  }

  private isPasswordCorrect(password: Password, user: User) {
    return this.passwordService.areEqual(password, user.getPassword())
  }
}
