import { Api } from '@/Constants/Api'
import { LoginIDType } from '@/types/system-admin/login-ids'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchData = async () => {
  const Response = await axios.get<{ identifiers: LoginIDType[] }>(Api(`identifiers`))
  return Response.data.identifiers
}

export default function useLoginIdentifiers() {
  return useQuery({
    queryKey: [`login-identifiers-data`],
    queryFn: fetchData
  })
}
