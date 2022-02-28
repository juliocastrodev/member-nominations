import fse from 'fs-extra'
import { config } from '../../src/config'

beforeEach(async () => {
  await fse.rm(config.persistence.dir, { force: true, recursive: true })
})
