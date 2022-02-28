import { Controller } from '../../shared/infrastructure/api/Controller'
import { HttpMethod } from '../../shared/infrastructure/api/HttpMethod'
import { EmailAdress } from '../../shared/domain/users/EmailAddress'
import { ValidationService } from '../../shared/services/validation/domain/ValidationService'
import { JwtService } from '../../shared/services/jwt/domain/JwtService'
import { Role } from '../../shared/domain/users/Role'
import { AccessToken } from '../../shared/services/jwt/domain/AccessToken'
import { ApplicationRequest } from '../../shared/infrastructure/api/ApplicationRequest'
import { NominationLister } from '../../application/nominations/use-cases/NominationLister'
import { NominationQueryDTO } from './dtos/NominationQueryDTO'
import { NominationListItemDTO } from './dtos/NominationListItemDTO'

export class NominationListController extends Controller {
  constructor(
    private readonly validatorService: ValidationService,
    private readonly jwtService: JwtService,
    private readonly nominationLister: NominationLister
  ) {
    super({ method: HttpMethod.GET, route: '/nominations' })
  }

  async handle(req: ApplicationRequest) {
    await this.jwtService.verify([Role.ADMIN], AccessToken.create(req.auth))
    const body = await this.validatorService.validate(NominationQueryDTO, req.query)

    console.log({ body })

    const nominations = await this.nominationLister.execute({
      ...(body.refererEmail && { refererEmail: new EmailAdress(body.refererEmail) }),
      ...(body.status && { status: body.status }),
    })

    return nominations.map(NominationListItemDTO.fromDomain)
  }
}
