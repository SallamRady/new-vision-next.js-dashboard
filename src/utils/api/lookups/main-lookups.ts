import { api } from '@/Constants/Api'
import { AuthHeaders } from '@/types/AuthHeaders'
import { GetMainLookupsRoot } from '@/types/api/Lookups/main-lookups'
import axios from 'axios'

// Params type for getMainLookups
interface LookupParams {
  country_id?: number | string
  name?: string
  global_id?: string | string
}

export const getMainLookups = async (params: LookupParams, headers: AuthHeaders) => {
  try {
    const res = await axios.get<GetMainLookupsRoot>(api`lookups`, {
      headers,
      params // Pass the params object directly
    })
    return res.data // You can handle the return type as per your requirement
  } catch (error: any) {
    console.error(error?.response)
    console.log('params:', params)
    console.log('headers:', headers)
  }
}
