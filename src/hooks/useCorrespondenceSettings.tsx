import { useQuery } from '@tanstack/react-query'

import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'

const fetchData = async () => {
  const Response = await axiosInstance.get(api`external_integration`)

  return Response.data.login_ways
}

export default function useCorrespondenceSettings() {
  return useQuery({
    queryKey: [`correspondence-settings-data`],
    queryFn: fetchData
  })
}
