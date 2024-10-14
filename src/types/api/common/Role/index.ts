export interface Role {
  id: number
  name: string
  guard_name: string
  created_at: string
  updated_at: string
  permissions?: Permission[]
}

export interface Permission {
  id: number
  name: string
  guard_name: string
  label: string
  created_at: string
  updated_at: string
  pivot?: Pivot
}

export interface Pivot {
  role_id: number
  permission_id: number
}
