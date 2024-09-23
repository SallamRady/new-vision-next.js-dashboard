import dynamic from 'next/dynamic'

import { Card, CardContent, Typography } from '@mui/material'
import { lighten, darken, useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import { StatisticsOptionType } from '@/types/cards/circlar-statistics-card'

const StatisticsItem = (props: StatisticsItemProps) => (
  <div className='flex items-center gap-2 flex-wrap'>
    <i className='ri-focus-2-line' style={{ fontSize: '12px' }}></i>
    <Typography variant='body2' fontSize={'1rem'} color='text.primary'>
      {props.title}
    </Typography>
    <Typography variant='body2' fontSize={'0.7rem'} color={props.tren == 'negative' ? 'error.main' : 'success.main'}>
      {`(${props.percentage}${props.tren == 'negative' ? '-' : '+'})`}
    </Typography>
  </div>
)

export default function CircularStatisticsCard(props: PropsType) {
  // ** extract data from props
  const { title, subTitle, statisticsOptions, cardWidth } = props
  let totalValue: number = 0
  for (let idx = 0; idx < statisticsOptions.length; idx++) {
    totalValue += statisticsOptions[idx].value
  }
  // Hooks
  const theme = useTheme()

  // Vars
  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    grid: {
      padding: {}
    },
    colors: statisticsOptions?.map((_, index) => darken(theme.palette.primary.main, 0.1 + index / 10.0)),
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { theme: 'false' },
    dataLabels: { enabled: false },
    labels: statisticsOptions?.map(ele => ele.label),
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 20,
              fontSize: '0.875rem'
            },
            value: {
              offsetY: -15,
              fontWeight: 500,
              fontSize: '1.125rem',
              formatter: value => `${value}%`,
              color: 'var(--mui-palette-text-primary)'
            },
            total: {
              show: true,
              fontSize: '0.8125rem',
              label: 'Total',
              color: 'var(--mui-palette-text-disabled)',
              formatter: () => `${totalValue}`
            }
          }
        }
      }
    }
  }

  // ** return component UI
  return (
    <Card className='flex flex-col justify-center' sx={{ width: cardWidth ?? '315px', m: '1rem auto' }}>
      <CardContent className='flex justify-between items-start'>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-between gap-6'>
            <div>
              <Typography variant='h6' className='mbe-1'>
                {title}
              </Typography>
              <Typography variant='body2'>{subTitle}</Typography>
            </div>
            <div>
              {statisticsOptions?.map((ele, index) => (
                <StatisticsItem
                  key={`${ele.label}-${index}`}
                  title={ele.label}
                  percentage={ele.value}
                  tren='positive'
                />
              ))}
            </div>
          </div>
          <div>
            <AppReactApexCharts
              type='donut'
              height={140}
              width={140}
              options={options}
              series={statisticsOptions?.map(ele => ele.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type PropsType = {
  title: string
  subTitle: string
  statisticsOptions: StatisticsOptionType[]
  cardWidth?: string
}

type StatisticsItemProps = {
  title: string
  percentage: number
  tren: 'positive' | 'negative'
}
