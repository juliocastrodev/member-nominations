import express, { Application } from 'express'
import { config } from '../config'
import { controllers as usersControllers } from './users/controllers'
import { controllers as nominationsControllers } from './nominations/controllers'
import morgan from 'morgan'
import { errorHandler } from '../shared/infrastructure/api/errorHandler'

export class Api {
  private readonly app: Application

  constructor() {
    this.app = express()

    this.setupLogs()
    this.setupBodyParser()
    this.setupControllers()
    this.setupErrorHandler()
  }

  listen() {
    const { port } = config.api

    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }

  private setupBodyParser() {
    this.app.use(express.json())
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
