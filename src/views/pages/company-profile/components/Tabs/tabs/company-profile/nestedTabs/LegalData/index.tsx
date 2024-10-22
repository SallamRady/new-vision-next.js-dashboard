'use client'

import { useState } from 'react'

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

import FieldSet from '@/components/FieldSet'
import InputTextField from '../MainData/components/InputTextField'

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Grid item xs={12} md={6} p={4}>
    {children}
  </Grid>
)

export default function CompanyDetailsLegalData() {
  const [enableEbitting, setEnableEbitting] = useState(false)
  const [continueEditting, setContinueEditting] = useState(false)

  return (
    <FieldSet
      leftTitle={
        <Typography variant='body2' fontSize={18} fontWeight={700}>
          البيانات القانونية
        </Typography>
      }
      rightTitle={
        continueEditting ? (
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
        ) : null
      }
    >
      {continueEditting ? (
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
            <Button variant='contained' onClick={() => setContinueEditting(true)} sx={{ width: '75%' }}>
              استكمال
            </Button>
          </Box>
        </Stack>
      )}
    </FieldSet>
  )
}
