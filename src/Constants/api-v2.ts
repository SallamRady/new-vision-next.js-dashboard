import { Domain } from './Domain'

export function api(strings: TemplateStringsArray, ...values: unknown[]): string {
  // Join the strings and values to form the final path
  const path = strings.reduce((result, string, i) => {
    return result + string + (values[i] || '')
  }, '')

  const api = `${Domain()}api/`
  return api + path
}
