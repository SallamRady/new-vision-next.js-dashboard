import { api } from '@/Constants/Api'
import { AuthHeaders } from '@/types/AuthHeaders'
import { Permission } from '@/types/api/common/Role'
import axios from 'axios'

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
