type AuthErrorConstructor = {
  code: number
  message: string
}

export class AuthError extends Error {
  readonly code: number

  readonly message: string

  constructor(props: AuthErrorConstructor) {
    super(props.message)
    this.code = props.code
    this.message = props.message
  }
}
