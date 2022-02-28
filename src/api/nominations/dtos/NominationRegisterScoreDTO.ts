import { Min, Max } from 'class-validator'

export class NominationRegisterScoreDTO {
  @Min(0)
  @Max(10)
  involvementWithOtherCommunities!: number

  @Min(0)
  @Max(10)
  overallTalent!: number
}
