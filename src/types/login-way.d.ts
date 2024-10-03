export type LoginWayType = {
  country_id: number
  created_at: string
  date: string
  id: number
  limit: number
  name: string
  provider_id: number
  provider_type_id: number
  updated_at: string
  lookup: LoginWayLookUpType
}

export type LoginWayLookUpType = { name: String }
