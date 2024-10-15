import { api } from '@/Constants/api'
import axiosInstance from '@/libs/axiosConfig'
import { CompaniesLookUpsType } from '@/types/companies/CompanyTableRowType'
import { useQuery } from '@tanstack/react-query'

const fetchData = async (params: string) => {
  // prepare helper methods
  let url = params.length > 0 ? `lookup/tenant/lookups?${params}` : `lookup/tenant/lookups`
  const Response = await axiosInstance.get<CompaniesLookUpsType>(api`${url}`)

  return Response.data
}

export default function useCompaniesLookups(params: string) {
  return useQuery({
    queryKey: [`companies-lookups-data`, params],
    queryFn: () => fetchData(params)
  })
}
