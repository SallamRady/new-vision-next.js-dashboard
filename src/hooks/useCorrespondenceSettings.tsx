import { Api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { LoginWayType } from '@/types/login-way'
import { useQuery } from '@tanstack/react-query'

const fetchData = async () => {
  const Response = await axiosInstance.get(Api(`external_integration`))
  console.log('ResponseResponseResponsecorrespondence', Response)
  return Response.data.login_ways
}

export default function useCorrespondenceSettings() {
  return useQuery({
    queryKey: [`correspondence-settings-data`],
    queryFn: fetchData
  })
}
