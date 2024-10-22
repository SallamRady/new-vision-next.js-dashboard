'use client'

// MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { serialize } from 'object-to-formdata'

// Type Imports
import { Box, Paper } from '@mui/material'

import axios from 'axios'

import VisuallyHiddenInput from '@/components/ViduallyHiddenInput'

import { api } from '@/Constants/Api'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'

const CompanyProfileHeader = () => {
  // ** declare and define component state and variables
  // ** declare and define component helper methods
  const profileImage = ''
  const router = useRouter()

  // ** return component ui
  return (
    <Card>
      <CardContent className='flex justify-center flex-col items-center gap-6 md:items-end md:flex-row md:justify-start'>
        <Paper className='flex rounded-bs-xl  border-be-0 border-backgroundPaper bg-gray-50 text-black'>
          {profileImage ? (
            <img height={120} width={120} src={profileImage} className='rounded' alt='Profile Background' />
          ) : (
            <Box
              sx={{
                width: '120px',
                height: '120px',
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
              component={'label'}
            >
              <i className='ri-camera-2-line' />
              <Typography variant='body1' textAlign='center' color={'black'}>
                يلزم اضافة logo الشركة
              </Typography>
              <VisuallyHiddenInput
                type='file'
                onChange={async e => {
                  try {
                    const image = e.target.files?.[0]
                    const headers = await getClientAuthHeaders()

                    await axios.post(api`add-image-for-me`, serialize({ image }), { headers })
                    router.refresh()
                  } catch (error) {
                    console.log(error)
                  }
                }}
              />
            </Box>
          )}
        </Paper>
        <div className='flex is-full flex-wrap justify-start flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-5'>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            <Typography variant='h4' fontSize={28} fontWeight={700}>
              ابعاد الرؤية للاستشارات الهندسية
            </Typography>
            <div className='flex flex-wrap gap-6 gap-y-3 justify-center sm:justify-normal min-bs-[38px]'>
              <div className='flex items-center gap-2'>
                <i className='ri-map-pin-line' />
                <Typography className='font-medium'>{'الفرع'}</Typography>
                <i className='ri-error-warning-line text-warning text-sm'></i>
              </div>
              <div className='flex items-center gap-2'>
                <i className='ri-calendar-line' />
                <Typography className='font-medium'>
                  تاريخ الانظمام
                  <br />
                  <b>04/05/2024</b>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompanyProfileHeader
