import { UserRepository } from '../domain/UserRepository'
import { UserRegistrar } from './UserRegistrar'
import { mock } from 'jest-mock-extended'
import { User } from '../domain/User'
import { UserBuilder } from '../../../utils/builders/UserBuilder'
import { TYLER } from '../../../utils/fixtures/people'
import { UserAlreadyRegisteredError } from '../domain/errors/UserAlreadyRegisteredError'

const mocks = {
  repository: mock<UserRepository>(),
}

describe('UserRegistrar', () => {
  let useCase: UserRegistrar

  beforeEach(() => {
    jest.clearAllMocks()

    useCase = new UserRegistrar(mocks.repository)
  })

  describe('when user is not already registered', () => {
    beforeEach(() => {
      mocks.repository.findByEmail.mockResolvedValue(undefined)
    })

    it('saves the user using the repository', async () => {
      const user = new UserBuilder().build()

      await useCase.execute(user)

      expect(mocks.repository.save).toHaveBeenCalledWith(user)
    })
  })

  describe('when user is already registered', () => {
    let existingUser: User

    beforeEach(() => {
      existingUser = new UserBuilder().build()

      mocks.repository.findByEmail.mockResolvedValue(existingUser)
    })

    it('throws an error', async () => {
      const user = new UserBuilder().withEmail(TYLER.email).build()

      expect(() => useCase.execute(user)).rejects.toThrow(UserAlreadyRegisteredError)
    })
  })
})
