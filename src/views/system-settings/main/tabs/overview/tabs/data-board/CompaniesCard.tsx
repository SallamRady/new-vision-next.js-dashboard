// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Components Imports
import { Divider } from '@mui/material'

import CustomAvatar from '@core/components/mui/Avatar'

function CompaniesCard() {
  return (
    <Card>
      <CardContent className='flex flex-wrap items-center gap-4'>
        <CustomAvatar variant='rounded'>
          <i className={'ri-user-2-fill'} />
        </CustomAvatar>
        <div className='flex flex-col'>
          <Typography>اجمالي الشركات</Typography>
          <div className='flex items-center gap-2'>
            <Typography variant='h5'>{24}</Typography>
            <div className='flex items-center'>
              <i className={classnames('text-xl', 'ri-arrow-up-s-line text-success')}></i>
              <Typography variant='body2' color={'success.main'}>
                {2543.0}
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
      <Divider />
      <CardContent className='flex flex-wrap items-center gap-4'>
        <CustomAvatar variant='rounded'>
          <i className={'ri-pass-valid-fill'} />
        </CustomAvatar>
        <div className='flex flex-col'>
          <Typography>الشركات الفعالة</Typography>
          <div className='flex items-center gap-2'>
            <Typography variant='h5'>{127}</Typography>
            <div className='flex items-center'>
              <i className={classnames('text-xl', 'ri-arrow-up-s-line text-success')}></i>
              <Typography variant='body2' color={'success.main'}>
                {2543.0}
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CompaniesCard
