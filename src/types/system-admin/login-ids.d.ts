export type LoginIDType = {
  id: number
  name: string
  number_users: number
  companies: { id: number; name: string }[]
  status: boolean
}
