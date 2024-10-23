'use client'

import { useState } from 'react'

import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'

import FieldSet from '@/components/FieldSet'
import InputTextField from '../MainData/components/InputTextField'
import SettingBtnMenu from './components/SettingBtnMenu'

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Grid item xs={12} md={6} p={4}>
    {children}
  </Grid>
)

export default function CompanyDetailsAddressData() {
  const [enableEbitting, setEnableEbitting] = useState(false)
  const [continueEditting, setContinueEditting] = useState(false)

  return (
    <FieldSet
      leftTitle={
        <Typography variant='body2' fontSize={18} fontWeight={700}>
          العنوان الوطني
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
              <SettingBtnMenu setContinueEditting={setContinueEditting} />
              <IconButton onClick={() => setEnableEbitting(true)}>
                <i className='ri-edit-line text-primary'></i>
              </IconButton>
            </>
          )}
        </Stack>
      }
    >
      {continueEditting ? (
        <>
          <Grid container p={5}>
            <GridItem>
              <FormControl sx={{ width: '97.5%' }}>
                <InputLabel id='country-label'>الدولة</InputLabel>
                <Select
                  label='Age'
                  defaultValue=''
                  id='country-select'
                  labelId='country-label'
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
            </GridItem>
            <GridItem>
              <FormControl sx={{ width: '97.5%' }}>
                <InputLabel id='country-label'>المنطقة</InputLabel>
                <Select
                  label='Age'
                  defaultValue=''
                  id='country-select'
                  labelId='country-label'
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
            </GridItem>
            <GridItem>
              <FormControl sx={{ width: '97.5%' }}>
                <InputLabel id='country-label'>المدينة</InputLabel>
                <Select
                  label='Age'
                  defaultValue=''
                  id='country-select'
                  labelId='country-label'
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
            </GridItem>
            <GridItem>
              <FormControl sx={{ width: '97.5%' }}>
                <InputLabel id='country-label'>الحي</InputLabel>
                <Select
                  label='Age'
                  defaultValue=''
                  id='country-select'
                  labelId='country-label'
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
            </GridItem>
            <GridItem>
              <InputTextField label='رقم المبنى' value='256' disabled={!enableEbitting} error={false} />
            </GridItem>
            <GridItem>
              <InputTextField label='الرقم الاضافي' disabled={!enableEbitting} value='+966 548552355' error={false} />
            </GridItem>
            <GridItem>
              <InputTextField label='الرمز البريدي' disabled={!enableEbitting} value='052' error={false} />
            </GridItem>
            <GridItem>
              <InputTextField label='الشارع' disabled={!enableEbitting} value='شارع الصفا - مبنى 257' error={false} />
            </GridItem>
          </Grid>
          <Stack alignItems={'start'} direction={'row'} m={6}>
            <i className='ri-map-pin-line text-primary cursor-pointer'></i>
            <Typography
              variant='body2'
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              fontSize={18}
              fontWeight={600}
            >
              الخريطة
            </Typography>
          </Stack>
        </>
      ) : (
        <Stack width={'100%'} alignItems={'center'} justifyContent={'center'} my={3}>
          <Box
            sx={{
              width: '260px',
              height: '170px',
              boxShadow: '0px 8.07px 24.22px -4.04px #0000001F',
              bgcolor: '#2D174D',
              textAlign: 'center',
              p: '41px'
            }}
          >
            <i className='ri-error-warning-line text-warning text-lg'></i>
            <Typography variant='body2' fontSize={18} fontWeight={600}>
              يجب تحديد عنوان واحد على الاقل
            </Typography>
          </Box>
        </Stack>
      )}
    </FieldSet>
  )
}
