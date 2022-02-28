import { Application } from 'express'
import request from 'supertest'
import { Api } from '../../src/api/Api'
import { UNIVERSITY_PARTNER } from '../../src/utils/fixtures/nominations'
import { MARGOT, TYLER } from '../../src/utils/fixtures/people'
import { payloadFromJWT } from '../../src/utils/payloadFromJWT'

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
}
