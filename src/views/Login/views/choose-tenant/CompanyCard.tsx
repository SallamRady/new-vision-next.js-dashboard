import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import Img from '@/assets/images/logos/constrix.png'
import { TenentType } from '@/types/tenant'

export default function CompanyCard(props: PropsType) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          height='140'
          image={props.tenant?.media?.[0]?.original_url ?? ''}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div' textAlign={'center'}>
            {props.tenant?.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

type PropsType = {
  tenant: TenentType
}
