// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'

// Types Imports
import type { CardStatsCharacterProps } from '@/types/pages/widgetTypes'

const CardStatWithImage = (props: CardStatsCharacterProps) => {
  // Props
  const { title, src, stats, trendNumber, trend, chipText, chipColor } = props

  return (
    <Card className='relative bs-full'>
      <CardContent>
        <Grid container>
          <Grid item xs={7} className='flex flex-col justify-between gap-5'>
            <div className='flex flex-col items-start gap-2'>
              <Typography color='text.primary' className='text-nowrap font-medium'>
                {title}
              </Typography>
              <Chip size='small' variant='tonal' label={chipText} color={chipColor} />
            </div>
            <div className='flex flex-wrap items-center gap-x-2'>
              <Typography variant='h4'>{stats}</Typography>
              <Typography color={trend === 'negative' ? 'error.main' : 'success.main'}>
                {`${trend === 'negative' ? '-' : '+'}${trendNumber}`}
              </Typography>
            </div>
          </Grid>
          <img src={src} alt={title} className='absolute block-end-0 inline-end-5 self-end bs-[130px] is-auto' />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CardStatWithImage
