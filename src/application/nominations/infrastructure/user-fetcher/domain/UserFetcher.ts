import { UserId } from '../../../../../shared/domain/users/UserId'
import { EmailAdress } from '../../../../users/domain/EmailAddress'

export interface UserFetcher {
  findEmailOf(userId: UserId): Promise<EmailAdress | undefined>
}
