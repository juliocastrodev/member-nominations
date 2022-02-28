import { Type } from './Type'

export interface ValidationService {
  validate<T>(type: Type<T>, toValidate: unknown): Promise<T>
}
