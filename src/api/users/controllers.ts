import { UserRepository } from '../../application/users/domain/UserRepository'
import { UserLister } from '../../application/users/use-cases/UserLister'
import { UserRepositoryMemory } from '../../persistence/users/UserRepositoryMemory'
import { Controller } from '../../shared/infrastructure/api/Controller'
import { UserListController } from './UserListController'

const repository: UserRepository = new UserRepositoryMemory()

const useCases = {
  userLister: new UserLister(repository),
}

export const controllers: Controller[] = [new UserListController(useCases.userLister)]
