import type { SetStateAction } from 'react'

import { Button, Grid, TextField } from '@mui/material'

import AddLabelToEl from '@/components/AddLabelToEl'
import { SelectWithFilteration } from '@/components/SelectWithFilteration'

const GridItem = (props: childrenProps) => (
  <Grid item xs={12} md={5.8}>
    {props.children}
  </Grid>
)

export default function SetUserDialog(props: PropsType) {
  // declare and define component state and varables
  const { setOpen } = props

  // declare and define component helper methods
  const handleClose = () => setOpen(false)

  // return component ui
  return (
    <Grid container gap={6}>
      <GridItem>
        <AddLabelToEl label='اسم الموظف'>
          <SelectWithFilteration options={[]} />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='رقم المعرف'>
          <TextField size='small' />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='نوع المعرف'>
          <SelectWithFilteration options={[]} />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='رقم الجوال'>
          <TextField size='small' />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='البريد الالكتروني'>
          <TextField size='small' />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='الجنسية'>
          <SelectWithFilteration options={[]} />
        </AddLabelToEl>
      </GridItem>

      <Grid item xs={12}>
        <AddLabelToEl label='الدور'>
          <SelectWithFilteration options={[]} />
        </AddLabelToEl>
      </Grid>

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
