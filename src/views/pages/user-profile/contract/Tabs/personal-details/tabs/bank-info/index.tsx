import { useQuery } from '@tanstack/react-query'

import { Backdrop, CircularProgress, Stack } from '@mui/material'

import SingleBankForm from './SingleBankForm'
import { getAuthHeaders } from '@/libs/headers/headerServices'
import { getUserBankAccounts } from '@/utils/api/user/get-user-bank-accounts'

function BankInfo() {
  const {
    data: bankAccounts,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['Bank Info'],
    async queryFn() {
      const headers = await getAuthHeaders()
      const data = await getUserBankAccounts(headers)

      return data
    }
  })

  return (
    <>
      <Backdrop open={isLoading}>
        <CircularProgress />
      </Backdrop>
      <Stack spacing={14}>
        {bankAccounts?.map(bankAccount => (
          <SingleBankForm
            key={[bankAccount.id, bankAccount.active].join()}
            refresh={refetch}
            bankAccount={bankAccount}
          />
        ))}
        <SingleBankForm key={`${bankAccounts?.length}-create`} refresh={refetch} />
      </Stack>
    </>
  )
}

export default BankInfo
