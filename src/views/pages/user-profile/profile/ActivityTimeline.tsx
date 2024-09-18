'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import type { TimelineProps } from '@mui/lab/Timeline'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Components
const Timeline = styled(MuiTimeline)<TimelineProps>({
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    }
  }
})

const ActivityTimeline = () => {
  return (
    <Card>
      <CardHeader
        title='سجل الانشطة'
        avatar={<i className='ri-bar-chart-2-line' />}
        titleTypographyProps={{ variant: 'h5' }}
      />
      <CardContent>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex items-center justify-between flex-wrap gap-x-4 mbe-2.5'>
                <Typography className='font-medium' color='text.primary'>
                  تم دفع 12 فاتورة
                </Typography>
                <Typography variant='caption'>منذ 12 دقيقة</Typography>
              </div>
              <Typography className='mbe-2'>تم دفع الفواتير للشركة.</Typography>
              <div className='flex items-center gap-2.5 is-fit rounded-lg bg-actionHover plb-[5px] pli-2.5'>
                <img height={20} alt='invoice.pdf' src='/images/icons/pdf-document.png' />
                <Typography className='font-medium'>invoices.pdf</Typography>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='success' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex items-center justify-between flex-wrap gap-x-4 mbe-2.5'>
                <Typography className='font-medium' color='text.primary'>
                  اجتماع مع العميل
                </Typography>
                <Typography variant='caption'>منذ 45 دقيقة</Typography>
              </div>
              <Typography className='mbe-2'>اجتماع مشروع مع جون @10:15 صباحاً</Typography>
              <div className='flex items-center gap-2.5'>
                <CustomAvatar src='/images/avatars/1.png' size={32} />
                <div>
                  <Typography variant='body2' className='font-medium'>
                    ليستر ماكارثي (عميل)
                  </Typography>
                  <Typography variant='body2'>المدير التنفيذي لشركة Pixinvent</Typography>
                </div>
              </div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex items-center justify-between flex-wrap gap-x-4 mbe-2.5'>
                <Typography className='font-medium' color='text.primary'>
                  إنشاء مشروع جديد للعميل
                </Typography>
                <Typography variant='caption'>منذ يومين</Typography>
              </div>
              <Typography className='mbe-2'>6 أعضاء فريق في المشروع</Typography>
              <AvatarGroup total={6} className='pull-up'>
                <Avatar alt='Remy Sharp' src='/images/avatars/2.png' />
                <Avatar alt='Travis Howard' src='/images/avatars/4.png' />
                <Avatar alt='Cindy Baker' src='/images/avatars/1.png' />
              </AvatarGroup>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ActivityTimeline
