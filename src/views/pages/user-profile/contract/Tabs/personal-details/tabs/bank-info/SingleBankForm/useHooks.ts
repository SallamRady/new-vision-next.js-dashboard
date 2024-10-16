import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'
import { getMainLookups } from '@/utils/api/lookups/main-lookups'
import { Bank } from '@/types/api/common/Bank'
import { UserBankAccount } from '@/types/api/common/User'

// Define the Zod schema
const addBankSchema = z.object({
  bank_id: z.number().min(1, 'Bank ID is required'),
  country_id: z.number().min(1, 'Country ID is required'),
  currency_id: z.number().min(1, 'Currency ID is required'),
  holder_name: z.string().min(8, 'Holder name is required'),
  tenant_id: z.number().or(z.string()),
  iban: z.string().min(1, 'IBAN is required'),
  account_number: z.string().min(1, 'Account number is required'),
  code_bic: z.string().min(1, 'BIC code is required'),
  status: z.union([z.string(), z.number()]).refine(val => ['-1', '0', '1', '2'].includes(String(val)), {
    message: 'Status must be one of -1 (default), 0 (not use), 1 (salaries), or 2 (custody)'
  })
})

// Define the form values type using zod schema inference
type AddBankFormValues = z.infer<typeof addBankSchema>

export const useHooks = ({ bankAccount }: Props) => {
  const form = useForm<AddBankFormValues>({
    resolver: zodResolver(addBankSchema),
    defaultValues: bankAccount
      ? {
          account_number: bankAccount.account_number,
          bank_id: bankAccount.bank_id,
          code_bic: bankAccount.code_bic,
          country_id: bankAccount.country_id,
          currency_id: bankAccount.currency_id,
          iban: bankAccount.iban,
          status: bankAccount.status,
          tenant_id: bankAccount.tenant_id
        }
      : undefined
  })
  const { watch } = form
  const country_id = watch('country_id')

  const query = useQuery({
    queryKey: ['main-lookups', country_id],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()
      const res = await getMainLookups({ country_id }, headers)
      return res
    }
  })

  return { form, query }
}

type Props = {
  bankAccount?: UserBankAccount
}
