import type { SetStateAction } from 'react'

import { DatePicker } from '@mui/x-date-pickers'
import { Button, Grid, IconButton, Stack, styled, TextField, Typography } from '@mui/material'

import AddLabelToEl from '@/components/AddLabelToEl'
import { SelectWithFilteration } from '@/components/SelectWithFilteration'
import FieldSet from '@/components/FieldSet'

const GridItem = (props: childrenProps) => (
  <Grid item xs={12} md={5.8}>
    {props.children}
  </Grid>
)

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function SetOfficialDocument(props: PropsType) {
  // declare and define component state and varables
  const { setOpen } = props

  // declare and define component helper methods
  const handleClose = () => setOpen(false)

  // return component ui
  return (
    <Grid container gap={6}>
      <GridItem>
        <AddLabelToEl label='نوع المستند'>
          <SelectWithFilteration options={[]} />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='الوصف'>
          <TextField size='small' />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='رقم المستند'>
          <TextField size='small' />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='تاريخ الاصدار'>
          <DatePicker
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
            onChange={newValue => {
              console.log('newValuenewValue', newValue)
            }}
          />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='تاريخ الاصدار'>
          <DatePicker
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
            onChange={newValue => {
              console.log('newValuenewValue', newValue)
            }}
          />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='تاريخ الاشعار'>
          <DatePicker
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
            onChange={newValue => {
              console.log('newValuenewValue', newValue)
            }}
          />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <FieldSet
          leftTitle={
            <Typography variant='body2' fontSize={18}>
              المرفقات
            </Typography>
          }
        >
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} m={2}>
            <Stack direction={'row'} alignItems={'start'} justifyContent={'start'}>
              Test
            </Stack>
            <IconButton tabIndex={-1} component='label' role={undefined}>
              <i className='ri-file-upload-line text-success'></i>
              <VisuallyHiddenInput type='file' onChange={event => console.log(event.target.files)} multiple />
            </IconButton>
          </Stack>
        </FieldSet>
      </GridItem>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 5 }}>
        <Button variant='contained' sx={{ mx: 1 }}>
          حفظ
        </Button>
        <Button variant='outlined' sx={{ mx: 1 }} color='inherit' onClick={handleClose}>
          الغاء
        </Button>
      </Grid>
    </Grid>
  )
}

type childrenProps = {
  children: React.ReactNode
}

type PropsType = {
  setOpen: React.Dispatch<SetStateAction<boolean>>
}
