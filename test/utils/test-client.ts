import { Application } from 'express'
import request from 'supertest'
import { Api } from '../../src/api/Api'
import { MARGOT, TYLER } from '../../src/utils/fixtures/people'

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
}
