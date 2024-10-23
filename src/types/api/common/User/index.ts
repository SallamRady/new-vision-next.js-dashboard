import type { Bank } from '../Bank'
import type { Country } from '../Country'
import type { Currency } from '../Currency'
import type { Media } from '../Media'

export interface User {
  id: number
  name: string
  global_id: number
  email: string
  email_verified_at: any
  created_at: string
  updated_at: string
  user_type_id: number
  phone: string
  status: number
  identity: string
  otp: any
  otp_expire: any
  login_way_id: number
  can_set_pass: number
  passport: string
  iqama: any
  border_number: any
  country_id: number
  pictures?: Pictures
}

export interface UserBankAccount {
  id: number
  global_id?: number
  holder_name?: string
  bank_id?: number
  country_id?: number
  currency_id?: number
  iban?: string
  account_number?: string
  code_bic?: string
  status?: number
  created_at?: string
  updated_at?: string
  tenant_id?: number
  bank?: Bank
  country?: Country
  currency?: Currency
  active: number
}

interface Pictures {
  image?: Media[]
}
