import axios from 'axios'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { Permission } from '@/types/api/common/Role'

export const getPermissions = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<{
      permissions: Permission[]
    }>(api`get-all-permissions`, { headers })

    return res.data.permissions
  } catch (error: any) {
    console.log(error?.response), console.log('headers ', headers)
  }
}
