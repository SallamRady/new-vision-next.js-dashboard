'use client'

import { Box, Button, IconButton, Stack } from '@mui/material'
import DynamicFormFields from './DynamicFormFields'
import { useContext, useEffect, useState } from 'react'
import { ComponiesCxt } from '../../../context/ComponiesCxt'
import { TenantFormType } from '@/types/companies/CompanyTableRowType'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { SelectFieldWithValue } from '@/views/pages/users/components/users-table/components/EditUserDialog'
import axiosInstance from '@/libs/axiosConfig'
import { api } from '@/Constants/api'
import { serialize } from 'object-to-formdata'
import { FileBondState } from '@/types/filepond'
import axios from 'axios'
import { getAuthHeaders } from '@/libs/headers/headerServices'

const _hiddenFields = ['tenant_type_id', 'registration_type_id', 'dynamic_forms']

export default function SetCompanyDialogForm() {
  // ** declare and define component state and varibles
  const [countryId, setCountryId] = useState('')
  const [tenantType, setTenantType] = useState('')
  const [registerationType, setRegisterationType] = useState('')
  const [hiddenFields, setHiddenFields] = useState(_hiddenFields)
  const { handleChangeParams, companiesLookupsData } = useContext(ComponiesCxt)
  const { control, register, handleSubmit, setValue, reset } = useForm<CompanyFormType>({})
  const [dynamicForms, setDynamicForms] = useState<SingleFormType[]>([])

  // UseFieldArray to dynamically manage sections
  const {
    fields: formsFields,
    append: appendForm,
    remove: removeForm
  } = useFieldArray({
    control,
    name: 'forms'
  })

  // ** handle side effects ... handle set dynamic forms according registerationType, tenantType
  useEffect(() => {
    if (Boolean(tenantType) && Boolean(registerationType)) {
      let registerationTypes: TenantFormType[] | undefined = companiesLookupsData?.tenant_types
        ?.find(ele => ele.id.toString() == tenantType)
        ?.registration_types?.find(ele => ele.id.toString() == registerationType)?.tenant_form

      if (registerationTypes && registerationTypes?.length > 0) {
        reset({ country_id: countryId, tenant_type_id: tenantType, registration_type_id: registerationType, forms: [] })
        let n = registerationTypes.length
        setDynamicForms([])
        for (let i = 0; i < n; i++) {
          const element = registerationTypes[i]
          const fields = element?.pivot?.form?.map(ele => ({ ...ele, value: null }))
          appendForm({
            formId: element.id.toString(),
            formName: element?.name,
            iterateable: Boolean(element.iterateable),
            fields: fields
          })

          if (Boolean(element.iterateable)) {
            setDynamicForms(prev => [
              ...prev,
              {
                formId: element.id.toString(),
                formName: element?.name,
                iterateable: Boolean(element.iterateable),
                fields: fields,
                removable: true
              }
            ])
          }
        }
      }
    }
  }, [registerationType, tenantType])

  // ** declare and define component helper methods
  const isHiddenField = (key: string) => hiddenFields.indexOf(key) == -1
  const addToHiddenFields = (key: string) => {
    if (!isHiddenField(key)) setHiddenFields(prev => [...prev, key])
  }
  const removeFromHiddenFields = (key: string) => {
    setHiddenFields(prev => prev.filter(ele => ele != key))
  }
  const onSubmit: SubmitHandler<CompanyFormType> = async data => {
    // prepare form body data
    let bodyForm = {
      name: 'company_name',
      country_id: data.country_id,
      tenant_type_id: data.tenant_type_id,
      registration_type_id: data.registration_type_id,
      forms: data?.forms?.map(ele => ({
        id: ele.formId,
        data: ele.fields?.map(field => ({
          [field.key]: field.type == 'file' ? field.uploadedFiles : field.value
        }))
      }))
    }

    //
    const headers = await getAuthHeaders()
    // send request
    axios
      .post(
        api`tenant`,
        serialize(bodyForm, {
          indices: true
        }),
        {
          headers
        }
      )
      .then(response => {
        console.log('responseresponse', response)
      })
      .catch(err => {})
      .finally(() => {})
  }

  // ** return component ui
  return (
    <Stack component='form' onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%', p: 2 }} spacing={4}>
      {/* country id */}
      <SelectFieldWithValue
        label='الدولة'
        value={countryId}
        handleChange={val => {
          setValue('country_id', val)
          setCountryId(val)
          removeFromHiddenFields('tenant_type_id')
          handleChangeParams(`country_id=${val}`)
        }}
        options={companiesLookupsData?.countries?.map(ele => ({ label: ele.name_ar, value: ele.id.toString() })) || []}
        // disabled={loading}
      />

      {/* company type */}
      {isHiddenField('tenant_type_id') && (
        <SelectFieldWithValue
          label='كيان الشركة'
          value={tenantType}
          handleChange={val => {
            setValue('tenant_type_id', val)
            setTenantType(val)
            removeFromHiddenFields('registration_type_id')
            handleChangeParams(`country_id=${countryId}&tenant_type_id=${val}`)
          }}
          options={
            companiesLookupsData?.tenant_types?.map(ele => ({ label: ele.name, value: ele.id.toString() })) || []
          }
          //   disabled={loading}
        />
      )}

      {/* registeration type */}
      {false && (
        <SelectFieldWithValue
          label='نوع التسجيل'
          value={registerationType}
          handleChange={val => {
            setRegisterationType(val)
            setValue('registration_type_id', val)
            removeFromHiddenFields('dynamic_forms')
          }}
          options={
            companiesLookupsData?.tenant_types
              ?.find(ele => ele.id.toString() == tenantType)
              ?.registration_types?.map(ele => ({ label: ele.name, value: ele.id.toString() })) || []
          }
        />
      )}

      {/* Dynamically render sections */}
      {isHiddenField('dynamic_forms') && (
        <>
          {formsFields.map((form, formIndex) => {
            return (
              <Box
                key={form.id}
                sx={{
                  border: '1px solid #d3d3d340',
                  padding: '8px',
                  borderRadius: '5px',
                  position: 'relative'
                }}
              >
                <h3>{form.formName}</h3>
                {/* UseFieldArray for dynamic fields within each section */}
                <DynamicFormFields control={control} formIndex={formIndex} register={register} setValue={setValue} />
                {Boolean(form.removable) && (
                  <IconButton
                    onClick={() => {
                      removeForm(formIndex)
                    }}
                    className='text-error'
                    sx={{
                      position: 'absolute',
                      right: '2%',
                      top: '0%'
                    }}
                  >
                    <i className='ri-delete-bin-line'></i>
                  </IconButton>
                )}
              </Box>
            )
          })}
          {dynamicForms.map(dForm => (
            <Button
              key={dForm.formId}
              type='button'
              variant='outlined'
              onClick={() => {
                appendForm(dForm)
              }}
            >
              أضافة {dForm.formName} أخر
            </Button>
          ))}
        </>
      )}

      <Button type='submit' variant='contained'>
        حفظ
      </Button>
    </Stack>
  )
}

type FieldType = {
  key: string
  label: string
  type: string
  value: null | string | File
  uploadedFiles?: FileBondState
}

type SingleFormType = {
  formId: string
  formName: string
  iterateable: boolean
  fields: FieldType[]
  removable?: boolean
}

export type CompanyFormType = {
  country_id: string
  tenant_type_id: string
  registration_type_id: string
  forms: SingleFormType[]
}
