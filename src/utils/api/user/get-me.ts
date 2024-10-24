import type { AxiosError } from 'axios'
import axios from 'axios'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { User } from '@/types/api/common/User'

export const getMe = async (headers: AuthHeaders, userId?: unknown) => {
  try {
    const res = await axios.get<{ user: User }>(api`get-user${userId ? `/${userId}` : ''}`, { headers })

    return res.data.user
  } catch (error) {
    const err = error as AxiosError<any>

    console.log(err.response?.status)
    console.log(err.response?.data)
  }
}
