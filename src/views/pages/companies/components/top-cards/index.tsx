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
    <Stack direction={'row'} flexWrap={'wrap'} spacing={4}>
      {/* card num 1 */}
      <TwoCardsInfoInOne cards={cards} />
      {/* card num 2 */}
      <StatisticsCardWithColumns
        title='اشتراكات الباقة'
        subTitle='اجمالي عدد مستخدمين الباقة'
        value={78.2}
        chartName='Package Subscriptions Chart'
        data={[90, 140, 113, 66, 38, 68, 42, 103, 85, 42, 68, 85]}
      />
    </Stack>
  )
}
