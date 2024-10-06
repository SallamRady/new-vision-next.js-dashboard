// React Imports
import { SetStateAction } from 'react'

// MUI Imports
import { FormControlLabel, Switch } from '@mui/material'
import { errorMessage } from '@/utils/notificationsMessages'
import GlobelDropDownMenu, { GenericMenuButton } from '@/components/drop-down-menu/GlobelDropDownMenu'
import { LoginWayType } from '@/types/login-way'

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
      )
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
      )
    }
  ]

  // ** declare and define component helper methods
  const handleStatusSwitch = async () => {
    try {
      console.log('want back-end')
    } catch (error) {
      // show feedback message for user
      console.error('Error switching status in Login Ways ::', error)
      errorMessage('تعذر تغير حالةالمعرف')
    }
  }

  // ** return ui
  return (
    <>
      <GlobelDropDownMenu disabled={true} btnTitle='أجراء' buttons={buttons} />
    </>
  )
}

type PropsType = {
  id: number
  status: boolean
  setTableData: React.Dispatch<SetStateAction<LoginWayType[]>>
}
