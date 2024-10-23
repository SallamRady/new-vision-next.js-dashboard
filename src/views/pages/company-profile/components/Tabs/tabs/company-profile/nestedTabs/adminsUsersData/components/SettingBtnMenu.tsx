'use client'

import { useState, type SetStateAction } from 'react'

import { Typography } from '@mui/material'

import GlobelDropDownMenu from '@/components/drop-down-menu/GlobelDropDownMenu'
import type { GenericMenuButton } from '@/components/drop-down-menu/GlobelDropDownMenu'
import ScreenCenterDialog from '@/components/dialogs/screen-center-dialog'
import SetUserDialog from './SetUserDialog'

export default function SettingBtnMenu(props: PropsType) {
  // ** declare and define component state and variables
  const [openSetUser, setOpenSetUser] = useState(false)

  const buttons: GenericMenuButton[] = [
    {
      id: `menu-btn-1`,
      title: (
        <div className='flex items-center gap-4 text-info'>
          <i className='ri-add-line'></i>
          <p className='text-slate-300 text-lg'>اضافة مستخدم</p>
        </div>
      ),
      onClick: () => {
        setOpenSetUser(true)

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
        open={openSetUser}
        setOpen={setOpenSetUser}
        dialogMaxWidth='md'
        isFullWidth={true}
        title={
          <Typography
            variant='body1'
            fontWeight={600}
            fontSize={21}
            mt={6}
            mb={2}
            textAlign={'center'}
            fontFamily={'sans-serif'}
          >
            اضافة بيانات المستخدم الرئيسي
          </Typography>
        }
        dialogContent={<SetUserDialog setOpen={setOpenSetUser} />}
      />
    </>
  )
}

type PropsType = {
  setContinueEditting: React.Dispatch<SetStateAction<boolean>>
}
