// Import Styles
import { Stack } from '@mui/material'
import styles from './index.module.css'

export default function Loader(props: LoaderProps) {
  const { height } = props

  return (
    <Stack width={'100%'} alignItems={'center'} justifyContent={'center'} height={height ?? '400px'}>
      <div className={`${styles.loader} bg-primary`}></div>
    </Stack>
  )
}

type LoaderProps = {
  height?: string
}
