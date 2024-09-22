import CircularStatisticsCard from '@/components/card-statistics/CircularStatisticsCard'
import { StatisticsOptionType } from '@/types/cards/circlar-statistics-card'

export default function UsersAdmanCardNUm3() {
  // ** declare and define component state and variables
  const _statisticsOptions: StatisticsOptionType[] = [
    { label: 'مستخدم نظام', value: 15 },
    { label: 'مستخدم شركة', value: 65 },
    { label: 'عميل', value: 20 }
  ]

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <CircularStatisticsCard
      title='المستخدمين'
      subTitle='تقرير مستخدمي النظام من حيث النوع'
      statisticsOptions={_statisticsOptions}
    />
  )
}
