// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

export type UserDataType = {
  title: string
  stats: string
  avatarIcon: string
  avatarColor?: ThemeColor
  trend: string
  trendNumber?: string
  subtitle: string
  cardWidth?: string
}

const HorizontalWithSubtitle = (props: UserDataType) => {
  // Props
  const { title, stats, avatarIcon, avatarColor, trend: trend, trendNumber: trendNumber, cardWidth } = props

  return (
    <Card sx={{ width: cardWidth ?? '275px', m: '1rem auto' }}>
      <CardContent className='flex h-full gap-2 align-middle'>
        <CustomAvatar color={avatarColor} skin='light' variant='rounded' size={42}>
          <i className={classnames(avatarIcon, 'text-[26px]')} />
        </CustomAvatar>
        <div className='flex flex-col  gap-1 flex-grow'>
          <Typography variant='body2' fontSize={'1rem'}>
            {title}
          </Typography>
          <div className='flex items-center gap-2 flex-wrap'>
            <Typography variant='body2' fontSize={'1rem'} color='text.primary'>
              {stats}
            </Typography>
            {Boolean(trendNumber) && (
              <Typography
                variant='body2'
                fontSize={'0.7rem'}
                color={trend === 'negative' ? 'error.main' : 'success.main'}
              >
                {`(${trendNumber}${trend === 'negative' ? '-' : '+'})`}
              </Typography>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default HorizontalWithSubtitle
