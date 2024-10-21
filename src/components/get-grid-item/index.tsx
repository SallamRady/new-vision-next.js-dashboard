import { Grid } from '@mui/material'
import type { GridProps } from '@mui/material'

export function getGridItem(sizing: GetGridItemProps) {
  return (props: GridProps) => <Grid item {...sizing} {...props} />
}

type GetGridItemProps = Partial<{
  xs: number
  md: number
  lg: number
  xl: number
}>
