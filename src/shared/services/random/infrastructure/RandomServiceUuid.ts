import { v4 } from 'uuid'
import { RandomService } from '../domain/RandomService'

export class RandomServiceUuid implements RandomService {
  generateUuidV4() {
    return v4()
  }
}
