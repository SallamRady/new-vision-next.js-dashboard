import { useQuery } from '@tanstack/react-query'

import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import type { LoginWayType } from '@/types/login-way'

const fetchData = async () => {
  const Response = await axiosInstance.get<{ login_ways: LoginWayType[] }>(api`login-ways`)

  return Response.data.login_ways
}

export default function useLoginWays() {
  return useQuery({
    queryKey: [`login-ways-data`],
    queryFn: fetchData
  })
}
