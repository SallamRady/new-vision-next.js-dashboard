import { Domain } from './Domain'

export const Api = (path: string) => {
  return `${Domain('api/')}${path}`
}
