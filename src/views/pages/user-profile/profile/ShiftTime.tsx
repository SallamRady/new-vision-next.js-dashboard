import dynamic from 'next/dynamic'

import { Card, CardContent, Chip, Typography } from '@mui/material'
import { lighten, darken, useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Third-party Imports
import type { ApexOptions } from 'apexcharts'
import IssueIcon from '@/components/IssueIcon'

function ShiftTime({ shift }: Props) {
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
    colors: [
      darken(theme.palette.primary.main, 0.15),
      darken(theme.palette.primary.main, 0.1),
      'var(--mui-palette-primary-main)',
      lighten(theme.palette.primary.main, 0.2),
      lighten(theme.palette.primary.main, 0.4),
      lighten(theme.palette.primary.main, 0.6)
    ],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { theme: 'false' },
    dataLabels: { enabled: false },
    labels: ['36h', '56h', '16h', '32h', '56h', '16h'],
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
              formatter: () => '231h'
            }
          }
        }
      }
    }
  }

  return (
    <Card className='flex flex-col justify-between bs-full'>
      <CardContent className='flex justify-between items-start'>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col justify-between gap-6'>
            <div>
              <Typography variant='h6' className='mbe-1'>
                وقت الدوام
              </Typography>
              <Typography variant='body2'>تقرير أسبوعي</Typography>
            </div>
            {shift && (
              <div>
                <Typography variant='h6' className='mbe-2'>
                  231<span className='text-textSecondary'>س</span> 14<span className='text-textSecondary'>د</span>
                </Typography>
                <Chip label='+18.4%' variant='tonal' size='small' color='success' />
              </div>
            )}
          </div>
          {shift ? (
            <div>
              <AppReactApexCharts
                type='donut'
                height={140}
                width={140}
                options={options}
                series={[23, 35, 10, 20, 35, 23]}
              />
            </div>
          ) : (
            <IssueIcon />
          )}
        </div>
      </CardContent>
      {!shift && (
        <CardContent>
          <Typography>لا يوجد بيانات</Typography>
        </CardContent>
      )}
    </Card>
  )
}

type Props = {
  shift?: {}
}

export default ShiftTime
