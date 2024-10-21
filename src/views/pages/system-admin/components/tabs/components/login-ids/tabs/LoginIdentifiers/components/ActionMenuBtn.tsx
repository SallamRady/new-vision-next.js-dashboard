'use client'

// React Imports
import type { SetStateAction } from 'react'

// MUI Imports
import { FormControlLabel, Switch } from '@mui/material'

import type { LoginIDType } from '@/types/system-admin/login-ids'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'
import { api } from '@/Constants/Api'
import type { GenericMenuButton } from '@/components/drop-down-menu/GlobelDropDownMenu'
import GlobelDropDownMenu from '@/components/drop-down-menu/GlobelDropDownMenu'
import axiosInstance from '@/libs/axiosConfig'

export default function ActionMenuButton(props: PropsType) {
  // ** declare and define component state abd variables
  const buttons: GenericMenuButton[] = [
    {
      id: `menu-btn-1`,
      title: (
        <div className='flex items-center gap-4 text-warning'>
          <i className='ri-pencil-line'></i>
          <p className='text-slate-300 text-lg'>تعديل</p>
        </div>
      ),
      disabled: true
    },
    {
      id: `menu-btn-2`,
      title: (
        <div className='flex items-center gap-4'>
          <FormControlLabel
            control={<Switch checked={props.status} />}
            label={props.status ? 'الغاء التفعيل' : 'تفعيل'}
          />
        </div>
      ),
      onClick: () => {
        handleStatusSwitch()
      }
    },
    {
      id: `menu-btn-3`,
      title: (
        <div className='flex items-center gap-4 text-error'>
          <i className='ri-delete-bin-6-line'></i>
          <p className='text-slate-300 text-lg'>حذف</p>
        </div>
      ),
      disabled: true
    }
  ]

  // ** declare and define component helper methods
  const handleStatusSwitch = async () => {
    try {
      // send request
      await axiosInstance.post(api`active-inactive-identifier`, {
        identifier_id: props.id
      })

      // change data in table
      props.setTableData(prev => {
        return prev.map(ele => {
          if (ele.id == props.id) return { ...ele, status: !ele.status }

          return ele
        })
      })

      // show feedback message for user
      SuccessMessage('تم تغير حالة المعرف بنجاح')
    } catch (error) {
      // show feedback message for user
      console.error('Error switching status:', error)
      errorMessage('تعذر تغير حالةالمعرف')
    }
  }

  // ** return ui
  return (
    <>
      <GlobelDropDownMenu btnTitle='أجراء' buttons={buttons} />
    </>
  )
}

type PropsType = {
  id: number
  status: boolean
  setTableData: React.Dispatch<SetStateAction<LoginIDType[]>>
}
