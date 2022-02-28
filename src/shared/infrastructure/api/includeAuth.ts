import { Handler } from 'express'
import { ApplicationRequest } from './ApplicationRequest'

export const includeAuth: Handler = (req, _res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  ;(req as ApplicationRequest).auth = token

  next()
}
