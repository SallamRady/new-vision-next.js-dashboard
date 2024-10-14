import { api } from '@/Constants/Api'
import { AuthHeaders } from '@/types/AuthHeaders'
import { Role } from '@/types/api/common/Role'
import { User } from '@/types/api/common/User'
import axios from 'axios'

export const getRoles = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<{
      roles: Role[]
    }>(api`get-roles`, { headers })
    return res.data.roles
  } catch (error: any) {
    console.log(error?.response), console.log('headers ', headers)
  }
}
