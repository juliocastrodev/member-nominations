import { Request, Response, NextFunction } from 'express'
import { DomainError } from '../../domain/errors/DomainError'
import { DomainErrorCode } from '../../domain/errors/DomainErrorCode'
import { AuthError } from '../../services/jwt/domain/errors/AuthError'
import { ValidationError } from '../../services/validation/domain/errors/ValidationError'

const DOMAIN_ERROR_TO_HTTP: Record<DomainErrorCode, number> = {
  [DomainErrorCode.USER_NOT_FOUND]: 404,
  [DomainErrorCode.USER_ALREADY_REGISTERED]: 409,
  [DomainErrorCode.NOMINATION_ALREADY_REGISTERED]: 409,
  [DomainErrorCode.INVALID_NOMINATION_SCORE]: 400,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  let status: number
  let message: string
  let code: string

  if (err instanceof DomainError) {
    status = DOMAIN_ERROR_TO_HTTP[err.code]
    message = err.message
    code = err.code
  } else if (err instanceof ValidationError) {
    status = 400
    message = err.message
    code = 'VALIDATION_ERROR'
  } else if (err instanceof AuthError) {
    status = err.code
    message = err.message
    code = 'AUTH_ERROR'
  } else {
    status = 500
    message = 'Something went wrong'
    code = 'UNKNOWN_ERROR'
  }

  res.status(status).send({ status, message, code })
}
