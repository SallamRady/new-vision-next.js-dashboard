'use client'

import { Controller } from 'react-hook-form'
import { getGridItem } from '@/components/get-grid-item'
import { Card, CardContent, Grid, MenuItem, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useHooks } from './useHooks'
import { UserBankAccount } from '@/types/api/common/User'
import axios from 'axios'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'
import { api } from '@/Constants/Api'
import { SuccessMessage, errorMessage } from '@/utils/notificationsMessages'

const GridItem = getGridItem({ xs: 12, md: 6 })

function SingleBankForm({ bankAccount, refresh }: Props) {
  // Initialize the form with react-hook-form and zodResolver for validation
  const {
    form: {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      control
    },
    query: { data: lookups }
  } = useHooks({ bankAccount })

  console.log(errors)

  // Form submission handler
  const onSubmit = handleSubmit(async data => {
    try {
      const headers = await getClientAuthHeaders()
      await axios.request({
        headers,
        data,
        ...(bankAccount
          ? {
              // Edit
              url: api`user-bank/${bankAccount.id}`,
              method: 'PUT'
            }
          : {
              // Create
              url: api`user-bank`,
              method: 'POST'
            })
      })
      SuccessMessage('تم الحفظ بنجاح')
      refresh()
    } catch (error) {
      errorMessage('تعذر في الحفظ')
    }
  })

  return (
    <Card variant='outlined'>
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={4}>
            <GridItem>
              <Controller
                control={control}
                name='country_id'
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='دولة البنك'
                    fullWidth
                    {...field}
                    error={!!error?.message}
                    helperText={error?.message}
                    select
                  >
                    {lookups?.countries?.map(country => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </GridItem>
            <GridItem>
              <Controller
                control={control}
                name='bank_id'
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='اسم البنك'
                    fullWidth
                    {...field}
                    error={!!error?.message}
                    helperText={error?.message}
                    select
                  >
                    {lookups?.banks?.map(bank => (
                      <MenuItem key={bank.id} value={bank.id}>
                        {bank.official_name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </GridItem>

            <GridItem>
              <Controller
                control={control}
                name='tenant_id'
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='اسم الشركة'
                    fullWidth
                    {...field}
                    error={!!error?.message}
                    helperText={error?.message}
                    select
                  >
                    {lookups?.tenants?.map(tenant => (
                      <MenuItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </GridItem>

            <GridItem>
              <Controller
                control={control}
                name='currency_id'
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='عملة الحساب'
                    fullWidth
                    {...field}
                    error={!!error?.message}
                    helperText={error?.message}
                    select
                  >
                    {lookups?.currencies?.map(currency => (
                      <MenuItem key={currency.id} value={currency.id}>
                        {currency.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </GridItem>
            <GridItem>
              <TextField
                label='اسم مالك الحساب "كما مكتوب علي البطاقة"'
                type='text'
                fullWidth
                {...register('holder_name')}
                error={!!errors.holder_name}
                helperText={errors.holder_name?.message}
              />
            </GridItem>

            <GridItem>
              <TextField
                label='IBAN'
                type='text'
                fullWidth
                {...register('iban')}
                error={!!errors.iban}
                helperText={errors.iban?.message}
              />
            </GridItem>
            <GridItem>
              <TextField
                label='رقم الحساب'
                type='text'
                fullWidth
                {...register('account_number')}
                error={!!errors.account_number}
                helperText={errors.account_number?.message}
              />
            </GridItem>

            <GridItem>
              <TextField
                label='رمز الـ SWIFT/BIC'
                type='text'
                fullWidth
                {...register('code_bic')}
                error={!!errors.code_bic}
                helperText={errors.code_bic?.message}
              />
            </GridItem>

            <GridItem>
              <Controller
                control={control}
                name='status'
                render={({ field }) => (
                  <TextField
                    select
                    label='Status'
                    fullWidth
                    {...field}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value='-1'>Default</MenuItem>
                    <MenuItem value='0'>Not Use</MenuItem>
                    <MenuItem value='1'>Salaries</MenuItem>
                    <MenuItem value='2'>Custody</MenuItem>
                  </TextField>
                )}
              />
            </GridItem>

            <Grid item xs={12}>
              <LoadingButton loading={isSubmitting} fullWidth type='submit' variant='contained' color='primary'>
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

type Props = {
  bankAccount?: UserBankAccount
  refresh: () => void
}

export default SingleBankForm
