'use client'

import { useState, type SetStateAction } from 'react'

import { Typography } from '@mui/material'

import GlobelDropDownMenu from '@/components/drop-down-menu/GlobelDropDownMenu'
import type { GenericMenuButton } from '@/components/drop-down-menu/GlobelDropDownMenu'
import ScreenCenterDialog from '@/components/dialogs/screen-center-dialog'
import SetOfficialDocument from './SetOfficialDocument'

export default function SettingBtnMenu(props: PropsType) {
  // ** declare and define component state and variables
  const [openSetOfficaialDocs, setOpenSetOfficaialDocs] = useState(false)

  const buttons: GenericMenuButton[] = [
    {
      id: `menu-btn-1`,
      title: (
        <div className='flex items-center gap-4 text-info'>
          <i className='ri-add-line'></i>
          <p className='text-slate-300 text-lg'>اضافة مستند رسمي</p>
        </div>
      ),
      onClick: () => {
        setOpenSetOfficaialDocs(true)

        props.setContinueEditting(prev => !prev)
      }
    }
  ]

  // ** declare and define actions

  // ** return component ui
  return (
    <>
      <GlobelDropDownMenu btnTitle='أجراء' buttons={buttons} iconButon={true} icon='ri-settings-3-line' />
      <ScreenCenterDialog
        open={openSetOfficaialDocs}
        setOpen={setOpenSetOfficaialDocs}
        dialogMaxWidth='md'
        isFullWidth={true}
        title={
          <Typography variant='body1' fontWeight={600} fontSize={19} mt={6} mb={2} textAlign={'center'}>
            اضافة المستندات الرسمية
          </Typography>
        }
        dialogContent={<SetOfficialDocument setOpen={setOpenSetOfficaialDocs} />}
      />
    </>
  )
}

type PropsType = {
  setContinueEditting: React.Dispatch<SetStateAction<boolean>>
}
