import { useState } from 'react'

import { Autocomplete, TextField } from '@mui/material'

export const SelectWithFilteration = (props: PropsType) => {
  const [filteredOptions, setFilteredOptions] = useState(props.options)

  const handleInputChange = (event: unknown, value: string) => {
    const inputValue = value.trim().toLowerCase()
    const filtered = props.options.filter(option => option.label.toLowerCase().includes(inputValue))

    setFilteredOptions(filtered)
  }

  return (
    <Autocomplete
      options={filteredOptions}
      getOptionLabel={option => option.label}
      renderInput={params => (
        <TextField
          {...params}
          size='small'
          label='Type to Filter'
          onChange={event => handleInputChange(event, event.target.value)}
        />
      )}
    />
  )
}

type PropsType = {
  options: { label: string; id: number | string }[]
}
