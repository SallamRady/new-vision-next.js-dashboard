import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'
import { Stack } from '@mui/material'

export default function UsersTopCards() {
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'}>
      <HorizontalWithSubtitle
        title='اجمالي عدد المستخدمين'
        subtitle=''
        stats='21,459'
        avatarIcon='ri-user-3-line'
        avatarColor='primary'
        trend='positive'
        trendNumber='18%'
      />
      <HorizontalWithSubtitle
        title='المستخدمين المضافين اخر شهر'
        subtitle=''
        stats='127'
        avatarIcon='ri-arrow-right-up-line'
        avatarColor='primary'
        trend='negative'
        trendNumber='14%'
      />
      <HorizontalWithSubtitle
        title='المستخدمين النشطيين'
        subtitle=''
        stats='127'
        avatarIcon='ri-checkbox-circle-line'
        avatarColor='primary'
        trend='positive'
        trendNumber='18%'
      />
      <HorizontalWithSubtitle
        title='المستخدمين المعلقين'
        subtitle=''
        stats='127'
        avatarIcon='ri-bar-chart-fill'
        avatarColor='primary'
        trend='negative'
        trendNumber='14%'
      />
    </Stack>
  )
}
