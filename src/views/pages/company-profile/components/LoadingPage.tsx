import { Skeleton, Stack } from '@mui/material'

export default function CompanyDetailsLoadingPage() {
  return (
    <Stack spacing={4}>
      <Skeleton variant='rounded' width={'100%'} height={160} sx={{ my: 4 }} />
      <Stack my={4} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Skeleton variant='rounded' width={'30%'} height={240} sx={{ my: 4 }} />
        <Skeleton variant='rounded' width={'65%'} height={240} sx={{ my: 4 }} />
      </Stack>
      <Skeleton variant='rounded' width={'100%'} height={40} sx={{ my: 4 }} />
      <Skeleton variant='rounded' width={'100%'} height={40} sx={{ my: 4 }} />
      <Skeleton variant='rounded' width={'100%'} height={300} sx={{ my: 4 }} />
    </Stack>
  )
}
