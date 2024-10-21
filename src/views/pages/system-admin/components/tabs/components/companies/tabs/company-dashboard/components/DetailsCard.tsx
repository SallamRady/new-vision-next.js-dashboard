import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  Typography
} from '@mui/material'

import logo from '@assets/images/logos/new-vision.png'

const SingleListItem = (props: SingleListItemProps) => (
  <ListItem>
    <div className='flex gap-3 items-center'>
      <p className='text-lg text-slate-200'>{props.subTitle} :</p>
      <p className='text-lg text-slate-400'>{props.content}</p>
    </div>
  </ListItem>
)

const SimpleStatisticsCard = (props: SimpleStatisticsCardProps) => (
  <Grid item container xs={6}>
    <Grid item xs={3}>
      <Avatar variant='rounded'>
        <i className={`${props.icon} text-primary`} />
      </Avatar>
    </Grid>
    <Grid item xs={9}>
      <Typography variant='body2' fontSize={17} fontWeight={700}>
        {props.count}
      </Typography>
      <Typography variant='body2' color={'text.secondary'} fontSize={17}>
        {props.statment}
      </Typography>
    </Grid>
  </Grid>
)

function DetailsCard() {
  return (
    <Card>
      <CardContent>
        <div className='flex flex-col items-center gap-6'>
          {/* company logo */}
          <img src={logo.src} height={100} alt='company_logo' />
          {/* company name and edit */}
          <div className='flex gap-4 items-center'>
            <Typography variant='h3'>نيو فيجن</Typography>
            <i className='ri-ball-pen-fill cursor-pointer text-lg'></i>
          </div>

          <Chip label={'لم يسدد'} color='default' disabled={true} sx={{ borderRadius: '12px', fontSize: '18px' }} />
          {/* simple statistics */}
          <Grid container>
            <SimpleStatisticsCard icon='ri-checkbox-circle-line' count={5} statment={'الموظفين'} />
            <SimpleStatisticsCard icon='ri-star-line' count={2} statment={'المشاريع'} />
          </Grid>
        </div>
        {/* Details */}
        <div className='mt-8'>
          <Typography variant='h5'>التفاصيل</Typography>
          <Divider />
          <List>
            <SingleListItem subTitle='كود الشركة ' content='mashallab@' />
            <SingleListItem subTitle='البريد الالكتروني' content='shallamb@gmail.com' />
            <SingleListItem subTitle='ارقام الهاتف' content='0545236605' />
            <SingleListItem subTitle='الموقع الالكتروني' content='www.vd-2030.com' />
            <SingleListItem subTitle='الدولة' content='المملكة العربية السعودية' />
            <SingleListItem subTitle='رقم السجل التجاري' content='3258258563580' />
          </List>
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Button color='primary' variant='contained'>
          تحديث
        </Button>
        <Button color='error' variant='contained'>
          تعطيل
        </Button>
      </CardActions>
    </Card>
  )
}

export default DetailsCard

type SingleListItemProps = {
  subTitle: string
  content: string
}

type SimpleStatisticsCardProps = {
  icon: string
  count: number
  statment: string
}
