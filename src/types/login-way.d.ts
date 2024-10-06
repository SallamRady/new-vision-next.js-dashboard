export type LoginWayType = {
  id: number
  limit: number
  date: string
  name: string
  provider: { id: number; name: string }
  provider_id: number
  provider_type_id: number
  created_at: string
  updated_at: string
  country_id: number
  status: boolean
  number_users?: number
  lookup: LoginWayLookUpType
}

export type LoginWayLookUpType = { name: String }
