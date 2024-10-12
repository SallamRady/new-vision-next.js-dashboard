'use client'
import GlobelDropDownMenu, { GenericMenuButton } from '@/components/drop-down-menu/GlobelDropDownMenu'
import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'
import { SetStateAction, useContext } from 'react'
import { UsersContext } from '../../../context'
import { UserType } from '@/types/users/users-page-types'

export default function ActionButton(props: PropsType) {
  // ** declare and define component state and variables
  const { handleChangeFormMode, handleStoreEditedUser } = useContext(UsersContext)
  const { row, OnSuccessDeleteDialogAction, setOpenAddDialog } = props

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
        handleDeleteUser()
      }
    }
  ]

  // ** declare and define actions
  const handleDeleteUser = () => {
    axiosInstance
      .delete(api`user/${row.id}`)
      .then(() => {
        OnSuccessDeleteDialogAction()
        SuccessMessage('تم حذف المستخدم بنجاح')
      })
      .catch(err => {
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
    </>
  )
}

type PropsType = {
  row: UserType
  OnSuccessDeleteDialogAction: () => void
  setOpenAddDialog: React.Dispatch<SetStateAction<boolean>>
}
