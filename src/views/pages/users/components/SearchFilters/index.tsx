'use client'
import { useContext, useState } from 'react'

import { Button, Stack, Typography } from '@mui/material'

import SelectControlField from '@/components/forms/select-elements/SelectControlField'

import { UsersContext } from '../../context'
import { SelectFieldWithValue } from '../users-table/components/EditUserDialog'

export default function UsersSearchFilters() {
  // ** handle declare and handleChangeSearchParamsdefine component state and variables
  const [search, setSearch] = useState<BodyType>({})
  const { handleChangeSearchParams, userLookups } = useContext(UsersContext)

  // ** handle declare and define component helper methods
  const handleChange = (key: string, value: string) => {
    setSearch(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    let params = ''

    //prepare serach
    for (const key in search) {
      if (search.hasOwnProperty(key)) {
        if (search[key] == 'none') delete search[key]
        else {
          if (params.length) params += '&'

          params += `${key}=${search[key]}`
        }
      }
    }

    console.log('paramsparams', params)
    handleChangeSearchParams(params)
  }

  const handleReset = () => {
    setSearch({
      tenant_id: 'none',
      user_type_id: 'none'
    })
    handleChangeSearchParams('')
  }

  // ** return component ui
  return (
    <Stack spacing={3} p={4}>
      <Typography variant='body2' fontSize={22} fontWeight={500}>
        فلتر البحث
      </Typography>
      <Stack
        className='gap-4'
        direction={{
          xs: 'column',
          sm: 'row'
        }}
      >
        {/* user type */}
        <SelectFieldWithValue
          label='الشركة'
          value={search['tenant_id']}
          handleChange={val => {
            handleChange('tenant_id', val)
          }}
          options={userLookups?.tenants?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
        />
        {/* user type */}
        <SelectFieldWithValue
          label='نوع المستخدم'
          value={search['user_type_id']}
          handleChange={val => {
            handleChange('user_type_id', val)
          }}
          options={userLookups?.user_types?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
        />
        <SelectControlField
          label='حالة الموظف'
          options={[]}
          addNoneOption={true}

          // handleSelectFieldChange={(newValue: string) => {
          //   handleChange('tenant_id', newValue)
          // }}
        />
        <Button variant='contained' color='primary' onClick={handleSearch}>
          بحث
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleReset}>
          reset
        </Button>
      </Stack>
    </Stack>
  )
}

type BodyType = { [key: string]: string }
