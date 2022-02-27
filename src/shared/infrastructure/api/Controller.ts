import { Application, Request, Response, NextFunction } from 'express'
import { HttpMethod } from './HttpMethod'

type ControllerConstructor = {
  method: HttpMethod
  route: string
}

export abstract class Controller {
  constructor(private readonly props: ControllerConstructor) {}

  abstract handle(req: Request, res: Response, next: NextFunction): void | Promise<void>

  registerOn(app: Application) {
    const { method, route } = this.props

    switch (method) {
      case HttpMethod.GET:
        app.get(route, (...params) => this.handle(...params))
        break
      case HttpMethod.POST:
        app.post(route, (...params) => this.handle(...params))
        break
      case HttpMethod.PATCH:
        app.patch(route, (...params) => this.handle(...params))
        break
      case HttpMethod.PUT:
        app.put(route, (...params) => this.handle(...params))
        break
      case HttpMethod.DELETE:
        app.delete(route, (...params) => this.handle(...params))
        break
    }
  }
}
