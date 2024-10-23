import axios from 'axios'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'

interface Root {}

export const deleteCompany = async (headers: AuthHeaders, companiesIds: (string | number)[]) => {
  const data = (await axios.post<Root>(api`tenant/delete`, { ids: companiesIds }, { headers })).data

  return data
}
