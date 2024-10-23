import {
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'

export default function CompanyPackageCard() {
  return (
    <Stack
      spacing={2}
      sx={{
        boxShadow: '0px 0.79px 3.95px 0px #4C4E6438',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(67, 55, 140, 0.1) 100%)',
        border: '0.79px solid var(--Pink, #F42588)',
        p: 3,
        borderRadius: '4px',
        minHeight: '230px',
        position: 'relative'
      }}
      alignItems={'center'}
      justifyContent={'center'}
    >
      {/* package type */}
      <Chip
        label='فضية'
        color='primary'
        variant='tonal'
        sx={{
          position: 'absolute',
          top: '3%',
          right: '3%',
          backgroundColor: '#18003A',
          borderRadius: '8px',
          fontSize: '14px'
        }}
      />
      {/* package information (price & features list) */}
      <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={'start'} width={'100%'}>
        {/* package price */}
        <Stack spacing={2} alignItems={'center'} justifyContent={'center'} width={'33%'}>
          <Typography variant='body1' className='text-primary' fontSize={20}>
            <sup>SR</sup>
            <span style={{ fontSize: '28px' }}>99</span>
          </Typography>
          <Typography variant='body2' fontWeight={400} fontSize={20}>
            شهر
          </Typography>
        </Stack>
        {/* package features list */}
        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <i className='ri-verified-badge-fill'></i>
              </ListItemIcon>
              <ListItemText primary='10 مستخدمين' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <i className='ri-verified-badge-fill'></i>
              </ListItemIcon>
              <ListItemText primary='سعة تخزين تصل إلى 10 جيجابايت' />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <i className='ri-verified-badge-fill'></i>
              </ListItemIcon>
              <ListItemText primary='دعم افتراضي' />
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
      {/* progressbar  */}
      <Stack alignItems={'center'} justifyContent={'center'} mx={4} width={'100%'}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mx={4} width={'90%'}>
          <Typography variant='body2' fontSize={15} fontWeight={600}>
            الايام
          </Typography>
          <Typography variant='body2' fontSize={15} fontWeight={600}>
            65%
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} mx={4} width={'90%'}>
          <LinearProgress variant='determinate' value={65} color='primary' className='bs-2 is-full' />
        </Stack>
        <Typography variant='body2' color={'text.secondary'} width={'90%'}>
          4 ايام متبقية
        </Typography>
      </Stack>
      {/* upgrade package button */}
      <Button variant='contained' sx={{ width: '60%' }}>
        تطوير الباقة
      </Button>
    </Stack>
  )
}
