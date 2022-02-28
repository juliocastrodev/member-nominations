import express, { Application } from 'express'
import { config } from '../config'
import { controllers as usersControllers } from './users/controllers'
import { controllers as nominationsControllers } from './nominations/controllers'
import morgan from 'morgan'
import { errorHandler } from '../shared/infrastructure/api/errorHandler'
import { includeAuth } from '../shared/infrastructure/api/includeAuth'

export class Api {
  readonly app: Application

  constructor() {
    this.app = express()

    this.setupLogs()
    this.setupParsers()
    this.setupControllers()
    this.setupErrorHandler()
  }

  listen() {
    const { port } = config.api

    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }

  private setupParsers() {
    this.app.use(express.json())
    this.app.use(includeAuth)
  }

  private setupLogs() {
    this.app.use(morgan('common'))
  }

  private setupErrorHandler() {
    this.app.use(errorHandler)
  }

  private setupControllers() {
    const controllers = [...usersControllers, ...nominationsControllers]

    controllers.forEach((controller) => controller.registerOn(this.app))
  }
}
