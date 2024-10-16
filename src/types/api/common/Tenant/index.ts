export interface Tenant {
  id: number
  created_at: string
  updated_at: string
  data: any
  user_id: number
  country_id: number
  is_email: number
  is_identity: number
  is_phone: number
  tenant_type_id: number
  registration_type_id: number
  status: any
  code: string
  name: string
  website_url: string
  tenancy_db_name: string
  commercial_register: string
  pivot: Pivot
}

interface Pivot {
  global_user_id: number
  tenant_id: number
}
