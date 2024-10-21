import axios from 'axios'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { User } from '@/types/api/common/User'

export const getMe = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<{ user: User }>(api`get-me`, { headers })

    return res.data.user
  } catch (error: any) {
    console.log(error?.response), console.log('headers ', headers)
  }
}
