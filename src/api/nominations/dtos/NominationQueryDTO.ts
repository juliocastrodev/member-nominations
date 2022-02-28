import { IsEmail, IsOptional, IsEnum } from 'class-validator'
import { Status } from '../../../application/nominations/domain/Status'

export class NominationQueryDTO {
  @IsOptional()
  @IsEmail()
  refererEmail?: string

  @IsOptional()
  @IsEnum(Status)
  status?: Status
}
