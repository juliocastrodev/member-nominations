import express, { Application } from 'express'
import { config } from '../config'
import { controllers as usersControllers } from './users/controllers'
import morgan from 'morgan'

export class Api {
  private readonly app: Application

  constructor() {
    this.app = express()

    this.setupMiddlewares()
    this.setupControllers()
  }

  private setupControllers() {
    const controllers = [...usersControllers]

    controllers.forEach((controller) => controller.registerOn(this.app))
  }

  private setupMiddlewares() {
    this.app.use(morgan('common'))
  }

  listen() {
    const { port } = config.api

    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}
