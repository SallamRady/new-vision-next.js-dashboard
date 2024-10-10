import { CountryType } from '../system-admin/countries'
import { TenentType } from '../tenant'

export type UserType = {
  id: number
  name: string
  global_id: number
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
  user_type_id: number
  phone: string
  status: number
  identity: string
  otp: string
  otp_expire: string
  login_way_id: number
  can_set_pass: boolean
  passport: string
  iqama: string
  border_number: string
  country_id: number
  tenants: TenentType[]
}

type UserTypesType = {
  id: number
  name: string
  type: string
}

export type UserLookUpsType = {
  tenants: TenentType[]
  user_types: UserTypesType[]
  countries: CountryType[]
}
