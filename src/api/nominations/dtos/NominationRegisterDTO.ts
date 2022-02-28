import { Type } from 'class-transformer'
import { IsString, IsEmail, ValidateNested, IsObject } from 'class-validator'
import { NominationRegisterScoreDTO } from './NominationRegisterScoreDTO'

export class NominationRegisterDTO {
  @IsEmail()
  nomineeEmail!: string

  @IsString()
  reason!: string

  @Type(() => NominationRegisterScoreDTO)
  @ValidateNested()
  @IsObject()
  scores!: NominationRegisterScoreDTO
}
