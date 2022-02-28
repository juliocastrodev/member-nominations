import { Application, Handler, Request } from 'express'
import { Role } from '../../domain/users/Role'
import { authFor } from './authFor'
import { HttpMethod } from './HttpMethod'

type ControllerConstructor = {
  method: HttpMethod
  route: string
  roles?: Role[]
}

export abstract class Controller {
  constructor(private readonly props: ControllerConstructor) {}

  abstract handle(req: Request): unknown

  registerOn(app: Application) {
    const { method, route, roles } = this.props

    let handlers: Handler[] = [this.applicationHandler]
    if (roles) handlers = [authFor(roles), ...handlers]

    switch (method) {
      case HttpMethod.GET:
        app.get(route, ...handlers)
        break
      case HttpMethod.POST:
        app.post(route, ...handlers)
        break
      case HttpMethod.PATCH:
        app.patch(route, ...handlers)
        break
      case HttpMethod.PUT:
        app.put(route, ...handlers)
        break
      case HttpMethod.DELETE:
        app.delete(route, ...handlers)
        break
    }
  }

  private applicationHandler: Handler = async (req, res, next) => {
    try {
      res.json(await this.handle(req))
    } catch (err) {
      next(err)
    }
  }
}
