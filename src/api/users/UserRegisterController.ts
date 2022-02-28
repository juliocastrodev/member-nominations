import { Request } from 'express'
import { Controller } from '../../shared/infrastructure/api/Controller'
import { HttpMethod } from '../../shared/infrastructure/api/HttpMethod'
import { UserRegistrar } from '../../application/users/use-cases/UserRegistrar'
import { Role } from '../../shared/domain/users/Role'
import { RandomService } from '../../shared/services/random/domain/RandomService'
import { ValidationService } from '../../shared/services/validator/domain/ValidationService'
import { UserRegisterDTO } from './dtos/UserRegisterDTO'
import { User } from '../../application/users/domain/User'
import { UserId } from '../../shared/domain/users/UserId'
import { Name } from '../../application/users/domain/Name'
import { EmailAdress } from '../../application/users/domain/EmailAddress'
import { PasswordService } from '../../shared/services/password/domain/PasswordService'
import { Password } from '../../shared/domain/users/Password'
import { UserShowDTO } from './dtos/UserShowDTO'

export class UserRegisterController extends Controller {
  constructor(
    private readonly validatorService: ValidationService,
    private readonly randomService: RandomService,
    private readonly passwordService: PasswordService,
    private readonly userRegistrar: UserRegistrar
  ) {
    super({ method: HttpMethod.POST, route: '/users' })
  }

  async handle(req: Request) {
    const body = await this.validatorService.validate(UserRegisterDTO, req.body)

    const user = new User({
      userId: new UserId(this.randomService.generateUuidV4()),
      name: new Name(body.name),
      email: new EmailAdress(body.email),
      password: await this.passwordService.hash(new Password(body.password)),
      role: Role.MEMBER,
    })

    await this.userRegistrar.execute(user)

    return UserShowDTO.fromDomain(user)
  }
}
