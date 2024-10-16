import { useQuery } from '@tanstack/react-query'
import SingleBankForm from './SingleBankForm'
import { getAuthHeaders } from '@/libs/headers/headerServices'
import { getUserBankAccounts } from '@/utils/api/user/get-user-bank-accounts'
import { Backdrop, CircularProgress, Stack } from '@mui/material'

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
      <Stack spacing={4}>
        {bankAccounts?.map(bankAccount => (
          <SingleBankForm key={bankAccount.id} refresh={refetch} bankAccount={bankAccount} />
        ))}
        <SingleBankForm refresh={refetch} />
      </Stack>
    </>
  )
}

export default BankInfo
