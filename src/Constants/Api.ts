import { Domain } from './Domain'
import { api as apiv2 } from './api-v2'

export const Api = (path: string) => {
  return `${Domain('api/')}${path}`
}

export const api = apiv2
