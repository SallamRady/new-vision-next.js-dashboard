import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { useQuery } from '@tanstack/react-query'
import { UserLookUpsType } from '@/types/users/users-page-types'

const fetchData = async () => {
  const Response = await axiosInstance.get<UserLookUpsType>(api`lookup/create-user-lookup`)

  return Response.data
}

export default function useUserLookUpsData() {
  return useQuery({
    queryKey: [`user-lookup-data`],
    queryFn: fetchData
  })
}
