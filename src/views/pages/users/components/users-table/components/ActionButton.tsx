import GlobelDropDownMenu, { GenericMenuButton } from '@/components/drop-down-menu/GlobelDropDownMenu'
import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'

export default function ActionButton(props: PropsType) {
  // ** declare and define component state and variables
  const { rowId, OnSuccessDeleteDialogAction } = props
  const buttons: GenericMenuButton[] = [
    {
      id: `menu-btn-1`,
      title: (
        <div className='flex items-center gap-4 text-info'>
          <i className='ri-eye-line'></i>
          <p className='text-slate-300 text-lg'>عرض</p>
        </div>
      )
    },
    {
      id: `menu-btn-2`,
      title: (
        <div className='flex items-center gap-4 text-warning'>
          <i className='ri-pencil-line'></i>
          <p className='text-slate-300 text-lg'>استكمال بيانات</p>
        </div>
      )
    },
    {
      id: `menu-btn-3`,
      title: (
        <div className='flex items-center gap-4 text-warning'>
          <i className='ri-pencil-line'></i>
          <p className='text-slate-300 text-lg'>تعديل</p>
        </div>
      )
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
      .delete(api`user/${rowId}`)
      .then(() => {
        OnSuccessDeleteDialogAction()
        SuccessMessage('تم حذف المستخدم بنجاح')
      })
      .catch(err => {
        errorMessage('تعذر الحذف')
      })
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
  rowId: number
  OnSuccessDeleteDialogAction: () => void
}
