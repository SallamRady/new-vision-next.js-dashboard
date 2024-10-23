import type { ReactNode } from 'react'

import type { BoxProps, CardProps, CardTypeMap, StackProps, TypographyProps } from '@mui/material'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

function CardWithFloatingActions({
  actionsBoxProps,
  actionsContent,
  children,
  additionalContent,
  topContainedProps,
  label,
  labelTypographyProps,
  ...props
}: Props) {
  return (
    <Card
      variant='outlined'
      {...props}
      sx={{ position: 'relative', overflow: 'visible', bgcolor: 'background.default', ...props.sx }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={4}
        justifyContent='space-between'
        {...topContainedProps}
        sx={{
          position: 'absolute',
          px: { xs: 4, md: 10 },
          transform: 'translateY(-50%)',
          top: 0,
          width: 1,
          ...topContainedProps?.sx
        }}
      >
        <Typography variant='h4' fontWeight={500} bgcolor={'background.default'} {...labelTypographyProps}>
          {label}
        </Typography>
        <Box bgcolor='background.default' {...actionsBoxProps}>
          {actionsContent}
        </Box>
      </Stack>
      <CardContent sx={{ pt: 14 }}>{children}</CardContent>
      {additionalContent}
    </Card>
  )
}

type Props<RootComponent extends React.ElementType = CardTypeMap['defaultComponent'], AdditionalProps = {}> = CardProps<
  RootComponent,
  AdditionalProps
> & {
  actionsBoxProps?: BoxProps
  actionsContent?: ReactNode
  additionalContent?: ReactNode
  topContainedProps?: StackProps
  label?: ReactNode
  labelTypographyProps?: TypographyProps
}

export default CardWithFloatingActions
