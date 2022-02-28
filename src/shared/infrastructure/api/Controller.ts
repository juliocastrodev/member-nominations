import { Application, Handler } from 'express'
import { HttpMethod } from './HttpMethod'
import { ApplicationRequest } from './ApplicationRequest'

type ControllerConstructor = {
  method: HttpMethod
  route: string
  status?: number
}

export abstract class Controller {
  constructor(private readonly props: ControllerConstructor) {}

  abstract handle(req: ApplicationRequest): unknown

  registerOn(app: Application) {
    const { method, route } = this.props

    switch (method) {
      case HttpMethod.GET:
        app.get(route, this.applicationHandler)
        break
      case HttpMethod.POST:
        app.post(route, this.applicationHandler)
        break
      case HttpMethod.PATCH:
        app.patch(route, this.applicationHandler)
        break
      case HttpMethod.PUT:
        app.put(route, this.applicationHandler)
        break
      case HttpMethod.DELETE:
        app.delete(route, this.applicationHandler)
        break
    }
  }

  private applicationHandler: Handler = async (req, res, next) => {
    try {
      const responseBody = await this.handle(req)

      res.status(this.props.status ?? 200)
      res.json(responseBody)
    } catch (err) {
      console.error(err)

      next(err)
    }
  }
}
