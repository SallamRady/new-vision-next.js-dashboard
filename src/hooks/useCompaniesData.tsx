import { api } from '@/Constants/api'
import axiosInstance from '@/libs/axiosConfig'
import { TenantType } from '@/types/companies/CompanyTableRowType'
import { useQuery } from '@tanstack/react-query'

const fetchData = async (params: string) => {
  // prepare helper methods
  let url = params.length > 0 ? `tenant?${params}` : `tenant`
  const Response = await axiosInstance.get<{ tenants: TenantType[] }>(api`${url}`)

  return Response.data.tenants
}

export default function useCompaniesData(params: string) {
  return useQuery({
    queryKey: [`companies-data`, params],
    queryFn: () => fetchData(params)
  })
}
