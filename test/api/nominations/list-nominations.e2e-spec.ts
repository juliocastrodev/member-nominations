import { NominationListItemDTO } from '../../../src/api/nominations/dtos/NominationListItemDTO'
import { Status } from '../../../src/application/nominations/domain/Status'
import { MARGOT, TYLER } from '../../../src/utils/fixtures/people'
import { TestClient } from '../../utils/test-client'

describe('GET /nominations', () => {
  let client: TestClient
  const numberOfPending = 2
  const numberOfRejected = 5
  const numberOfApproved = 3

  beforeEach(async () => {
    client = new TestClient()

    const accessToken = await client.registerAndLogin({ user: MARGOT })

    await client.registerMultipleNominations({
      number: numberOfPending,
      status: Status.PENDING,
      jwt: accessToken,
    })
    await client.registerMultipleNominations({
      number: numberOfRejected,
      status: Status.REJECTED,
      jwt: accessToken,
    })
    await client.registerMultipleNominations({
      number: numberOfApproved,
      status: Status.APPROVED,
      jwt: accessToken,
    })
  })

  it('finds all non-rejected nominations', async () => {
    const { body: nominations } = await client
      .listNominations({ status: Status.PENDING })
      .expect(200)

    expect(nominations).toHaveLength(numberOfPending)
    nominations.forEach((nomination: NominationListItemDTO, index: number) =>
      expect(nomination).toEqual({
        nominationId: expect.any(String),
        refererEmail: MARGOT.email,
        nomineeEmail: `test.pending.${index}@email.com`,
        status: Status.PENDING,
      })
    )
  })

  it('finds the nomination given the referer email', async () => {
    const tylerToken = await client.registerAndLogin({ user: TYLER })
    const [tylerNomination1Id, tylerNomination2Id] = await client.registerMultipleNominations({
      number: 2,
      jwt: tylerToken,
      nomineeEmailPrefix: 'from.tyler',
    })

    const { body: nominations } = await client
      .listNominations({ refererEmail: TYLER.email })
      .expect(200)

    expect(nominations).toEqual([
      {
        nominationId: tylerNomination1Id,
        nomineeEmail: 'from.tyler.pending.0@email.com',
        refererEmail: TYLER.email,
        status: Status.PENDING,
      },
      {
        nominationId: tylerNomination2Id,
        nomineeEmail: 'from.tyler.pending.1@email.com',
        refererEmail: TYLER.email,
        status: Status.PENDING,
      },
    ])
  })

  it('fails if it is not an admin who makes the request', async () => {
    const client = new TestClient()

    const { body } = await client.listNominations({ jwt: MARGOT.jwt }).expect(403)

    expect(body.code).toEqual('AUTH_ERROR')
  })
})
