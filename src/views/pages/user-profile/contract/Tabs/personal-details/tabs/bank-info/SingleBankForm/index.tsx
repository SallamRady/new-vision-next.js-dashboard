'use client'

import { useMemo, useState } from 'react'

import { Controller } from 'react-hook-form'

import { Button, Grid, IconButton, MenuItem, Stack, Switch, TextField } from '@mui/material'

import axios from 'axios'

import { getGridItem } from '@/components/get-grid-item'

import { useHooks } from './useHooks'
import type { UserBankAccount } from '@/types/api/common/User'

import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'
import { api } from '@/Constants/Api'
import { SuccessMessage, errorMessage } from '@/utils/notificationsMessages'
import CardWithFloatingActions from '@/components/cards/CardWithFloatingActions'
import CustomMenu from '@/components/custom-menu'

const GridItem = getGridItem({ xs: 12, md: 6 })

const bankAccountTypeValues: Record<string, string> = {
  '-1': 'افتراضي',
  '1': 'الرواتب',
  '2': 'السلف'
}

enum $FormMode {
  CREATE,
  NONE,
  UPDATE
}

function SingleBankForm({ bankAccount, refresh }: Props) {
  const [mode, setMode] = useState<$FormMode>($FormMode.NONE)

  const acctualMode: $FormMode = useMemo(() => {
    if (!bankAccount) {
      return $FormMode.CREATE
    }

    return mode
  }, [mode])

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

  const disabled = acctualMode === $FormMode.NONE || isSubmitting

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
      setMode($FormMode.NONE)
      refresh()
    } catch (error) {
      errorMessage('تعذر في الحفظ')
    }
  })

  return (
    <CardWithFloatingActions
      component={'form'}
      label={`${acctualMode === $FormMode.NONE ? '' : acctualMode === $FormMode.UPDATE ? 'تعديل' : 'انشاء'} حساب بنكي`}
      {...{ noValidate: true as any }}
      onSubmit={acctualMode !== $FormMode.NONE ? onSubmit : undefined}
      actionsContent={
        <Stack direction={'row'}>
          <Controller
            control={control}
            name='active'
            render={({ field }) => (
              <Switch
                disabled={disabled}
                checked={Boolean(field.value)}
                onChange={(e, checked) => field.onChange(checked ? 1 : 0)}
              />
            )}
          />

          {acctualMode === $FormMode.NONE ? (
            <>
              <IconButton key='2'>
                <i className='ri-settings-3-fill' />
              </IconButton>
              <IconButton key='1' color='primary' onClick={() => setMode($FormMode.UPDATE)}>
                <i className='ri-edit-2-line' />
              </IconButton>
            </>
          ) : (
            <>
              <Controller
                control={control}
                name='status'
                render={({ field }) => (
                  <CustomMenu
                    renderAnchor={({ onClick }) => (
                      <Button onClick={onClick} endIcon={<i className='ri-arrow-down-s-line' />}>
                        {bankAccountTypeValues[field.value]}{' '}
                      </Button>
                    )}
                  >
                    {Object.entries(bankAccountTypeValues).map(([key, value]) => (
                      <MenuItem
                        onClick={() => {
                          console.log(value)
                          field.onChange(key)
                        }}
                        key={key}
                      >
                        {value}
                      </MenuItem>
                    ))}
                  </CustomMenu>
                )}
              />

              <IconButton key='3' color='error' onClick={() => setMode($FormMode.NONE)}>
                <i className='ri-close-line' />
              </IconButton>

              <IconButton key='4' disabled={isSubmitting} color='success' type='submit'>
                <i className='ri-check-line' />
              </IconButton>
            </>
          )}
        </Stack>
      }
    >
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
                disabled={disabled}
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
                disabled={disabled}
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
            name='currency_id'
            render={({ field, fieldState: { error } }) => (
              <TextField
                label='عملة الحساب'
                fullWidth
                {...field}
                error={!!error?.message}
                helperText={error?.message}
                disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
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
                disabled={disabled}
              >
                <MenuItem value='-1'>Default</MenuItem>
                <MenuItem value='0'>Not Use</MenuItem>
                <MenuItem value='1'>Salaries</MenuItem>
                <MenuItem value='2'>Custody</MenuItem>
              </TextField>
            )}
          />
        </GridItem>
      </Grid>
    </CardWithFloatingActions>
  )
}

type Props = {
  bankAccount?: UserBankAccount
  refresh: () => void
}

export default SingleBankForm
