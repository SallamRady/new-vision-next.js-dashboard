import { useQuery } from '@tanstack/react-query'

import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import type { validationType } from '@/types/validationType'

const fetchData = async () => {
  const Response = await axiosInstance.get<{ validations: validationType[] }>(api`lookup/validations`)

  return Response.data.validations
}

export default function useValidationData() {
  return useQuery({
    queryKey: [`validations-data`],
    queryFn: fetchData
  })
}
