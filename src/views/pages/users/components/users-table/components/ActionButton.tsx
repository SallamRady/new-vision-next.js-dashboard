'use client'
import type { SetStateAction } from 'react'

import { useContext, useState } from 'react'

import { Typography } from '@mui/material'

import type { GenericMenuButton } from '@/components/drop-down-menu/GlobelDropDownMenu'
import GlobelDropDownMenu from '@/components/drop-down-menu/GlobelDropDownMenu'
import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'

import { UsersContext } from '../../../context'
import type { UserType } from '@/types/users/users-page-types'
import ScreenCenterDialog from '@/components/dialogs/screen-center-dialog'

import DeleteUserDialogContent from './DeleteDialogContent'

export default function ActionButton(props: PropsType) {
  // ** declare and define component state and variables
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const { row, OnSuccessDeleteDialogAction, setOpenAddDialog } = props
  const { handleChangeFormMode, handleStoreEditedUser } = useContext(UsersContext)

  const buttons: GenericMenuButton[] = [
    {
      id: `menu-btn-1`,
      title: (
        <div className='flex items-center gap-4 text-info'>
          <i className='ri-eye-line'></i>
          <p className='text-slate-300 text-lg'>عرض</p>
        </div>
      ),
      disabled: true
    },
    {
      id: `menu-btn-2`,
      title: (
        <div className='flex items-center gap-4 text-warning'>
          <i className='ri-pencil-line'></i>
          <p className='text-slate-300 text-lg'>استكمال بيانات</p>
        </div>
      ),
      disabled: true
    },
    {
      id: `menu-btn-3`,
      title: (
        <div className='flex items-center gap-4 text-warning'>
          <i className='ri-pencil-line'></i>
          <p className='text-slate-300 text-lg'>تعديل</p>
        </div>
      ),
      onClick: () => {
        handleEditUser()
      }
    },
    {
      id: `menu-btn-4`,
      title: (
        <div className='flex items-center gap-4 text-error'>
          <i className='ri-delete-bin-6-line'></i>
          <p className='text-slate-300 text-lg'>حذف</p>
        </div>
      ),
      onClick: () => {
        if (row.tenants?.length <= 1) handleDeleteUser()
        else setOpenDeleteDialog(true)
      }
    }
  ]

  // ** declare and define actions
  const handleDeleteUser = () => {
    const body = row?.tenants?.length > 0 ? { tenant_id: [row?.tenants?.[0]?.id] } : {}

    axiosInstance
      .post(api`user/delete/${row.id}`, body)
      .then(() => {
        OnSuccessDeleteDialogAction()
        SuccessMessage('تم حذف المستخدم بنجاح')
      })
      .catch(() => {
        errorMessage('تعذر الحذف')
      })
  }

  const handleEditUser = () => {
    handleStoreEditedUser(row)
    handleChangeFormMode('Edit')
    setOpenAddDialog(true)
  }

  // ** return component ui
  return (
    <>
      <GlobelDropDownMenu
        btnTitle='أجراء'
        buttons={buttons}

        //btnColor='inherit'
      />
      <ScreenCenterDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title={
          <Typography variant='body1' fontWeight={600} fontSize={19} mt={6} mb={2}>
            المستخدم الذي ترغب فى حذفه مشترك فى أكثر من شركة
          </Typography>
        }
        dialogContent={<DeleteUserDialogContent user={row} OnSuccessDeleteDialogAction={OnSuccessDeleteDialogAction} />}
      />
    </>
  )
}

type PropsType = {
  row: UserType
  OnSuccessDeleteDialogAction: () => void
  setOpenAddDialog: React.Dispatch<SetStateAction<boolean>>
}
