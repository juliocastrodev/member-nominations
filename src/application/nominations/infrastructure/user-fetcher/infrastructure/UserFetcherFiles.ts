import { config } from '../../../../../config'
import { UserId } from '../../../../../shared/domain/users/UserId'
import { readFromFile } from '../../../../../utils/readFromFile'
import { EmailAdress } from '../../../../users/domain/EmailAddress'
import { UserFetcher } from '../domain/UserFetcher'

export class UserFetcherFiles implements UserFetcher {
  async findEmailOf(id: UserId) {
    const found = (await this.snapshots()).find(({ userId }) => userId === id.toSnapshot())

    return found && new EmailAdress(found.email)
  }

  async snapshots() {
    return (
      (await readFromFile<{ userId: string; email: string }[]>(
        `${config.persistence.dir}/users.json`
      )) ?? []
    )
  }
}
