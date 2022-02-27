import express, { Application } from 'express'
import { config } from '../config'
import { controllers as usersControllers } from './users/controllers'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from '../shared/infrastructure/api/errorHandler'

export class Api {
  private readonly app: Application

  constructor() {
    this.app = express()

    this.setupLogs()
    this.setupDocs()
    this.setupControllers()
    this.setupErrorHandler()
  }

  listen() {
    const { port } = config.api

    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }

  private setupLogs() {
    this.app.use(morgan('common'))
  }

  private setupDocs() {
    this.app.use(express.static('public'))
    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.json',
        },
      })
    )
  }

  private setupErrorHandler() {
    this.app.use(errorHandler)
  }

  private setupControllers() {
    const controllers = [...usersControllers]

    controllers.forEach((controller) => controller.registerOn(this.app))
  }
}
