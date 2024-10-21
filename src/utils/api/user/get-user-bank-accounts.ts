import axios from 'axios'

import { api } from '@/Constants/Api'
import type { AuthHeaders } from '@/types/AuthHeaders'
import type { UserBankAccount } from '@/types/api/common/User'

export const getUserBankAccounts = async (headers: AuthHeaders) => {
  try {
    const res = await axios.get<{
      new_banks: UserBankAccount[]
    }>(api`user-bank`, { headers })

    return res.data.new_banks
  } catch (error: any) {
    console.log(error?.response), console.log('headers ', headers)
  }
}
