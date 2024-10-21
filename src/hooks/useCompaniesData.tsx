import { useQuery } from '@tanstack/react-query'

import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import type { TenantType } from '@/types/companies/CompanyTableRowType'

const fetchData = async (params: string) => {
  // prepare helper methods
  const url = params.length > 0 ? `tenant?${params}` : `tenant`
  const Response = await axiosInstance.get<{ tenants: TenantType[] }>(api`${url}`)

  return Response.data.tenants
}

export default function useCompaniesData(params: string) {
  return useQuery({
    queryKey: [`companies-data`, params],
    queryFn: () => fetchData(params)
  })
}
