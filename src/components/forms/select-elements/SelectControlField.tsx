import type { SelectFieldOptionType } from '@/types/input-controls-types'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export default function SelectControlField(props: SelectControlFieldProps) {
  // ** declare and define helper variables
  const { label, options, addNoneOption, defaultValue = '', isfullWidth = true } = props
  // ** return component UI
  return (
    <FormControl fullWidth={isfullWidth} sx={{ width: !isfullWidth ? '120px' : undefined }}>
      <InputLabel id='demo-basic-select-outlined-label' size='small'>
        {label}
      </InputLabel>
      <Select label={label} defaultValue={defaultValue} size='small'>
        {addNoneOption === true && (
          <MenuItem value={'none'}>
            <em>None</em>
          </MenuItem>
        )}
        {options?.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

type SelectControlFieldProps = {
  label: string
  options: SelectFieldOptionType[]
  handleSelectFieldChange: (newValue: string) => void
  //optional
  addNoneOption?: boolean
  defaultValue?: string
  isfullWidth?: boolean
}
