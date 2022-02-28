import 'reflect-metadata'
import { Type } from '../domain/Type'
import { ValidationService } from '../domain/ValidationService'
import { plainToInstance } from 'class-transformer'
import {
  validate as getValidationErrors,
  ValidationError as ClassValidatorValidationError,
} from 'class-validator'
import { ValidationError } from '../domain/errors/ValidationError'

export class ValidationServiceClassValidator implements ValidationService {
  async validate<T>(type: Type<T>, toValidate: unknown) {
    const instance = plainToInstance(type, toValidate)

    await this.ensureIsValid(instance as Record<string, unknown>)

    return instance
  }

  private async ensureIsValid(obj: Record<string, unknown>) {
    const validationErrors = await getValidationErrors(obj)

    if (validationErrors.length > 0)
      throw new ValidationError(this.buildErrorMessage(validationErrors))
  }

  private buildErrorMessage(validationErrors: ClassValidatorValidationError[]) {
    let messages: string[] = []

    validationErrors.forEach((error) => {
      if (error.constraints) messages = [...messages, ...Object.values(error.constraints)]

      if (error.children) messages = [...messages, this.buildErrorMessage(error.children)]
    })

    return messages.join(', ').trim()
  }
}
