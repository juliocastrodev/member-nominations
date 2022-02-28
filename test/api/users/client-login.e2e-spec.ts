import { DomainErrorCode } from '../../../src/shared/domain/errors/DomainErrorCode'
import { Role } from '../../../src/shared/domain/users/Role'
import { MARGOT, TYLER } from '../../../src/utils/fixtures/people'
import { payloadFromJWT } from '../../../src/utils/payloadFromJWT'
import { TestClient } from '../../utils/test-client'

describe('POST /users/login', () => {
  it('returns an access token if credentials are valid', async () => {
    const client = new TestClient()
    const {
      body: { userId },
    } = await client.registerUser({ user: MARGOT })

    const {
      body: { token },
    } = await client.login({ email: MARGOT.email, password: MARGOT.password }).expect(201)
    const payload = payloadFromJWT(token)

    expect(payload).toEqual({
      sub: userId,
      role: Role.MEMBER,
      iat: expect.any(Number),
      exp: expect.any(Number),
    })
  })

  it('fails if the user does not exist', async () => {
    const client = new TestClient()

    const { body } = await client.login().expect(401)

    expect(body.code).toEqual(DomainErrorCode.USER_AUTHENTICATION_ERROR)
  })

  it('fails if the password is not correct', async () => {
    const client = new TestClient()
    await client.registerUser({ user: MARGOT })

    const { body } = await client
      .login({ email: MARGOT.email, password: TYLER.password })
      .expect(401)

    expect(body.code).toEqual(DomainErrorCode.USER_AUTHENTICATION_ERROR)
  })
})
