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

export type CardIntoTwoCardsInfoInOnePropsType = {
  title: string
  stats: string
  avatarIcon: string
  avatarColor?: ThemeColor
  trend: string
  trendNumber: string
  subtitle: string
}

type TwoCardsInfoInOneProps = {
  cards: CardIntoTwoCardsInfoInOnePropsType[]
  cardWidth?: string
}

export default function TwoCardsInfoInOne(props: TwoCardsInfoInOneProps) {
  // ** extract data from props
  const { cardWidth, cards } = props
  // ** return component ui
  return (
    <Card sx={{ width: cardWidth ?? '275px' }}>
      <CardContent className='flex justify-between gap-8 flex-col'>
        {cards?.map((card, index) => {
          return (
            <div className='flex justify-between gap-2'>
              <CustomAvatar color={card.avatarColor} skin='light' variant='rounded' size={42}>
                <i className={classnames(card.avatarIcon, 'text-[26px]')} />
              </CustomAvatar>
              <div className='flex flex-col gap-1 flex-grow'>
                <Typography variant='body2' fontSize={'0.9rem'}>
                  {card.title}
                </Typography>
                <div className='flex items-center gap-2 flex-wrap'>
                  <Typography variant='body2' fontSize={'1rem'} color='text.primary'>
                    {card.stats}
                  </Typography>
                  <Typography
                    variant='body2'
                    fontSize={'0.7rem'}
                    color={card.trend === 'negative' ? 'error.main' : 'success.main'}
                  >
                    {`(${card.trendNumber}${card.trend === 'negative' ? '-' : '+'})`}
                  </Typography>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
