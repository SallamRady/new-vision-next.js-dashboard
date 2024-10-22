import axios from 'axios'

import type { LaravelPagination } from './../../../types/api/common/LaravelPagintaion/index'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { TableSchema, TableSchemaRow } from '@/types/api/table-schema'
import type { Tenant } from '@/types/api/common/Tenant'

interface Root {
  tenants_preview: LaravelPagination<TableSchemaRow[]>
  tenants: LaravelPagination<Tenant[]>
  schema: TableSchema
  tenants_count: number
  active_tenants_count: number
  message: string
  status: boolean
}

export const getCompaniesTable = async (headers: AuthHeaders, params: GetCompaniesTableParams) => {
  const data = (await axios.get<Root>(api`tenant`, { headers, params })).data

  return data
}

export type GetCompaniesTableParams = {
  page?: number
  name?: string
  limit?: any
}
