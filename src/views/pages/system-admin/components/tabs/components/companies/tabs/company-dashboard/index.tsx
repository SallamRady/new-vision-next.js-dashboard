import { Grid } from '@mui/material'

import DetailsCard from './components/DetailsCard'
import CurvedLineStatisticsCard from '@/components/card-statistics/CurvedLineStatisticsCard'
import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'
import type { CardIntoTwoCardsInfoInOnePropsType } from '@/components/card-statistics/TwoCardsInfoInOne'
import TwoCardsInfoInOne from '@/components/card-statistics/TwoCardsInfoInOne'
import StatisticsCardWithColumns from '@/components/card-statistics/StatisticsCardWithColumns'

// dummy data
const cards: CardIntoTwoCardsInfoInOnePropsType[] = [
  {
    title: 'اجمالي الشركات',
    subtitle: '',
    stats: '21,459',
    avatarIcon: 'ri-user-3-line',
    avatarColor: 'primary',
    trend: 'positive',
    trendNumber: '18%'
  },
  {
    title: 'الشركات الفعالة',
    subtitle: '',
    stats: '127',
    avatarIcon: 'ri-checkbox-circle-line',
    avatarColor: 'primary',
    trend: 'negative',
    trendNumber: '14%'
  }
]

export default function CompanyDashboardTab() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <DetailsCard />
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <div className='flex flex-wrap gap-4'>
          <CurvedLineStatisticsCard
            title='أرباح الشركة'
            status='اخر شهر'
            value={'12.2k'}
            trend={'negative'}
            percentage='25.5'
            chartName='Company profits Chart'
            data={[0, 85, 25, 125, 90, 250, 200, 350]}
            cardWidth='300px'
          />
          <HorizontalWithSubtitle
            title='قيمة الباقات'
            subtitle=''
            stats='21,459'
            avatarIcon='ri-bar-chart-fill'
            avatarColor='primary'
            trend='positive'
            trendNumber='18%'
            cardWidth='300px'
          />
          <TwoCardsInfoInOne cards={cards} cardWidth='300px' />
          <StatisticsCardWithColumns
            title='اشتراكات الباقة'
            subTitle='اجمالي عدد مستخدمين الباقة'
            value={78.2}
            chartName='Package Subscriptions Chart'
            data={[90, 140, 113, 66, 38, 68, 42, 103, 85, 42, 68, 85]}
            cardWidth='300px'
          />
        </div>
      </Grid>
    </Grid>
  )
}
