import { Request } from 'express'

export type ApplicationRequest = Request & { auth?: string }
