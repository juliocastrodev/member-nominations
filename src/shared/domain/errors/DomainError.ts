import { DomainErrorCode } from './DomainErrorCode'

type DomainErrorConstructor = {
  code: DomainErrorCode
  message: string
}

export abstract class DomainError extends Error {
  readonly code: DomainErrorCode

  readonly message: string

  constructor(props: DomainErrorConstructor) {
    super(props.message)
    this.code = props.code
    this.message = props.message
  }
}
