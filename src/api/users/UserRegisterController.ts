import { Controller } from '../../shared/infrastructure/api/Controller'
import { HttpMethod } from '../../shared/infrastructure/api/HttpMethod'
import { UserRegistrar } from '../../application/users/use-cases/UserRegistrar'
import { Role } from '../../shared/domain/users/Role'
import { RandomService } from '../../shared/services/random/domain/RandomService'
import { ValidationService } from '../../shared/services/validation/domain/ValidationService'
import { UserRegisterDTO } from './dtos/UserRegisterDTO'
import { User } from '../../application/users/domain/User'
import { UserId } from '../../shared/domain/users/UserId'
import { Name } from '../../application/users/domain/Name'
import { EmailAddress } from '../../application/users/domain/EmailAddress'
import { PasswordService } from '../../shared/services/password/domain/PasswordService'
import { Password } from '../../shared/domain/users/Password'
import { UserShowDTO } from './dtos/UserShowDTO'
import { JwtService } from '../../shared/services/jwt/domain/JwtService'
import { ApplicationRequest } from '../../shared/infrastructure/api/ApplicationRequest'
import { AccessToken } from '../../shared/services/jwt/domain/AccessToken'

export class UserRegisterController extends Controller {
  constructor(
    private readonly validatorService: ValidationService,
    private readonly jwtService: JwtService,
    private readonly randomService: RandomService,
    private readonly passwordService: PasswordService,
    private readonly userRegistrar: UserRegistrar
  ) {
    super({ method: HttpMethod.POST, route: '/users', status: 201 })
  }

  async handle(req: ApplicationRequest) {
    await this.jwtService.verify([Role.ADMIN], AccessToken.create(req.auth))
    const body = await this.validatorService.validate(UserRegisterDTO, req.body)

    const user = new User({
      userId: new UserId(this.randomService.generateUuidV4()),
      name: new Name(body.name),
      email: new EmailAddress(body.email),
      password: await this.passwordService.hash(new Password(body.password)),
      role: Role.MEMBER,
    })

    await this.userRegistrar.execute(user)

    return UserShowDTO.fromDomain(user)
  }
}
