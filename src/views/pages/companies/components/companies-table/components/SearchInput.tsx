import { useContext } from 'react'

import { Box, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

import { CompaniesContext } from '../../../context/Companies'

function SearchInput() {
  const { search, setSearch } = useContext(CompaniesContext)
  const { register, handleSubmit } = useForm<{ search: string }>({ defaultValues: { search } })

  const onSubmit = handleSubmit(({ search }) => {
    setSearch(search)
  })

  return (
    <Box component={'form'} noValidate onSubmit={onSubmit}>
      <TextField size='small' {...register('search')} placeholder='البحث' fullWidth />
    </Box>
  )
}

export default SearchInput
