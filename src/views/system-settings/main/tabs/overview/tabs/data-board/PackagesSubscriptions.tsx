'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import type { ApexOptions } from 'apexcharts'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [{ name: 'Visitors', data: [90, 140, 113, 66, 38, 68, 42, 103, 85, 42, 68, 85] }]

const PackagesSubscriptions = () => {
  // Hooks
  const theme = useTheme()

  // Vars
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    grid: {
      yaxis: {
        lines: { show: false }
      },
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -28,
        left: -18,
        right: 0,
        bottom: -13
      }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: ['var(--mui-palette-primary-main)'],
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: '35%',
        borderRadiusApplication: 'around'
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: { columnWidth: '45%', borderRadius: 6 }
          }
        }
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: { columnWidth: '48%' }
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          plotOptions: {
            bar: { borderRadius: 5 }
          }
        }
      },
      {
        breakpoint: 1201,
        options: {
          plotOptions: {
            bar: { columnWidth: '45%', borderRadius: 6 }
          }
        }
      },
      {
        breakpoint: 1080,
        options: {
          plotOptions: {
            bar: { columnWidth: '48%', borderRadius: 5 }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: '40%', borderRadius: 6 }
          }
        }
      },
      {
        breakpoint: 790,
        options: {
          plotOptions: {
            bar: { borderRadius: 5 }
          }
        }
      },
      {
        breakpoint: 680,
        options: {
          plotOptions: {
            bar: { columnWidth: '45%', borderRadius: 4 }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '35%', borderRadius: 6 }
          }
        }
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: { columnWidth: '37%', borderRadius: 4 }
          }
        }
      }
    ]
  }

  return (
    <Card className='bs-full'>
      <CardHeader
        title='اشتراكات الباقات'
        subheader='Total 890 Visitors Are Live'
        action={
          <div className='flex items-center text-primary'>
            <Typography className='font-medium' color='primary.main'>
              +78.2%
            </Typography>
            <i className='ri-arrow-up-s-line text-xl' />
          </div>
        }
        sx={{
          '.MuiCardHeader-content': { minWidth: 0 },
          '.MuiCardHeader-subheader': {
            whiteSpace: 'nowrap'
          }
        }}
      />
      <CardContent className='pbs-5'>
        <AppReactApexCharts type='bar' height={140} width='100%' options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default PackagesSubscriptions
