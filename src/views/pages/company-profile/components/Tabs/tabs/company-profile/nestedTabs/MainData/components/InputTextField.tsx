import { TextField, Tooltip } from '@mui/material'

export default function InputTextField(props: InputTextFieldProps) {
  const { disabled = false, label, value = '', error = false } = props

  return (
    <>
      <TextField
        disabled={disabled}
        variant='outlined'
        size='small'
        fullWidth
        value={value}
        label={label}
        InputProps={{
          endAdornment: !error ? (
            <></>
          ) : (
            <Tooltip title='لتعديل هذا ال field قم بطلب لتعديل' placement='top'>
              <i className='ri-error-warning-line text-warning'></i>
            </Tooltip>
          )
        }}
      />
    </>
  )
}

type InputTextFieldProps = {
  label: string

  disabled?: boolean
  value?: string
  error?: boolean
}
