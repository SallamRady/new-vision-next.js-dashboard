import type { TypographyProps } from '@mui/material'
import { Typography } from '@mui/material'

function FloatingTypography(props: TypographyProps) {
  return <Typography color={'secondary.contrastText'} {...props} />
}

export default FloatingTypography
