import CircularStatisticsCard from '@/components/card-statistics/CircularStatisticsCard'
import type { StatisticsOptionType } from '@/types/cards/circlar-statistics-card'

export default function UsersAdmanCardNUm2() {
  // ** declare and define component state and variables
  const _statisticsOptions: StatisticsOptionType[] = [
    { label: 'نشط', value: 60 },
    { label: 'غير نشط', value: 40 }
  ]

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <CircularStatisticsCard
      title='المستخدمين'
      subTitle='تقرير مستخدمي النظام من حيث النشاط'
      statisticsOptions={_statisticsOptions}
    />
  )
}
