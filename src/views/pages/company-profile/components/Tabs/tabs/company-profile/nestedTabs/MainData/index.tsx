'use client'

import { useContext, useState } from 'react'

import { Grid, IconButton, Stack, TextField, Typography } from '@mui/material'

import FieldSet from '@/components/FieldSet'
import InputTextField from './components/InputTextField'
import { CompanyDetailsCxt } from '@/views/pages/company-profile/context/CompanyDetailsCxt'
import axiosInstance from '@/libs/axiosConfig'
import { api } from '@/Constants/api-v2'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Grid item xs={12} md={6} p={4}>
    {children}
  </Grid>
)

export default function CompanyDetailsProfileMainInformation() {
  // ** declare and define component state and variables
  const [loading, setLoading] = useState(false)
  const { companyData } = useContext(CompanyDetailsCxt)
  const [enName, setEnName] = useState(companyData?.name_en ?? '')
  const [enableEbitting, setEnableEbitting] = useState(false)

  // ** declare and define component helper methods
  const handleSetEnglishName = () => {
    setLoading(true)
    axiosInstance
      .post(api`tenant/update-details/${companyData?.id}`, { name_en: enName })
      .then(() => {
        SuccessMessage('تم تحديث الأسم بنجاح')
      })
      .catch(() => {
        errorMessage('تعذر تحديث الأسم')
      })
      .finally(() => {
        setLoading(false)
        setEnableEbitting(false)
      })
  }

  // ** return component ui
  return (
    <FieldSet
      leftTitle={
        <Typography variant='body2' fontSize={18} fontWeight={700}>
          البيانات الرسمية
        </Typography>
      }
      rightTitle={
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
          {enableEbitting ? (
            <>
              <IconButton disabled={loading} onClick={() => setEnableEbitting(false)}>
                <i className='ri-close-line text-error'></i>
              </IconButton>
              <IconButton disabled={loading} onClick={handleSetEnglishName}>
                <i className='ri-check-line text-success'></i>
              </IconButton>
            </>
          ) : (
            <>
              {/* <IconButton>
                <i className='ri-settings-2-line text-inherit'></i>
              </IconButton> */}
              <IconButton onClick={() => setEnableEbitting(true)}>
                <i className='ri-edit-line text-primary'></i>
              </IconButton>
            </>
          )}
        </Stack>
      }
    >
      <Grid container p={5}>
        <GridItem>
          <InputTextField label='اسم الشركة بالعربية' disabled={true} value={companyData?.name ?? '_'} error={true} />
        </GridItem>
        <GridItem>
          <TextField
            disabled={!enableEbitting || loading}
            variant='outlined'
            size='small'
            fullWidth
            value={enName}
            label='اسم الشركة بالانجليزي'
            onChange={e => setEnName(e.target.value)}
          />
        </GridItem>
        <GridItem>
          <InputTextField label='كيان الشركة' disabled={true} value={companyData?.type?.name ?? '_'} error={false} />
        </GridItem>
        <GridItem>
          <InputTextField
            label='دولة المركز الرئيسي'
            disabled={true}
            value={companyData?.country?.name_ar ?? '_'}
            error={false}
          />
        </GridItem>
        <GridItem>
          <InputTextField label='مجال الشركة' disabled={true} value={companyData?.field?.name ?? '_'} error={false} />
        </GridItem>
        <GridItem>
          <InputTextField
            label='رقم الجوال'
            disabled={true}
            value={companyData?.phone + ` ` + companyData?.country?.phonecode + '+'}
            error={false}
          />
        </GridItem>
        <GridItem>
          <InputTextField label='البريد الالكتروني' disabled={true} value={companyData?.email ?? ''} error={false} />
        </GridItem>
        <GridItem>
          <InputTextField label='الباقة' disabled={true} value={companyData?.package?.name ?? ''} error={false} />
        </GridItem>
      </Grid>
    </FieldSet>
  )
}
