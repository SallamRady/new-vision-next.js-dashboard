import type { Country } from '../Country'
import type { Media } from '../Media'

export interface Tenant {
  id: number
  created_at: string
  updated_at: string
  data: any
  user_id?: number
  country_id?: number
  is_email: number
  is_identity: number
  is_phone: number
  tenant_type_id: number
  registration_type_id: number
  status?: number
  role_id: number
  tenant_field_id: number
  code?: string
  name: string
  email: string
  website_url?: string
  tenancy_db_name: string
  commercial_register?: string
  media?: Media[]
  type?: Type
  country?: Country
  forms?: Form[]
  registration_type: RegistrationType
  package?: Package
  phone?: string
  pivot?: Pivot
}

interface Type {
  id: number
  name: string
  description: string
  responsibility: string
  partner_number: string
  created_at: any
  updated_at: any
}

interface Form {
  id: number
  tenant_form_id: number
  tenant_id: number
  data: Data
  created_at: string
  updated_at: string
  media: Media[]
  type: Type2
}

interface Data {
  edata?: string
  sdate: string
  edate?: string
}

interface Type2 {
  id: number
  name: string
  iterateable: number
  created_at: any
  updated_at: any
  name_en: string
}

interface RegistrationType {
  id: number
  name: string
  type: string
}

interface Package {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
}

interface Pivot {
  global_user_id: number
  tenant_id: number
}
