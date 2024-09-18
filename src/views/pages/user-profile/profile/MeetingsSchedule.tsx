// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Types Imports
import { CardActions } from '@mui/material'

import type { ThemeColor } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

type DataType = {
  avatarSrc: string
  title: string
  subtitle: string
  chipLabel: string
  chipColor?: ThemeColor
}

// Vars
const data: DataType[] = [
  {
    avatarSrc: '/images/avatars/4.png',
    title: 'مكالمة مع وودز',
    subtitle: '21 يوليو | 08:20-10:30',
    chipLabel: 'عمل',
    chipColor: 'primary'
  },
  {
    avatarSrc: '/images/avatars/5.png',
    title: 'مكالمة مؤتمر',
    subtitle: '24 يوليو | 11:30-12:00',
    chipLabel: 'تأمل',
    chipColor: 'success'
  },
  {
    avatarSrc: '/images/avatars/3.png',
    title: 'اجتماع مع مارك',
    subtitle: '28 يوليو | 05:00-6:45',
    chipLabel: 'عشاء',
    chipColor: 'warning'
  },
  {
    avatarSrc: '/images/avatars/2.png',
    title: 'اجتماع مع أوكلاند',
    subtitle: '03 أغسطس | 07:00-8:30',
    chipLabel: 'لقاء',
    chipColor: 'secondary'
  },
  {
    avatarSrc: '/images/avatars/8.png',
    title: 'اجتماع في أوكلاند',
    subtitle: '14 أغسطس | 04:15-05:30',
    chipLabel: 'عشاء',
    chipColor: 'error'
  },
  {
    avatarSrc: '/images/avatars/7.png',
    title: 'اجتماع مع كارل',
    subtitle: '05 أكتوبر | 10:00-12:45',
    chipLabel: 'عمل',
    chipColor: 'primary'
  }
]

const MeetingsSchedule = () => {
  return (
    <Card>
      <CardHeader title='جدول الاجتماعات' action={<OptionMenu options={['تحديث', 'مشاركة', 'إعادة جدولة']} />} />
      <CardContent className='flex flex-col gap-[26.41px]'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <CustomAvatar variant='rounded' src={item.avatarSrc} size={38} />
            <div className='flex justify-between items-center is-full flex-wrap gap-x-4 gap-y-2'>
              <div className='flex flex-col gap-0.5'>
                <Typography color='text.primary' className='font-medium'>
                  {item.title}
                </Typography>
                <div className='flex items-center gap-2'>
                  <i className='ri-calendar-line text-base text-textSecondary' />
                  <Typography variant='body2'>{item.subtitle}</Typography>
                </div>
              </div>
              <Chip label={item.chipLabel} color={item.chipColor} size='small' variant='tonal' />
            </div>
          </div>
        ))}
      </CardContent>
      <CardActions className='flex justify-center'>
        <Typography color='primary'>عرض الكل</Typography>
      </CardActions>
    </Card>
  )
}

export default MeetingsSchedule
