import { EmailAddress } from '../../domain/EmailAddress'
import { User, UserSnapshot } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { config } from '../../../../config'
import { writeToFile } from '../../../../utils/writeToFile'
import { readFromFile } from '../../../../utils/readFromFile'

const sourceFile = `${config.persistence.dir}/users.json`

export class UserRepositoryFiles implements UserRepository {
  async findByEmail(email: EmailAddress) {
    const userSnaphot = (await this.snapshots()).find(
      (snapshot) => snapshot.email === email.toSnapshot()
    )

    return userSnaphot && User.fromSnapshot(userSnaphot)
  }

  async save(user: User) {
    const snapshots = [...(await this.snapshots()), user.toSnapshot()]

    await writeToFile(sourceFile, snapshots)
  }

  async snapshots() {
    return (await readFromFile<UserSnapshot[]>(sourceFile)) ?? []
  }
}
