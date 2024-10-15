'use client';
import { useEffect } from 'react';
import { api } from '@/Constants/api-v2';
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders';
import { Role } from '@/types/api/common/Role';
import { getPermissions } from '@/utils/api/permissions/get-permissions';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const addRoleSchema = z.object({
  name: z.string().min(4, { message: "اسم الدور يجب أن يكون على الأقل 4 أحرف." }).max(64, { message: "اسم الدور يجب ألا يتجاوز 64 حرفًا." }),
  permissions: z.array(z.string())
});
type AddRoleSchemaType = z.infer<typeof addRoleSchema>;

type Props = {
  open: boolean;
  onClose: () => void;
  role?: Role | null; // Allow undefined and null for role
};

function AddDrawer({ onClose, open, role }: Props) {
  const { data: permissions, isLoading: loadingPermissions } = useQuery({
    queryKey: ['all permissions'],
    queryFn: async () => {
      const headers = await getClientAuthHeaders();
      return await getPermissions(headers);
    }
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AddRoleSchemaType>({
    resolver: zodResolver(addRoleSchema),
    defaultValues: {
      name: '',
      permissions: []
    }
  });

  const router = useRouter();

  useEffect(() => {
    if (role) {
      reset({
        name: role.name || '',
        permissions: role.permissions?.map(p => p.name) || []
      });
    } else {
      reset({
        name: '',
        permissions: []
      });
    }
  }, [role, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const headers = await getClientAuthHeaders();
      const res = await axios.post(api`${role ? `update-role/${role.id}` : 'create-role'}`, data, { headers });
      onClose();
      router.refresh();
    } catch (error) {
      console.error('Error while saving role:', error);
    }
  });

  return (
    <Drawer variant='temporary' anchor='right' open={open} onClose={onClose}>
      <div className='p-4'>
        <Typography variant='h5' gutterBottom>
          {role ? 'تعديل دور' : 'إضافة دور'}
        </Typography>
        <Stack width={350} component={'form'} onSubmit={onSubmit} spacing={4} mt={6}>
          <TextField
            {...register('name')}
            fullWidth
            label='اسم الدور'
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <Controller
            control={control}
            name='permissions'
            render={({ field }) => (
              <TextField
                select
                label='اختر الصلاحيات'
                SelectProps={{
                  multiple: true,
                  renderValue: (selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip variant='outlined' color='primary' key={value} label={value} />
                      ))}
                    </Box>
                  )
                }}
                {...field}
                value={field.value || []} // Ensure value is always an array
              >
                {loadingPermissions ? (
                  <MenuItem disabled>جاري تحميل الصلاحيات...</MenuItem>
                ) : (
                  permissions?.map((permission) => (
                    <MenuItem key={permission.id} value={permission.name}>
                      {permission.label}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />
          <LoadingButton loading={isSubmitting} type='submit' variant='contained'>
            {role ? 'تحديث' : 'حفظ'}
          </LoadingButton>
        </Stack>
      </div>
    </Drawer>
  );
}

export default AddDrawer;
