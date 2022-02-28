import { UserBuilder } from '../../../../utils/builders/UserBuilder'
import { EmailAddress } from '../../domain/EmailAddress'
import { UserRepositoryFiles } from './UserRepositoryFiles'

describe('UserRepositoryFiles', () => {
  let repository: UserRepositoryFiles

  beforeEach(() => {
    repository = new UserRepositoryFiles()
  })

  describe('findByEmail', () => {
    describe('when user is not found', () => {
      it('returns undefined', async () => {
        const found = await repository.findByEmail(new EmailAddress('notfound@email.com'))

        expect(found).toBeUndefined()
      })
    })

    describe('when user is found', () => {
      it('returns that user', async () => {
        const user = new UserBuilder().withEmail('test@email.com').build()
        await repository.save(user)

        const found = await repository.findByEmail(new EmailAddress('test@email.com'))

        expect(found).toEqual(user)
      })
    })
  })
})
