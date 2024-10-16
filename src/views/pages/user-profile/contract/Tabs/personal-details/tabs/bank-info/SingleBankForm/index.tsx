'use client'

import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getGridItem } from '@/components/get-grid-item'
import { Card, CardContent, Grid, MenuItem, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useQuery } from '@tanstack/react-query'
import { useHooks } from './useHooks'

const GridItem = getGridItem({ xs: 12, md: 6 })

function SingleBankForm() {
  // Initialize the form with react-hook-form and zodResolver for validation
  const {
    form: {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      control
    },
    query: { data: lookups, isLoading }
  } = useHooks()

  // Form submission handler
  const onSubmit = handleSubmit(data => {
    console.log(data)
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
                    helperText={!!error?.message}
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
                    helperText={!!error?.message}
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
                name='country_id'
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='اسم الشركة'
                    fullWidth
                    {...field}
                    error={!!error?.message}
                    helperText={!!error?.message}
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
              <TextField
                label='عملة الحساب'
                type='text'
                fullWidth
                {...register('currency')}
                error={!!errors.currency}
                helperText={errors.currency?.message}
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
              <TextField
                select
                label='Status'
                fullWidth
                {...register('status')}
                SelectProps={{
                  native: true
                }}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                <option value='-1'>Default</option>
                <option value='0'>Not Use</option>
                <option value='1'>Salaries</option>
                <option value='2'>Custody</option>
              </TextField>
            </GridItem>

            <GridItem xs={12}>
              <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='primary'>
                Submit
              </LoadingButton>
            </GridItem>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default SingleBankForm
