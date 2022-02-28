import { IsEmail, IsString, Length } from 'class-validator'

export class UserRegisterDTO {
  @IsString()
  name!: string

  @IsEmail()
  email!: string

  @Length(8)
  password!: string
}
