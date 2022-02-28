import { DomainErrorCode } from '../../../src/shared/domain/errors/DomainErrorCode'
import { Role } from '../../../src/shared/domain/users/Role'
import { MARGOT } from '../../../src/utils/fixtures/people'
import { TestClient } from '../../utils/test-client'

describe('POST /users', () => {
  it('registers a user', async () => {
    const client = new TestClient()

    const { body } = await client.registerUser({ user: MARGOT }).expect(201)

    expect(body).toEqual({
      userId: expect.any(String),
      name: MARGOT.name,
      email: MARGOT.email,
      role: Role.MEMBER,
    })
  })

  it('fails if user is already registered', async () => {
    const client = new TestClient()
    await client.registerUser({ user: MARGOT }).expect(201)

    const { body } = await client.registerUser({ user: MARGOT }).expect(409)

    expect(body.code).toEqual(DomainErrorCode.USER_ALREADY_REGISTERED)
  })

  it('fails if it is not an admin who makes the request', async () => {
    const client = new TestClient()

    const { body } = await client.registerUser({ jwt: MARGOT.jwt }).expect(403)

    expect(body.code).toEqual('AUTH_ERROR')
  })
})
