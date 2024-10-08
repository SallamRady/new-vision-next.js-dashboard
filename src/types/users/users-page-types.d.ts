import { TenentType } from '../tenant'

export type UsersTableRowType = {
  id: number
  name: string
  email: string
  phone: string
  title: string
  branch: string
  company: string
  userType: 'Admin' | 'Employee'
  completionStatus: boolean
  avatar?: string
  actions?: string
}

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
  status: boolean
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
