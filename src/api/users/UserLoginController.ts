import { Controller } from '../../shared/infrastructure/api/Controller'
import { HttpMethod } from '../../shared/infrastructure/api/HttpMethod'
import { ValidationService } from '../../shared/services/validation/domain/ValidationService'
import { EmailAddress } from '../../application/users/domain/EmailAddress'
import { Password } from '../../shared/domain/users/Password'
import { ApplicationRequest } from '../../shared/infrastructure/api/ApplicationRequest'
import { UserLoginDTO } from './dtos/UserLoginDTO'
import { UserAuthenticator } from '../../application/users/use-cases/UserAuthenticator'
import { AccessTokenDTO } from './dtos/AccessTokenDTO'

export class UserLoginController extends Controller {
  constructor(
    private readonly validatorService: ValidationService,
    private readonly userAuthenticator: UserAuthenticator
  ) {
    super({ method: HttpMethod.POST, route: '/users/login', status: 201 })
  }

  async handle(req: ApplicationRequest) {
    const body = await this.validatorService.validate(UserLoginDTO, req.body)

    const accessToken = await this.userAuthenticator.execute({
      email: new EmailAddress(body.email),
      password: new Password(body.password),
    })

    return AccessTokenDTO.fromDomain(accessToken)
  }
}
