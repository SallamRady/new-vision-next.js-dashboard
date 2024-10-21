import axios from 'axios'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { TableSchema, TableSchemaRow } from '@/types/api/table-schema'

interface Root {
  tenants: TableSchemaRow[]
  schema: TableSchema
  tenants_count: number
  active_tenants_count: number
  message: string
  status: boolean
}

export const GetCompaniesTable = async (headers: AuthHeaders) => {
  return (await axios.get<Root>(api`tenant-preview`, { headers })).data
}
