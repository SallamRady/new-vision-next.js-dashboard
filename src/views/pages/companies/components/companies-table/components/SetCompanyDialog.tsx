'use client'
import { z } from 'zod'
import axios from 'axios'
import { api } from '@/Constants/api'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { serialize } from 'object-to-formdata'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormHelperText, Stack, TextField } from '@mui/material'
import { ComponiesCxt } from '../../../context/ComponiesCxt'
import { getAuthHeaders } from '@/libs/headers/headerServices'
import { SelectFieldWithValue } from '@/views/pages/users/components/users-table/components/EditUserDialog'
import { errorMessage } from '@/utils/notificationsMessages'

const _hiddenFields = ['tenant_type_id', 'registration_type_id', 'role_id', 'tenant_field_id', 'name', 'email', 'phone']
type BodyType = { [key: string]: string }

export default function SetCompanyDialogForm(props: PropsType) {
  // ** declare and define component state and varibles
  const { open, OnSuccessDialogAction } = props
  const [loading, setLoading] = useState(false)
  const [hiddenFields, setHiddenFields] = useState(_hiddenFields)
  const { handleChangeParams, companiesLookupsData } = useContext(ComponiesCxt)
  const [frontErrors, setFrontErrors] = useState<BodyType>({})
  const {
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<companyFormType>({
    resolver: zodResolver(companyFormSchema)
  })

  // ** handle side effects
  useEffect(() => {
    reset({})
    setHiddenFields(_hiddenFields)
    handleChangeParams('')
  }, [open])

  console.log('open999', open, getValues('country_id'))
  // ** declare and define component helper methods
  const isHiddenField = (key: string) => hiddenFields.indexOf(key) == -1

  const addToHiddenFields = (key: string) => {
    if (!isHiddenField(key)) setHiddenFields(prev => [...prev, key])
  }

  const removeFromHiddenFields = (key: string) => {
    setHiddenFields(prev => prev.filter(ele => ele != key))
  }

  const deleteKeyFromFrontErrors = (key: string) => {
    let _errors = frontErrors
    delete _errors[key]
    console.log('_errors_errors', _errors)
    setFrontErrors(_errors ?? {})
  }

  const onSubmit = handleSubmit(async data => {
    const headers = await getAuthHeaders()
    setLoading(true)
    // send request
    axios
      .post(api`tenant`, serialize(data), {
        headers
      })
      .then(() => {
        OnSuccessDialogAction()
      })
      .catch(() => {
        errorMessage('تعذر الأضافة')
      })
      .finally(() => {
        setLoading(false)
      })
  })

  // ** return component ui
  return (
    <Stack component='form' onSubmit={onSubmit} sx={{ width: '100%', p: 2 }} spacing={4}>
      {/* country id */}
      <SelectFieldWithValue
        label={'الدولة'}
        value={getValues('country_id')}
        handleChange={val => {
          setValue('country_id', val)
          removeFromHiddenFields('tenant_type_id')
          handleChangeParams(`country_id=${val}`)
          if (val.length == 0) setFrontErrors(prev => ({ ...prev, country_id: 'دولة الشركة مطلوبة' }))
          else deleteKeyFromFrontErrors('country_id')
        }}
        disabled={loading}
        options={companiesLookupsData?.countries?.map(ele => ({ label: ele.name_ar, value: ele.id.toString() })) || []}
      />
      <FormHelperText className='text-error'>
        {errors.country_id ? errors.country_id.message : frontErrors['country_id']}
      </FormHelperText>

      {/* company type */}
      {isHiddenField('tenant_type_id') && (
        <>
          <SelectFieldWithValue
            label='كيان الشركة'
            value={getValues('tenant_type_id')}
            handleChange={val => {
              setValue('tenant_type_id', val)
              removeFromHiddenFields('registration_type_id')
              handleChangeParams(`country_id=${getValues('country_id')}&tenant_type_id=${val}`)
              if (val.length == 0) setFrontErrors(prev => ({ ...prev, tenant_type_id: 'نوع الشركة مطلوبة' }))
              else deleteKeyFromFrontErrors('tenant_type_id')
            }}
            disabled={loading}
            options={
              companiesLookupsData?.tenant_types?.map(ele => ({ label: ele.name, value: ele.id.toString() })) || []
            }
          />
          <FormHelperText className='text-error'>
            {errors.tenant_type_id ? errors.tenant_type_id.message : frontErrors['tenant_type_id']}
          </FormHelperText>
        </>
      )}

      {/* registeration type */}
      {isHiddenField('registration_type_id') && (
        <>
          <SelectFieldWithValue
            label='نوع التسجيل'
            value={getValues('registration_type_id')}
            handleChange={val => {
              setValue('registration_type_id', val)
              removeFromHiddenFields('role_id')
              if (val.length == 0)
                setFrontErrors(prev => ({ ...prev, registration_type_id: 'طريقة تسجيل الشركة مطلوبة' }))
              else deleteKeyFromFrontErrors('registration_type_id')
            }}
            disabled={loading}
            options={
              companiesLookupsData?.tenant_types
                ?.find(ele => ele.id.toString() == getValues('tenant_type_id'))
                ?.registration_types?.map(ele => ({ label: ele.name, value: ele.id.toString() })) || []
            }
          />
          <FormHelperText className='text-error'>
            {errors.registration_type_id ? errors.registration_type_id.message : frontErrors['registration_type_id']}
          </FormHelperText>
        </>
      )}

      {/* role_id */}
      {isHiddenField('role_id') && (
        <>
          <SelectFieldWithValue
            label='الباقة'
            value={getValues('role_id')}
            handleChange={val => {
              setValue('role_id', val)
              removeFromHiddenFields('tenant_field_id')
              if (val.length == 0) setFrontErrors(prev => ({ ...prev, role_id: 'الباقة مطلوبة' }))
              else deleteKeyFromFrontErrors('role_id')
            }}
            disabled={loading}
            options={companiesLookupsData?.packages?.map(ele => ({ label: ele.name, value: ele.id.toString() })) || []}
          />
          <FormHelperText className='text-error'>
            {errors.role_id ? errors.role_id.message : frontErrors['role_id']}
          </FormHelperText>
        </>
      )}

      {/* tenant_field_id */}
      {isHiddenField('tenant_field_id') && (
        <>
          <SelectFieldWithValue
            label='مجال الشركة'
            value={getValues('tenant_field_id')}
            handleChange={val => {
              setValue('tenant_field_id', val)
              removeFromHiddenFields('name')
              if (val.length == 0) setFrontErrors(prev => ({ ...prev, tenant_field_id: 'مجال الشركة مطلوب' }))
              else deleteKeyFromFrontErrors('tenant_field_id')
            }}
            disabled={loading}
            options={
              companiesLookupsData?.tenant_types
                ?.find(ele => ele.id.toString() == getValues('tenant_type_id'))
                ?.fields?.map(ele => ({ label: ele.name, value: ele.id.toString() })) || []
            }
          />
          <FormHelperText className='text-error'>
            {errors.tenant_field_id ? errors.tenant_field_id.message : frontErrors['role_id']}
          </FormHelperText>
        </>
      )}

      {/* company name */}
      {isHiddenField('name') && (
        <>
          <TextField
            fullWidth
            label={'أسم الشركة'}
            size='small'
            disabled={loading}
            onChange={e => {
              setValue('name', e.target.value)
              removeFromHiddenFields('email')
              if (e.target.value.length == 0) setFrontErrors(prev => ({ ...prev, name: 'أسم الشركة مطلوبة' }))
              else deleteKeyFromFrontErrors('name')
            }}
            error={Boolean(errors.name) || Boolean(frontErrors['name'])}
          />
          <FormHelperText className='text-error'>
            {errors.name ? errors.name.message : frontErrors['name']}
          </FormHelperText>
        </>
      )}
      {/* company email */}
      {isHiddenField('email') && (
        <>
          <TextField
            fullWidth
            label={'الأيميل الشركة'}
            size='small'
            disabled={loading}
            onChange={e => {
              setValue('email', e.target.value)
              removeFromHiddenFields('phone')
              if (e.target.value.length == 0) setFrontErrors(prev => ({ ...prev, email: 'الأيميل الشركة مطلوبة' }))
              else deleteKeyFromFrontErrors('email')
            }}
            error={Boolean(errors.email) || Boolean(frontErrors['email'])}
          />
          <FormHelperText className='text-error'>
            {errors.email ? errors.email.message : frontErrors['email']}
          </FormHelperText>
        </>
      )}

      {/* company phone */}
      {isHiddenField('phone') && (
        <>
          <TextField
            fullWidth
            label={'تليفون الشركة'}
            size='small'
            disabled={loading}
            onChange={e => {
              setValue('phone', e.target.value)
              // let _error = Boolean(e.target.value.length) == false
              // if (_error) setFrontErrors(prev => ({ ...prev, phone: 'تليفون الشركة مطلوبة' }))
              // else deleteKeyFromFrontErrors('phone')
            }}
            // error={Boolean(errors.phone) || Boolean(frontErrors['phone'])}
          />
          <FormHelperText className='text-error'>
            {errors.phone ? errors.phone.message : frontErrors['phone']}
          </FormHelperText>
        </>
      )}

      <Button
        type='submit'
        variant='contained'
        disabled={Object.keys(frontErrors).length > 0 || hiddenFields.length > 0}
      >
        حفظ
      </Button>
    </Stack>
  )
}

export const companyFormSchema = z.object({
  name: z.string().min(1, { message: 'اسم الشركة مطلوب' }),
  country_id: z.string().min(1, { message: 'دولة الشركة مطلوبة' }),
  tenant_type_id: z.string().min(1, { message: 'نوع الشركة مطلوبة' }),
  registration_type_id: z.string().min(1, { message: 'طريقة تسجيل الشركة مطلوبة' }),
  role_id: z.string().min(1, { message: 'الباقة الشركة مطلوبة' }),
  tenant_field_id: z.string().min(1, { message: 'مجال الشركة مطلوبة' }),
  email: z.string().email({ message: 'الايميل المدخل غير صالح' }),
  phone: z.string().min(1, { message: 'جوال الشركة مطلوب' })
})

type companyFormType = z.infer<typeof companyFormSchema>

type PropsType = {
  open: boolean
  OnSuccessDialogAction: () => void
}
