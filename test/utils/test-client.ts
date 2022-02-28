import { Application } from 'express'
import request from 'supertest'
import { Api } from '../../src/api/Api'
import { NominationSnapshot } from '../../src/application/nominations/domain/Nomination'
import { Status } from '../../src/application/nominations/domain/Status'
import { config } from '../../src/config'
import { UNIVERSITY_PARTNER } from '../../src/utils/fixtures/nominations'
import { MARGOT, TYLER } from '../../src/utils/fixtures/people'
import { readFromFile } from '../../src/utils/readFromFile'
import { writeToFile } from '../../src/utils/writeToFile'

export class TestClient {
  private readonly app: Application

  constructor() {
    this.app = new Api().app
  }

  registerUser({
    user = {
      name: MARGOT.name,
      email: MARGOT.email,
      password: MARGOT.password,
    },
    jwt = TYLER.jwt,
  } = {}) {
    const { name, email, password } = user

    return request(this.app)
      .post('/users')
      .send({ name, email, password })
      .auth(jwt, { type: 'bearer' })
  }

  login({ email = MARGOT.email, password = MARGOT.password } = {}) {
    return request(this.app).post('/users/login').send({ email, password })
  }

  async registerAndLogin({
    user = {
      name: MARGOT.name,
      email: MARGOT.email,
      password: MARGOT.password,
    },
    jwt = TYLER.jwt,
  } = {}) {
    await this.registerUser({ user, jwt })

    const {
      body: { token },
    } = await this.login(user)

    return token as string
  }

  registerNomination({
    nomineeEmail = UNIVERSITY_PARTNER.nomineeEmail,
    reason = UNIVERSITY_PARTNER.reason,
    scores = UNIVERSITY_PARTNER.scores,
    jwt = MARGOT.jwt,
  } = {}) {
    return request(this.app)
      .post('/nominations')
      .send({ nomineeEmail, reason, scores })
      .auth(jwt, { type: 'bearer' })
  }

  async registerMultipleNominations({
    number = 10,
    status = Status.PENDING,
    jwt = MARGOT.jwt,
    nomineeEmailPrefix = 'test',
  } = {}) {
    let nominationIds: string[] = []

    for (let i = 0; i < number; i++) {
      const {
        body: { nominationId },
      } = await this.registerNomination({
        ...UNIVERSITY_PARTNER,
        nomineeEmail: `${nomineeEmailPrefix}.${status}.${i}@email.com`.toLowerCase(),
        jwt,
      })

      await this.changeNominationStatus(nominationId, status)

      nominationIds = [...nominationIds, nominationId]
    }

    return nominationIds
  }

  async changeNominationStatus(nominationId: string, status: Status) {
    const sourceFile = `${config.persistence.dir}/nominations.json`

    const snapshots = (await readFromFile<NominationSnapshot[]>(sourceFile)) ?? []

    const nominationIndex = snapshots.findIndex(
      (snapshot) => snapshot.nominationId === nominationId
    )

    snapshots[nominationIndex].status = status

    await writeToFile(sourceFile, snapshots)
  }

  listNominations({
    refererEmail = undefined as string | undefined,
    status = undefined as Status | undefined,
    jwt = TYLER.jwt,
  } = {}) {
    return request(this.app)
      .get('/nominations')
      .query({ refererEmail, status })
      .auth(jwt, { type: 'bearer' })
  }
}
