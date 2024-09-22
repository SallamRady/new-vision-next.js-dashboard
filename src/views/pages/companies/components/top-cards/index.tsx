import CurvedLineStatisticsCard from '@/components/card-statistics/CurvedLineStatisticsCard'
import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'
import StatisticsCardWithColumns from '@/components/card-statistics/StatisticsCardWithColumns'
import TwoCardsInfoInOne, { CardIntoTwoCardsInfoInOnePropsType } from '@/components/card-statistics/TwoCardsInfoInOne'
import { Stack } from '@mui/material'

// dummy data
let cards: CardIntoTwoCardsInfoInOnePropsType[] = [
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

export default function CompaniesTopCards() {
  // ** declare and define component state and variables

  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row'
      }}
      justifyContent={{
        xs: 'start',
        sm: 'space-between'
      }}
      flexWrap={'wrap'}
      spacing={4}
    >
      {/* card num 1 */}
      <TwoCardsInfoInOne cards={cards} cardWidth='300px' />
      {/* card num 2 */}
      <StatisticsCardWithColumns
        title='اشتراكات الباقة'
        subTitle='اجمالي عدد مستخدمين الباقة'
        value={78.2}
        chartName='Package Subscriptions Chart'
        data={[90, 140, 113, 66, 38, 68, 42, 103, 85, 42, 68, 85]}
        cardWidth='300px'
      />
      {/* card num 3 */}
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
      {/* card num 4 */}
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
    </Stack>
  )
}
