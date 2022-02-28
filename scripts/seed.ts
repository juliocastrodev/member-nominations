import { UserRepositoryFiles } from '../src/application/users/infrastructure/repositories/UserRepositoryFiles'
import { JwtServiceJsonWebToken } from '../src/shared/services/jwt/infrastructure/JwtServiceJsonWebToken'
import { UserBuilder } from '../src/utils/builders/UserBuilder'
import { MARGOT, TYLER } from '../src/utils/fixtures/people'
import fse from 'fs-extra'
import { config } from '../src/config'
import { TestClient } from '../test/utils/test-client'
import { Role } from '../src/shared/domain/users/Role'

async function seed() {
  await fse.rm(config.persistence.dir, { force: true, recursive: true })
  const testClient = new TestClient()

  const margotToken = await testClient.registerAndLogin({ user: MARGOT })

  const {
    body: { userId },
  } = await testClient.registerUser({ user: TYLER })
  await testClient.changeUserRole(userId, Role.ADMIN)
  const {
    body: { token: tylerToken },
  } = await testClient.login(TYLER)

  console.log({
    admin: {
      ...TYLER,
      jwt: tylerToken,
    },
    member: {
      ...MARGOT,
      jwt: margotToken,
    },
  })
}

seed()
