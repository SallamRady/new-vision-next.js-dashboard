import axios from 'axios'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'

interface Root {
  url: string
}

export const getExportCompaniesUrl = async (headers: AuthHeaders, params: GetExportCompaniesUrlParams) => {
  const data = (await axios.get<Root>(api`tenant/export`, { headers, params })).data

  return data
}

export type GetExportCompaniesUrlParams = {
  ids: (string | number)[]
}
