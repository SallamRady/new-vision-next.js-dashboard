'use client'

import { Stack } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const CompanyEmployeesCard = () => {
  // ** declare and define component state and variables
  // ** declare and define component helper methods

  // ** return component ui
  return (
    <Card sx={{ minHeight: '230px' }}>
      <CardContent>
        <Typography variant='h4' fontSize={18} fontWeight={600}>
          الموظفين <i className='ri-error-warning-line text-warning text-sm'></i>
        </Typography>
        <Stack alignItems={'center'} justifyContent={'center'} width={'100%'} minHeight={'150px'}>
          <Typography variant='body2' color={'text.secondary'}>
            لا يوجد بيانات
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CompanyEmployeesCard
