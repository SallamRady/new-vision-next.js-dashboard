'use client'

// Hooks
import { useContext, useState } from 'react'

// MUI
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'

// types
import type { SubmitHandler } from 'react-hook-form'

import axios from 'axios'

import { serialize } from 'object-to-formdata'

import type { FileBondState } from '@/types/filepond'

// components and files
import FieldSet from '@/components/FieldSet'
import InputTextField from '../MainData/components/InputTextField'
import { CompanyDetailsCxt } from '@/views/pages/company-profile/context/CompanyDetailsCxt'
import useCompaniesLookups from '@/hooks/useCompaniesLookups'
import DynamicFormFields from './components/SetDynamicFields'
import { api } from '@/Constants/api-v2'
import { getAuthHeaders } from '@/libs/headers/headerServices'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Grid item xs={12} md={6} p={4}>
    {children}
  </Grid>
)

export default function CompanyDetailsLegalData() {
  // ** declare and define component state and variables
  const [loading, setLoading] = useState(false)
  const { companyData } = useContext(CompanyDetailsCxt)
  const [enableEbitting, setEnableEbitting] = useState(false)
  const { handleSubmit, setValue, control, register, reset } = useForm<CompanyFormType>({})
  const [needComplateData, setNeedComplateData] = useState(companyData?.forms?.length == 0 ? true : false)
  const params = `country_id=${companyData?.country_id}&tenant_type_id=${companyData?.type?.id}`
  const lookupsQuery = useCompaniesLookups(params)
  const { data: companiesLookupsData } = lookupsQuery
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

  // ** handle side effects

  // ** declare and define component helper methods
  const handleChangeRegistrationType = (id: string) => {
    setValue('registration_type_id', id)
    reset({
      country_id: companyData?.country_id + '',
      tenant_type_id: companyData?.type?.id + '',
      registration_type_id: id,
      forms: []
    })
    setDynamicForms([])

    const _registration_type = companiesLookupsData?.tenant_types
      ?.find(ele => ele.id == companyData?.type?.id)
      ?.registration_types?.find(ele => ele.id == +id)

    if (_registration_type) {
      const _forms = _registration_type?.tenant_form

      for (let j = 0; j < _forms.length; j++) {
        const element = _forms[j]
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

  const onSubmit: SubmitHandler<CompanyFormType> = async data => {
    setLoading(true)

    // prepare form body
    const formsBody: { id: string; data: { [key: string]: string | File | FileBondState | null | undefined } }[] =
      data.forms?.map(form => {
        const _form: { id: string; data: { [key: string]: string | File | FileBondState | null | undefined } } = {
          id: form.formId,
          data: {}
        }

        let _data: { [key: string]: string | File | FileBondState | null | undefined } = {}
        const len = form.fields?.length

        for (let idx = 0; idx < len; idx++) {
          const _field = form.fields[idx]

          if (_field.type != 'file') _data = { ..._data, [_field.key]: _field.value }
          else _data = { ..._data, [_field.key]: _field.uploadedFiles }
        }

        return { ..._form, data: _data }
      })

    const body = {
      country_id: companyData?.country_id,
      tenant_type_id: companyData?.type?.id,
      registration_type_id: data.registration_type_id,
      forms: formsBody
    }

    const headers = await getAuthHeaders()

    axios
      .post(
        api`tenant/legal-information/${companyData?.id}`,
        serialize(body, {
          indices: true
        }),
        {
          headers
        }
      )
      .then(() => {
        SuccessMessage('تم التعديل البيانات القانونية بنجاح')
      })
      .catch(() => {
        errorMessage('تعذر التعديل')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleUpdateLegalData = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <FieldSet
      leftTitle={
        <Typography variant='body2' fontSize={18} fontWeight={700}>
          البيانات القانونية
        </Typography>
      }
      rightTitle={
        needComplateData ? (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
            {enableEbitting ? (
              <>
                <IconButton onClick={() => setEnableEbitting(false)}>
                  <i className='ri-close-line text-error'></i>
                </IconButton>
                <IconButton onClick={handleUpdateLegalData}>
                  <i className='ri-check-line text-success'></i>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton>
                  <i className='ri-settings-2-line text-inherit'></i>
                </IconButton>
                <IconButton onClick={() => setEnableEbitting(true)}>
                  <i className='ri-edit-line text-primary'></i>
                </IconButton>
              </>
            )}
          </Stack>
        ) : null
      }
    >
      {needComplateData ? (
        <Grid container p={5}>
          {/* country */}
          <GridItem>
            <InputTextField
              label='دولة الشركة'
              disabled={true}
              value={companyData?.country?.name_ar ?? '_'}
              error={true}
            />
          </GridItem>
          {/* type */}
          <GridItem>
            <InputTextField label='كيان الشركة' disabled={true} value={companyData?.type?.name ?? '_'} error={true} />
          </GridItem>
          {/* registeration type */}
          <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <FormControl sx={{ width: '97.5%' }}>
              <InputLabel id='register-type-label'>نوع التسجيل</InputLabel>
              <Select
                label='Age'
                defaultValue=''
                id='register-type-select'
                labelId='register-type-label'
                size='small'
                disabled={!enableEbitting || loading}
                onChange={e => {
                  handleChangeRegistrationType(e.target.value)
                }}
              >
                {companiesLookupsData?.tenant_types
                  ?.find(ele => ele.id == companyData?.type?.id)
                  ?.registration_types?.map(ele => (
                    <MenuItem key={ele.id} value={ele.id.toString()}>
                      {ele.name}
                    </MenuItem>
                  )) || []}
              </Select>
            </FormControl>
          </Grid>
          {/* dynamc forms */}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              flexWrap: 'wrap',
              justifyContent: 'start',
              alignItems: 'start',
              gap: '35px'
            }}
          >
            {formsFields.map((form, formIndex) => {
              return (
                <Box
                  key={form.id}
                  sx={{
                    border: '1px solid #d3d3d340',
                    padding: '8px',
                    borderRadius: '5px',
                    position: 'relative',
                    my: 2,
                    width: {
                      sx: '98%',
                      md: '28%'
                    }
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
          </Grid>
          <Grid item xs={12} sx={{ m: 4, display: 'flex', flexDirection: 'row', gap: '10px' }}></Grid>
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
        </Grid>
      ) : (
        <Stack width={'100%'} alignItems={'center'} justifyContent={'center'} my={3}>
          <Box
            sx={{
              width: '260px',
              height: '170px',
              boxShadow: '0px 8.07px 24.22px -4.04px #0000001F',
              bgcolor: '#2D174D',
              textAlign: 'center',
              p: '21px'
            }}
          >
            <i className='ri-error-warning-line text-warning text-lg'></i>
            <Typography variant='body2' fontSize={18} fontWeight={600}>
              يجب اكمال بيانات <br />
              التسجيل
            </Typography>
            <Button variant='contained' onClick={() => setNeedComplateData(true)} sx={{ width: '75%' }}>
              استكمال
            </Button>
          </Box>
        </Stack>
      )}
    </FieldSet>
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

/**
 tenant_type_id:1
registration_type_id:8
forms[0][id]:1
forms[0][data][sdate]:2024/12/15
forms[0][data][edate]:2024/12/15
country_id:2
 */
