import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { LoginIDType } from '@/types/system-admin/login-ids'
import { useQuery } from '@tanstack/react-query'

const fetchData = async () => {
  const Response = await axiosInstance.get<{ identifiers: LoginIDType[] }>(api`identifiers`)
  return Response.data.identifiers
}

export default function useLoginIdentifiers() {
  return useQuery({
    queryKey: [`login-identifiers-data`],
    queryFn: fetchData
  })
}
