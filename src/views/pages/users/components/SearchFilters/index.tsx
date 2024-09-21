import SelectControlField from '@/components/forms/select-elements/SelectControlField'
import { Stack, Typography } from '@mui/material'

export default function UsersSearchFilters() {
  // ** handle declare and define component state and variables
  // ** handle declare and define component helper methods
  const handleSelectFieldChange = (newValue: string) => {}
  // ** return component ui
  return (
    <Stack spacing={3} p={4}>
      <Typography variant='body2' fontSize={22} fontWeight={500}>
        فلتر البحث
      </Typography>
      <div className='flex gap-4'>
        <SelectControlField
          label='الشركة'
          options={[]}
          addNoneOption={true}
          handleSelectFieldChange={handleSelectFieldChange}
        />
        <SelectControlField
          label='نوع المستخدم'
          options={[]}
          addNoneOption={true}
          handleSelectFieldChange={handleSelectFieldChange}
        />
        <SelectControlField
          label='حالة الموظف'
          options={[]}
          addNoneOption={true}
          handleSelectFieldChange={handleSelectFieldChange}
        />
      </div>
    </Stack>
  )
}
