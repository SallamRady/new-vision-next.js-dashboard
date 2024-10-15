import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getGridItem } from '@/components/get-grid-item'
import { Card, CardContent, Grid, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useQuery } from '@tanstack/react-query'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'
import { getMainLookups } from '@/utils/api/lookups/main-lookups'

// Define the Zod schema
const addBankSchema = z.object({
  bank_id: z.number().min(1, 'Bank ID is required and must be greater than 0'),
  country_id: z.number().min(1, 'Country ID is required and must be greater than 0'),
  tenant_id: z.number().min(1, 'Tenant ID is required and must be greater than 0'),
  currency: z.string().min(1, 'Currency is required'),
  iban: z.string().min(1, 'IBAN is required'),
  account_number: z.string().min(1, 'Account number is required'),
  code_bic: z.string().min(1, 'BIC code is required'),
  status: z
    .enum(['-1', '0', '1', '2'], {
      invalid_type_error: 'Status must be one of -1 (default), 0 (not use), 1 (salaries), or 2 (custody)'
    })
    .transform(val => parseInt(val, 10)) // Convert to number
})

// Define the form values type using zod schema inference
type AddBankFormValues = z.infer<typeof addBankSchema>

export const useHooks = () => {
  const form = useForm<AddBankFormValues>({
    resolver: zodResolver(addBankSchema)
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
