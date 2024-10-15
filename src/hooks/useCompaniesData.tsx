import { api } from '@/Constants/api'
import axiosInstance from '@/libs/axiosConfig'
import { useQuery } from '@tanstack/react-query'

const fetchData = async (params: string) => {
  // prepare helper methods
  let url = params.length > 0 ? `user?${params}` : `user`
  const Response = await axiosInstance.get<ResponseType>(api`${url}`)

  return Response.data
}

export default function useCompaniesData(params: string) {
  return useQuery({
    queryKey: [`companies-data`, params],
    queryFn: () => fetchData(params)
  })
}
