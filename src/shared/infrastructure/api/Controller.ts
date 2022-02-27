import { Application, NextFunction, Request, Response } from 'express'
import { HttpMethod } from './HttpMethod'

type ControllerConstructor = {
  method: HttpMethod
  route: string
}

export abstract class Controller {
  constructor(private readonly props: ControllerConstructor) {}

  abstract handle(req: Request): unknown

  registerOn(app: Application) {
    const { method, route } = this.props

    switch (method) {
      case HttpMethod.GET:
        app.get(route, (...params) => this.handleAndRespond(...params))
        break
      case HttpMethod.POST:
        app.post(route, (...params) => this.handleAndRespond(...params))
        break
      case HttpMethod.PATCH:
        app.patch(route, (...params) => this.handleAndRespond(...params))
        break
      case HttpMethod.PUT:
        app.put(route, (...params) => this.handleAndRespond(...params))
        break
      case HttpMethod.DELETE:
        app.delete(route, (...params) => this.handleAndRespond(...params))
        break
    }
  }

  private async handleAndRespond(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this.handle(req))
    } catch (err) {
      next(err)
    }
  }
}
