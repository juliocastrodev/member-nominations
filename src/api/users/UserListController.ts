import { UserLister } from '../../application/users/use-cases/UserLister'
import { Controller } from '../../shared/infrastructure/api/Controller'
import { HttpMethod } from '../../shared/infrastructure/api/HttpMethod'
import { Get, Route } from 'tsoa'
import { UserListDTO } from './dtos/UserListDTO'

@Route('/users')
export class UserListController extends Controller {
  constructor(private readonly userLister: UserLister) {
    super({ method: HttpMethod.GET, route: '/users' })
  }

  @Get()
  async handle() {
    const users = await this.userLister.execute()

    return users.map(UserListDTO.fromDomain)
  }
}
