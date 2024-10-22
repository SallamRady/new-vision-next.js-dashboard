'use client'

import { useState } from 'react'

import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'

import FieldSet from '@/components/FieldSet'
import InputTextField from '../MainData/components/InputTextField'

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Grid item xs={12} md={6} p={4}>
    {children}
  </Grid>
)

export default function CompanyDetailsLegalData() {
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
          <InputTextField label='دولة الشركة' disabled={true} value='المملكة العربية السعودية' error={true} />
        </GridItem>
        <GridItem>
          <InputTextField label='كيان الشركة' disabled={true} value='فردية' error={true} />
        </GridItem>
        <Grid item xs={12} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FormControl sx={{ width: '97.5%' }}>
            <InputLabel id='register-type-label'>نوع التسجيل</InputLabel>
            <Select
              label='Age'
              defaultValue=''
              id='register-type-select'
              labelId='register-type-label'
              size='small'
              disabled={!enableEbitting}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </FieldSet>
  )
}
