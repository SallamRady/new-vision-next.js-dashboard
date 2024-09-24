import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'
import { Card, CardContent } from '@mui/material'

export default function SystemAdmanCardNUm1() {
  return (
    <Card sx={{ width: '315px' }}>
      <CardContent className='flex justify-between gap-2 flex-col'>
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
          title='اجمالي عدد الشركات'
          subtitle=''
          stats='127'
          avatarIcon='ri-arrow-right-up-line'
          avatarColor='primary'
          trend='negative'
          trendNumber='14%'
        />
      </CardContent>
    </Card>
  )
}
