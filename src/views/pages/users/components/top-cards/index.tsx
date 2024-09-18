import CustomerStats from '@/components/card-statistics/CustomerStats'
import CardStatHorizontal from '@/components/card-statistics/Horizontal'
import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'
import { Stack } from '@mui/material'

export default function UsersTopCards() {
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'}>
      <HorizontalWithSubtitle
        title='اجمالي عدد الموظفين'
        subtitle=''
        stats='21,459'
        avatarIcon='ri-user-3-line'
        avatarColor='primary'
        trend='positive'
        trendNumber='18%'
      />
      <HorizontalWithSubtitle
        title='الموظفين المضافين اخر شهر'
        subtitle=''
        stats='127'
        avatarIcon='ri-user-3-line'
        avatarColor='primary'
        trend='negative'
        trendNumber='14%'
      />
      <HorizontalWithSubtitle
        title='الموظفين النشطيين'
        subtitle=''
        stats='127'
        avatarIcon='ri-user-3-line'
        avatarColor='primary'
        trend='positive'
        trendNumber='18%'
      />
      <HorizontalWithSubtitle
        title='الموظفين المعلقين'
        subtitle=''
        stats='127'
        avatarIcon='ri-user-3-line'
        avatarColor='primary'
        trend='negative'
        trendNumber='14%'
      />
    </Stack>
  )
}
