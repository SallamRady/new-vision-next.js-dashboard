'use client'

import { useState } from 'react'

import { Grid, IconButton, Stack, Typography } from '@mui/material'

import FieldSet from '@/components/FieldSet'
import InputTextField from './components/InputTextField'

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Grid item xs={12} md={6} p={4}>
    {children}
  </Grid>
)

export default function CompanyDetailsProfileMainInformation() {
  const [enableEbitting, setEnableEbitting] = useState(false)

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
              <IconButton onClick={() => setEnableEbitting(false)}>
                <i className='ri-close-line text-error'></i>
              </IconButton>
              <IconButton onClick={() => setEnableEbitting(false)}>
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
      }
    >
      <Grid container p={5}>
        <GridItem>
          <InputTextField label='اسم الشركة بالعربية' disabled={true} value='company arabic name' error={true} />
        </GridItem>
        <GridItem>
          <InputTextField label='اسم الشركة بالانجليزي' disabled={!enableEbitting} error={false} />
        </GridItem>
        <GridItem>
          <InputTextField label='كيان الشركة' disabled={true} value='هندسي' error={false} />
        </GridItem>
        <GridItem>
          <InputTextField label='دولة المركز الرئيسي' disabled={true} value='المملكة العربية السعودية' error={false} />
        </GridItem>
        <GridItem>
          <InputTextField label='مجال الشركة' disabled={true} value='استشارات هندسية' error={false} />
        </GridItem>
        <GridItem>
          <InputTextField label='رقم الجوال' disabled={true} value='+966 055456200' error={false} />
        </GridItem>
        <GridItem>
          <InputTextField label='البريد الالكتروني' disabled={true} value='admin@vd-2030.com' error={false} />
        </GridItem>
        <GridItem>
          <InputTextField label='الباقة' disabled={true} value='قضية' error={false} />
        </GridItem>
      </Grid>
    </FieldSet>
  )
}
