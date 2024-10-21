import axios from 'axios'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { Role } from '@/types/api/common/Role'

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
