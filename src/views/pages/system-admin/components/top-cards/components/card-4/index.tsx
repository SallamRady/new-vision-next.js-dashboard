import CurvedLineStatisticsCard from '@/components/card-statistics/CurvedLineStatisticsCard'

export default function SystemAdmanCardNUm4() {
  // ** declare and define component state and variables

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <CurvedLineStatisticsCard
      title='عدد زوار الموقع'
      status='اخر شهر'
      value={'127'}
      trend={'negative'}
      percentage='25.5'
      chartName='App Visitors Chart'
      data={[0, 85, 25, 125, 90, 250, 200, 350]}
      cardWidth='300px'
    />
  )
}
