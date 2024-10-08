import { Api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { useQuery } from '@tanstack/react-query'
import { UserType } from '@/types/users/users-page-types'

const fetchData = async () => {
  const Response = await axiosInstance.get<{ users: UserType[] }>(Api(`user`))
  console.log('ResponseResponse', Response)
  return Response.data.users
}

export default function useUsersData() {
  return useQuery({
    queryKey: [`users-data`],
    queryFn: fetchData
  })
}
