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

import type { ProfileHeaderType } from '@/types/pages/profileTypes'
import VisuallyHiddenInput from '@/components/ViduallyHiddenInput'
import type { User } from '@/types/api/common/User'

import { api } from '@/Constants/Api'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'

const UserProfileHeader = ({ data, user }: { data?: ProfileHeaderType; user: User }) => {
  const profileImage = user?.pictures?.image?.[0]?.original_url
  const router = useRouter()

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
                يلزم اضافة صورة خلفية بيضاء 6*4
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
            <Typography variant='h4'>{data?.fullName}</Typography>
            <div className='flex flex-wrap gap-6 gap-y-3 justify-center sm:justify-normal min-bs-[38px]'>
              <div className='flex items-center gap-2'>
                {data?.designationIcon && <i className={data?.designationIcon} />}
                <Typography className='font-medium'>{data?.designation}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='ri-map-pin-line' />
                <Typography className='font-medium'>{data?.location}</Typography>
              </div>
              <div className='flex items-center gap-2'>
                <i className='ri-calendar-line' />
                <Typography className='font-medium'>{data?.joiningDate}</Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileHeader
