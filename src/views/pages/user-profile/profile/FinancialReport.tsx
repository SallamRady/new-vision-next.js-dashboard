import dynamic from 'next/dynamic'

import { Card, CardContent, Chip, Typography } from '@mui/material'
import { lighten, darken, useTheme } from '@mui/material/styles'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

function FinancialReport() {
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
    colors: [darken(theme.palette.primary.main, 0.15), darken(theme.palette.primary.main, 0.5)],
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { theme: 'false' },
    dataLabels: { enabled: false },
    labels: ['36%', '56%'],
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
                التقرير المالي
              </Typography>
              <Typography variant='body2'>المستحق الشهري</Typography>
            </div>
            <div>
              <Typography variant='h6' className='mbe-2'>
                4000 رس
              </Typography>
              <Chip label='+18.4%' variant='tonal' size='small' color='success' />
            </div>
          </div>
          <div>
            <AppReactApexCharts type='donut' height={140} width={140} options={options} series={[35, 65]} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FinancialReport
