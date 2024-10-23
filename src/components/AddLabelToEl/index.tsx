import type { TypographyProps } from '@mui/material'
import { Stack, Typography } from '@mui/material'

import RequiredSymbol from '../RequiredSymbol'

function AddLabelToEl(props: PropsType) {
  return (
    <Stack
      width={1}
      {...(props.row
        ? {
            direction: 'row',
            spacing: 2,
            alignItems: 'center'
          }
        : undefined)}
    >
      <Typography component='label' gutterBottom={!props.row} {...props.labelTypographyProps}>
        {props.label} {props.required && <RequiredSymbol />}
      </Typography>
      {props.children}
    </Stack>
  )
}

export default AddLabelToEl

type PropsType = {
  children?: React.ReactNode
  label: string
  required?: boolean
  labelTypographyProps?: TypographyProps
  row?: boolean
}
