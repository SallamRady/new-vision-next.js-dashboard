'use client'

import { useContext, useEffect, useMemo, useState } from 'react'

import { z } from 'zod'
import axios from 'axios'

import { Controller, useForm } from 'react-hook-form'
import { MenuItem as SzhsinMenuItem } from '@szhsin/react-menu'
import { serialize } from 'object-to-formdata'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Drawer, MenuItem, Stack, TextField, Typography } from '@mui/material'

import LoadingButton from '@mui/lab/LoadingButton'

import { ComponiesCxt } from '../../../context/ComponiesCxt'
import { getAuthHeaders } from '@/libs/headers/headerServices'
import { errorMessage } from '@/utils/notificationsMessages'

import { api } from '@/Constants/Api'

import { numberStringSchema } from '@/utils/validation/zod/numberStringSchema'
import type { Tenant } from '@/types/api/common/Tenant'
import { CompaniesContext } from '../../../context/Companies'

const initialValues: CompanyFormType = {
  country_id: null as any,
  email: '',
  name: '',
  phone: '',
  role_id: null as any,
  tenant_field_id: null as any,
  tenant_type_id: null as any
}

export default function SetCompanyDrawer(props: PropsType) {
  // ** declare and define component state and varibles
  const { onClose, open, company } = props
  const [isDisabled, setIsDisabled] = useState(false)

  const {
    query: { refetch }
  } = useContext(CompaniesContext)

  const { companiesLookupsData } = useContext(ComponiesCxt)

  const {
    handleSubmit,
    register,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CompanyFormType>({
    resolver: zodResolver(companyFormSchema),
    disabled: isDisabled,
    defaultValues: initialValues
  })

  const tenantTypeId = watch('tenant_type_id')

  const currentTenantType = useMemo(
    () => companiesLookupsData?.tenant_types?.find(ele => ele.id == tenantTypeId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [!!companiesLookupsData?.tenant_types, tenantTypeId]
  )

  // ** handle side effects
  useEffect(() => {
    if (open)
      reset(
        company
          ? {
              country_id: company.country_id,
              email: company.email,
              name: company.name,
              phone: company.phone,
              role_id: company.role_id,
              tenant_field_id: company.tenant_field_id,
              tenant_type_id: company.tenant_type_id
            }
          : initialValues
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onSubmit = handleSubmit(async data => {
    const headers = await getAuthHeaders()

    setIsDisabled(true)

    // send request
    axios
      .post(company ? api`tenant/update/${company.id}` : api`tenant`, serialize(data), {
        headers
      })
      .then(() => {
        refetch()
        onClose()
      })
      .catch(() => {
        errorMessage('تعذر الأضافة')
      })
      .finally(() => {
        setIsDisabled(false)
      })
  })

  console.log(errors)

  // ** return component ui
  return (
    <Drawer open={open} variant='temporary' anchor='right' onClose={onClose}>
      <div className='p-4 flex flex-col' style={{ minHeight: '100vh' }}>
        <Typography variant='h5' gutterBottom>
          انشاء شركة جديدة
        </Typography>
        <Stack component='form' flexGrow={1} onSubmit={onSubmit} sx={{ width: 350, p: 2, px: 6 }} spacing={4}>
          <TextField
            fullWidth
            label={'أسم الشركة'}
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label={'الأيميل الشركة'}
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            label={'تليفون الشركة'}
            {...register('phone')}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />
          <Controller
            control={control}
            name='country_id'
            render={({ field }) => (
              <TextField
                {...field}
                label='مقر الشركة'
                select
                fullWidth
                error={Boolean(errors.country_id)}
                helperText={errors.country_id?.message}
              >
                {companiesLookupsData?.countries?.map(country => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name='tenant_type_id'
            render={({ field }) => (
              <TextField
                {...field}
                label='كيان الشركة'
                select
                fullWidth
                error={Boolean(errors.tenant_type_id)}
                helperText={errors.tenant_type_id?.message}
              >
                {companiesLookupsData?.tenant_types?.map(tenantType => (
                  <MenuItem key={tenantType.id} value={tenantType.id}>
                    {tenantType.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            control={control}
            name='role_id'
            render={({ field }) => (
              <TextField
                {...field}
                label='الباقة'
                select
                fullWidth
                error={Boolean(errors.role_id)}
                helperText={errors.role_id?.message}
              >
                {companiesLookupsData?.packages?.map(packageItem => (
                  <MenuItem key={packageItem.id} value={packageItem.id}>
                    {packageItem.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Box flexGrow={1}>
            <Controller
              control={control}
              name='tenant_field_id'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='مجال الشركة'
                  select
                  fullWidth
                  error={Boolean(errors.tenant_field_id)}
                  helperText={errors.tenant_field_id?.message}
                >
                  {currentTenantType?.fields?.map(field => (
                    <MenuItem key={field.id} value={field.id}>
                      {field.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>

          <LoadingButton
            loading={isSubmitting}
            type='submit'
            variant='contained'
            disabled={Boolean(Object.keys(errors).length)}
          >
            حفظ
          </LoadingButton>
        </Stack>
      </div>
    </Drawer>
  )
}

export function SetCompanyButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <SetCompanyDrawer open={open} onClose={() => setOpen(false)} />
      <SzhsinMenuItem
        onClick={() => {
          setOpen(true)
        }}
      >
        شركة جديدة
      </SzhsinMenuItem>
    </>
  )
}

export function UpdateCompanyButton({ company }: { company?: Tenant }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <SetCompanyDrawer open={open} company={company} onClose={() => setOpen(false)} />
      <SzhsinMenuItem
        onClick={() => {
          setOpen(true)
        }}
      >
        تعديل الشركة
      </SzhsinMenuItem>
    </>
  )
}

export const companyFormSchema = z.object({
  name: z.string().min(1, { message: 'اسم الشركة مطلوب' }),
  country_id: z.number({ message: 'دولة الشركة مطلوبة' }).min(1, { message: 'دولة الشركة مطلوبة' }),
  tenant_type_id: z.number({ message: 'نوع الشركة مطلوبة' }).min(1, { message: 'نوع الشركة مطلوبة' }),
  role_id: z.number({ message: 'الباقة الشركة مطلوبة' }).min(1, { message: 'الباقة الشركة مطلوبة' }),
  tenant_field_id: z.number({ message: 'مجال الشركة مطلوبة' }).min(1, { message: 'مجال الشركة مطلوبة' }),
  email: z.string().email({ message: 'الايميل المدخل غير صالح' }),
  phone: numberStringSchema
})

type CompanyFormType = z.infer<typeof companyFormSchema>

type PropsType = {
  open: boolean
  onClose: () => void
  company?: Tenant
}
