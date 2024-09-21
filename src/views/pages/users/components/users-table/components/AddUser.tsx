import SelectControlField from '@/components/forms/select-elements/SelectControlField'
import { Button, Stack, TextField } from '@mui/material'

export default function AddUserDialogContent() {
  // ** handle declare and define component state and variables
  // ** handle declare and define component helper methods
  const handleSelectFieldChange = (newValue: string) => {}
  // ** return component ui
  return (
    <Stack spacing={3} width={'100%'}>
      <SelectControlField
        label='نوع المستخدم'
        options={[]}
        addNoneOption={true}
        handleSelectFieldChange={handleSelectFieldChange}
      />
      <SelectControlField
        label='اسم الشركة'
        options={[]}
        addNoneOption={true}
        handleSelectFieldChange={handleSelectFieldChange}
      />
      <SelectControlField
        label='الفرع'
        options={[]}
        addNoneOption={true}
        handleSelectFieldChange={handleSelectFieldChange}
      />
      <TextField variant='outlined' label='اسم الموظف' size='small' />
      <TextField variant='outlined' label='رقم الهوية' size='small' />
      <TextField variant='outlined' label='البريد الالكتروني' size='small' />
      <TextField variant='outlined' label='وسيلة الاتصال' size='small' />
      <TextField variant='outlined' label='المسمى الوظيفي' size='small' />
      <Button size='small' variant='contained'>
        حفظ
      </Button>
    </Stack>
  )
}
