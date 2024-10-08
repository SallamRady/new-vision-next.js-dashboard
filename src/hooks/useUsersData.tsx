import { Api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { useQuery } from '@tanstack/react-query'
import { UserType } from '@/types/users/users-page-types'
import { getAuthSession } from '@/libs/auth/getAuthSession'

const fetchData = async () => {
  // prepare helper methods
  const session = await getAuthSession()
  const headers = {
    // 'X-Tenant': retriveFromLocalStorage(`xTenentId`)
  }
  console.log('ResponseResponse - 1', session)
  const Response = await axiosInstance.get<{ users: UserType[] }>(Api(`user`))
  console.log('ResponseResponse - 2', Response)
  return Response.data.users
}

export default function useUsersData() {
  return useQuery({
    queryKey: [`users-data`],
    queryFn: fetchData
  })
}
