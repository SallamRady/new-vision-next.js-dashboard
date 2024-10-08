// Import Styles
import './index.css'

// import MUI elements
import { Box, Typography } from '@mui/material'

export default function Loader(props: LoaderProps) {
  const { height, title } = props

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: height ?? '400px',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <Box className='loaderDiv'></Box>
      <Typography sx={{ marginTop: '1rem' }} variant='body2'>
        {Boolean(title) ? title : 'جاري التحميل'}
      </Typography>
    </Box>
  )
}

type LoaderProps = {
  height?: string
  title?: string
}
