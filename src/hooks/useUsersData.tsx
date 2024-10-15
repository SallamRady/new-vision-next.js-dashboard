import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { useQuery } from '@tanstack/react-query'
import { UserType } from '@/types/users/users-page-types'
import { getAuthSession } from '@/libs/auth/getAuthSession'

type ResponseType = {
  count_active_users: number
  count_inactive_users: number
  users: UserType[]
  users_count: number
  users_count_last_month: number
}
const fetchData = async (params: string) => {
  // prepare helper methods
  let url = params.length > 0 ? `user?${params}` : `user`
  const Response = await axiosInstance.get<ResponseType>(api`${url}`)

  return Response.data
}

export default function useUsersData(params: string) {
  return useQuery({
    queryKey: [`users-data`, params],
    queryFn: () => fetchData(params)
  })
}
