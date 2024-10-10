import { api } from '@/Constants/Api'
import { AuthHeaders } from '@/types/AuthHeaders'
import { User } from '@/types/api/common/User'
import axios from 'axios'

export const getMe = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<{ user: User }>(api`get-me`, { headers })
    return res.data.user
  } catch (error: any) {
    console.log(error?.response), console.log('headers ', headers)
  }
}
