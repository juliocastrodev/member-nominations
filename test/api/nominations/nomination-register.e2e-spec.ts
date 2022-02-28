import { Status } from '../../../src/application/nominations/domain/Status'
import { DomainErrorCode } from '../../../src/shared/domain/errors/DomainErrorCode'
import { UNIVERSITY_PARTNER } from '../../../src/utils/fixtures/nominations'
import { MARGOT, TYLER } from '../../../src/utils/fixtures/people'
import { TestClient } from '../../utils/test-client'

describe('POST /nominations', () => {
  it('registers a nomination', async () => {
    const client = new TestClient()
    const accessToken = await client.registerAndLogin({ user: MARGOT })

    const { body } = await client
      .registerNomination({ ...UNIVERSITY_PARTNER, jwt: accessToken })
      .expect(201)

    expect(body).toEqual({
      nominationId: expect.any(String),
      refererEmail: MARGOT.email,
      nomineeEmail: UNIVERSITY_PARTNER.nomineeEmail,
      reason: UNIVERSITY_PARTNER.reason,
      scores: UNIVERSITY_PARTNER.scores,
      status: Status.PENDING,
    })
  })

  it('fails if referer does not exist', async () => {
    const client = new TestClient()

    const { body } = await client
      .registerNomination({ ...UNIVERSITY_PARTNER, jwt: MARGOT.jwt })
      .expect(404)

    expect(body.code).toEqual(DomainErrorCode.USER_NOT_FOUND)
  })

  it('fails if nomination is already registered', async () => {
    const client = new TestClient()
    const margotToken = await client.registerAndLogin({ user: MARGOT })
    const tylerToken = await client.registerAndLogin({ user: TYLER })
    await client.registerNomination({ ...UNIVERSITY_PARTNER, jwt: margotToken }).expect(201)

    const { body } = await client
      .registerNomination({ ...UNIVERSITY_PARTNER, jwt: tylerToken })
      .expect(409)

    expect(body.code).toEqual(DomainErrorCode.NOMINATION_ALREADY_REGISTERED)
  })
})
