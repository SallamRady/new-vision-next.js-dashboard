'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiLinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

// Components Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { Button } from '@mui/material'
import IssueIcon from '@/components/IssueIcon'

// Styled Components
const LinearProgress = styled(MuiLinearProgress)(() => ({
  '&.MuiLinearProgress-colorWarning': { backgroundColor: 'var(--mui-palette-primary-main)' },
  '& .MuiLinearProgress-bar': {
    borderStartEndRadius: 0,
    borderEndEndRadius: 0
  }
}))

const TotalVisits = ({ contract }: Props) => {
  return (
    <Card className='flex flex-col justify-between bs-full'>
      <CardContent className='flex justify-between items-start'>
        <div className='flex flex-col'>
          <Typography>حالة العفد</Typography>
          {contract && <Typography variant='h5'>42.5k ريال</Typography>}
        </div>
        {contract ? (
          <div className='flex items-center text-success'>
            <Typography color='success.main'>+18.2%</Typography>
            <i className='ri-arrow-up-s-line text-xl'></i>
          </div>
        ) : (
          <IssueIcon />
        )}
      </CardContent>
      {contract ? (
        <>
          <CardContent className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col'>
                <div className='flex items-center gap-x-2'>
                  <CustomAvatar size={18} variant='rounded' skin='light' className='rounded-md' color='warning'>
                    <i className='ri-pie-chart-2-line text-base' />
                  </CustomAvatar>
                  <Typography variant='body2'>بداية العقد</Typography>
                </div>
                <Typography variant='h6'>23.5%</Typography>
                <Typography>20/02/2020</Typography>
              </div>
              <Divider flexItem orientation='vertical' sx={{ '& .MuiDivider-wrapper': { p: 0, py: 2 } }}>
                <CustomAvatar skin='light' color='secondary' size={28} className='bg-actionSelected'>
                  <Typography variant='body2'>20</Typography>
                </CustomAvatar>
              </Divider>
              <div className='flex flex-col items-end'>
                <div className='flex items-center gap-x-2'>
                  <Typography variant='body2'>نهاية العقد</Typography>
                  <CustomAvatar size={18} variant='rounded' skin='light' className='rounded-md' color='primary'>
                    <i className='ri-mac-line text-base' />
                  </CustomAvatar>
                </div>
                <Typography variant='h6'>23.5%</Typography>
                <Typography variant='body2'>20/02/2020</Typography>
              </div>
            </div>
            <LinearProgress value={26} color='warning' variant='determinate' className='bs-2' />
          </CardContent>
        </>
      ) : (
        <CardContent className='flex flex-col gap-2'>
          <div className='flex flex-col items-center justify-between gap-2'>
            <Typography>لا يوجد عقود حالية</Typography>
            <Button variant='contained'>استكمال العقد</Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

type Props = {
  contract?: {}
}

export default TotalVisits
