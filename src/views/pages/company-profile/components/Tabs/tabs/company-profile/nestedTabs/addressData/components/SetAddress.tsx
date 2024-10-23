import { useState, type SetStateAction } from 'react'

import { Button, Grid, Stack, TextField, Typography } from '@mui/material'

import AddLabelToEl from '@/components/AddLabelToEl'
import { SelectWithFilteration } from '@/components/SelectWithFilteration'
import AddressMapDialog from './AddressMapDialog'

const GridItem = (props: childrenProps) => (
  <Grid item xs={12} md={5.8}>
    {props.children}
  </Grid>
)

export default function SetAddressDialog(props: PropsType) {
  // declare and define component state and varables
  const { setOpen } = props
  const [openMapDialog, setOpenMapDialog] = useState(false)

  // declare and define component helper methods
  const handleClose = () => setOpen(false)

  // return component ui
  return (
    <>
      <Grid container gap={6}>
        <GridItem>
          <AddLabelToEl label='الدولة'>
            <SelectWithFilteration options={[]} />
          </AddLabelToEl>
        </GridItem>

        <GridItem>
          <AddLabelToEl label='المنطقة'>
            <SelectWithFilteration options={[]} />
          </AddLabelToEl>
        </GridItem>

        <GridItem>
          <AddLabelToEl label='المدينة'>
            <SelectWithFilteration options={[]} />
          </AddLabelToEl>
        </GridItem>

        <GridItem>
          <AddLabelToEl label='الحي'>
            <SelectWithFilteration options={[]} />
          </AddLabelToEl>
        </GridItem>

        <GridItem>
          <AddLabelToEl label='رقم المبنى'>
            <TextField size='small' />
          </AddLabelToEl>
        </GridItem>

        <GridItem>
          <AddLabelToEl label='الرقم الاضافي'>
            <TextField size='small' />
          </AddLabelToEl>
        </GridItem>

        <GridItem>
          <AddLabelToEl label='الرمز البريدي'>
            <TextField size='small' />
          </AddLabelToEl>
        </GridItem>

        <GridItem>
          <AddLabelToEl label='الشارع'>
            <TextField size='small' />
          </AddLabelToEl>
        </GridItem>

        <Grid item xs={12}>
          <Stack
            alignItems={'start'}
            direction={'row'}
            m={6}
            onClick={() => {
              setOpenMapDialog(true)
            }}
          >
            <i className='ri-map-pin-line text-primary cursor-pointer'></i>
            <Typography
              variant='body2'
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              fontSize={18}
              fontWeight={600}
            >
              تعبئة من الخريطة
            </Typography>
          </Stack>
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
      <AddressMapDialog open={openMapDialog} setOpen={setOpenMapDialog} />
    </>
  )
}

type childrenProps = {
  children: React.ReactNode
}

type PropsType = {
  setOpen: React.Dispatch<SetStateAction<boolean>>
}
