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
  ListItemText,
  Typography
} from '@mui/material'

import logo from '@assets/images/logos/new-vision.png'

function DetailsCard() {
  return (
    <Card>
      <CardContent>
        <div className='flex flex-col items-center gap-6'>
          <img src={logo.src} height={64} alt='new-vision' />
          <Typography variant='h5'>نيو فيجن</Typography>
          <Chip label={'لم يسدد'} color='primary' disabled />
          <Grid container>
            <Grid item container xs={6}>
              <Grid item xs={3}>
                <Avatar variant='rounded'>
                  <i className='ri-user-3-line' />
                </Avatar>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h5'>5</Typography>
                <Typography variant='body2' color={'text.secondary'}>
                  الموظفين
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={6}>
              <Grid item xs={3}>
                <Avatar variant='rounded'>
                  <i className='ri-user-3-line' />
                </Avatar>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h5'>2</Typography>
                <Typography variant='body2' color={'text.secondary'}>
                  المشاريع
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className='mt-8'>
          <Typography variant='h5'>التفاصيل</Typography>
          <Divider />
          <List>
            <ListItem>
              <ListItemText primary='كود الشركة' secondary='mashallab@' />
            </ListItem>
            <ListItem>
              <ListItemText primary='البريد الالكتروني' secondary='shallamb@gmail.com' />
            </ListItem>
            <ListItem>
              <ListItemText primary='ارقام الهاتف' secondary='0545236605' />
            </ListItem>
            <ListItem>
              <ListItemText primary='الموقع الالكتروني' secondary='www.vd-2030.com' />
            </ListItem>
            <ListItem>
              <ListItemText primary='الدولة' secondary='المملكة العربية السعودية' />
            </ListItem>
            <ListItem>
              <ListItemText primary='رقم السجل التجاري' secondary='3258258563580' />
            </ListItem>
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
