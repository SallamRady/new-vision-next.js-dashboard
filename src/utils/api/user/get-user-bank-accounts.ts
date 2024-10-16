import { api } from '@/Constants/Api'
import { AuthHeaders } from '@/types/AuthHeaders'
import { UserBankAccount } from '@/types/api/common/User'
import axios from 'axios'

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
