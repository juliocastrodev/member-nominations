import { Controller } from '../../shared/infrastructure/api/Controller'
import { HttpMethod } from '../../shared/infrastructure/api/HttpMethod'
import { NominationRegistrar } from '../../application/nominations/use-cases/NominationRegistrar'
import { NominationRegisterDTO } from './dtos/NominationRegisterDTO'
import { RandomService } from '../../shared/services/random/domain/RandomService'
import { NominationId } from '../../shared/domain/nominations/NominationId'
import { EmailAdress } from '../../shared/domain/users/EmailAddress'
import { Reason } from '../../application/nominations/domain/Reason'
import { Scores } from '../../application/nominations/domain/Scores'
import { ValidationService } from '../../shared/services/validation/domain/ValidationService'
import { JwtService } from '../../shared/services/jwt/domain/JwtService'
import { Role } from '../../shared/domain/users/Role'
import { AccessToken } from '../../shared/services/jwt/domain/AccessToken'
import { ApplicationRequest } from '../../shared/infrastructure/api/ApplicationRequest'
import { UserId } from '../../shared/domain/users/UserId'
import { NominationShowDTO } from './dtos/NominationShowDTO'

export class NominationRegisterController extends Controller {
  constructor(
    private readonly randomService: RandomService,
    private readonly validatorService: ValidationService,
    private readonly jwtService: JwtService,
    private readonly nominationRegistrar: NominationRegistrar
  ) {
    super({ method: HttpMethod.POST, route: '/nominations', status: 201 })
  }

  async handle(req: ApplicationRequest) {
    const jwtPayload = await this.jwtService.verify([Role.MEMBER], AccessToken.create(req.auth))
    const body = await this.validatorService.validate(NominationRegisterDTO, req.body)

    const nomination = await this.nominationRegistrar.execute({
      nominationId: new NominationId(this.randomService.generateUuidV4()),
      refererId: new UserId(jwtPayload.toSnapshot().sub),
      nomineeEmail: new EmailAdress(body.nomineeEmail),
      reason: new Reason(body.reason),
      scores: Scores.fromSnapshot(body.scores),
    })

    return NominationShowDTO.fromDomain(nomination)
  }
}
