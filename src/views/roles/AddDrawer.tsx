'use client'

import { api } from '@/Constants/Api'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'
import { Role } from '@/types/api/common/Role'
import { getPermissions } from '@/utils/api/permissions/get-permissions'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { permission } from 'process'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const addRoleSchema = z.object({
  name: z.string().min(4).max(64),
  permissions: z.array(z.string())
})
type AddRoleSchemaType = z.infer<typeof addRoleSchema>

function AddDrawer({ onClose, open, role }: Props) {
  const { data: permissions } = useQuery({
    queryKey: ['all permissions'],
    queryFn: async () => {
      const headers = await getClientAuthHeaders()
      return await getPermissions(headers)
    }
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<AddRoleSchemaType>({
    resolver: zodResolver(addRoleSchema),
    defaultValues: {
      name: '',
      permissions: []
    }
  })
  const router = useRouter()
  const onSubmit = handleSubmit(async data => {
    try {
      const headers = await getClientAuthHeaders()
      const res = await axios.post(api`create-role`, data, { headers })
      onClose()
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Drawer variant='temporary' anchor='right' open={open} onClose={onClose}>
      <div className={'p-4'}>
        <Typography variant='h5' gutterBottom>
          اضافة دور
        </Typography>
        <Stack width={350} component={'form'} onSubmit={onSubmit} spacing={4} mt={6}>
          <TextField {...register('name')} fullWidth label='اسم الدور' />
          <Controller
            control={control}
            name='permissions'
            render={({ field }) => (
              <TextField
                select
                label='اختر الصلاحيات'
                SelectProps={{
                  multiple: true,
                  renderValue: () => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {field.value.map(value => (
                        <Chip variant='tonal' color={'primary'} key={value} label={value} />
                      ))}
                    </Box>
                  )
                }}
                {...field}
                value={field.value || []}
              >
                {permissions?.map(permission => (
                  <MenuItem key={permission.id} value={permission.name}>
                    {permission.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <LoadingButton loading={isSubmitting} type='submit' variant='contained'>
            حفظ
          </LoadingButton>
        </Stack>
      </div>
    </Drawer>
  )
}

type Props = {
  open: boolean
  onClose: () => void
  role?: Role
}

export default AddDrawer
