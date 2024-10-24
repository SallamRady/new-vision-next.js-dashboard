import { useQuery } from '@tanstack/react-query'

import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import type { TenantType } from '@/types/companies/CompanyTableRowType'

const fetchData = async (id: number) => {
  // prepare helper methods
  const url = `tenant/${id}`
  const Response = await axiosInstance.get<{ tenant: TenantType }>(api`${url}`)

  return Response.data.tenant
}

export default function useCompanyDetails(id: number) {
  return useQuery({
    queryKey: [`company-details-data`, id],
    queryFn: () => fetchData(id)
  })
}
