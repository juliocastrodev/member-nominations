import { UserId } from '../../../../../shared/domain/users/UserId'
import { EmailAddress } from '../../../../users/domain/EmailAddress'

export interface UserFetcher {
  findEmailOf(userId: UserId): Promise<EmailAddress | undefined>
}
