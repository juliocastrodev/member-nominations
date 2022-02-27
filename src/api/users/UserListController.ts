import { Request, Response } from 'express'
import { User } from '../../application/users/domain/User'
import { UserLister } from '../../application/users/use-cases/UserLister'
import { Controller } from '../../shared/infrastructure/api/Controller'
import { HttpMethod } from '../../shared/infrastructure/api/HttpMethod'

export class UserListController extends Controller {
  constructor(private readonly userLister: UserLister) {
    super({ method: HttpMethod.GET, route: '/users' })
  }

  async handle(_: Request, res: Response) {
    const users = await this.userLister.execute()

    res.json({ users: users.map(User.toSnapshot) })
  }
}
