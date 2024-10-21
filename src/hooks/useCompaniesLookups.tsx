import { useQuery } from '@tanstack/react-query'

import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import type { CompaniesLookUpsType } from '@/types/companies/CompanyTableRowType'

const fetchData = async (params: string) => {
  // prepare helper methods
  const url = params.length > 0 ? `lookup/tenant/lookups?${params}` : `lookup/tenant/lookups`
  const Response = await axiosInstance.get<CompaniesLookUpsType>(api`${url}`)

  return Response.data
}

export default function useCompaniesLookups(params: string) {
  return useQuery({
    queryKey: [`companies-lookups-data`, params],
    queryFn: () => fetchData(params)
  })
}
