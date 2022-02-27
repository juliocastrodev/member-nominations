import { Request, Response, NextFunction } from 'express'
import { DomainError } from '../../domain/errors/DomainError'
import { DomainErrorCode } from '../../domain/errors/DomainErrorCode'

const DOMAIN_ERROR_TO_HTTP: Record<DomainErrorCode, number> = {
  [DomainErrorCode.USER_NOT_FOUND]: 404,
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
  } else {
    status = 500
    message = 'Something went wrong'
    code = 'UNKNOWN'
  }

  res.status(status).send({ status, message, code })
}
