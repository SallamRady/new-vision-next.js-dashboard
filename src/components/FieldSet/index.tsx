import { Divider, Stack } from '@mui/material'

export default function FieldSet(props: FieldSetProps) {
  const { leftTitle, rightTitle, children } = props

  return (
    <Stack
      component='fieldset'
      justifyContent={'center'}
      sx={{
        borderColor: 'inherit',
        borderWidth: '2px',
        borderRadius: '6px'
      }}
    >
      <Stack
        component={'legend'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        width={Boolean(rightTitle) ? '97%' : undefined}
        mx={4}
      >
        {leftTitle}
        {Boolean(rightTitle) && (
          <>
            <Divider flexItem variant={'middle'} sx={{ mx: 4, flexGrow: 1, my: '20px' }} />
            {rightTitle}
          </>
        )}
      </Stack>
      {children}
    </Stack>
  )
}

type FieldSetProps = {
  leftTitle: React.ReactNode
  rightTitle?: React.ReactNode
  children: React.ReactNode
}
