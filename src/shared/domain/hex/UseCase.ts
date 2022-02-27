export abstract class UseCase<Params, Result> {
  abstract execute(params?: Params): Result | Promise<Result>
}
