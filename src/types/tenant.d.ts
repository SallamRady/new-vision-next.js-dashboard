import { Tenant } from './api/common/Tenant'
import { LoginWayType } from './login-way'
import { MediaType } from './media'

export type TenentType = {
  code: string
  commercial_register: string
  country_id: number
  created_at: string
  id: number
  is_email: boolean
  is_identity: boolean
  is_phone: boolean
  login_ways: LoginWayType[]
  media: MediaType[]
  name: string
  pivot: PivotType
  tenancy_db_name: string
  updated_at: string
  user_id: number
  website_url: string
}
export type PivotType = { global_user_id: number; tenant_id: number }
