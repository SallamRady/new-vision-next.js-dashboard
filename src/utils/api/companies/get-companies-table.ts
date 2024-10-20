import { api } from '@/Constants/Api'
import { AuthHeaders } from '@/types/AuthHeaders'
import { TableSchema, TableSchemaRow } from '@/types/api/table-schema'
import axios from 'axios'

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
