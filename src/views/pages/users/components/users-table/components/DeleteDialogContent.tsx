import { api } from '@/Constants/api'
import axiosInstance from '@/libs/axiosConfig'
import { UserType } from '@/types/users/users-page-types'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack
} from '@mui/material'
import { useState } from 'react'

export default function DeleteUserDialogContent(props: PropsType) {
  // states and variables
  const [loading, setLoading] = useState(false)
  const { user, OnSuccessDeleteDialogAction } = props
  const [checked, setChecked] = useState<number[]>([])

  // declare and define component helper methods
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleClick = () => {
    setLoading(true)
    let body = { tenant_id: checked }

    axiosInstance
      .post(api`user/delete/${user.id}`, body)
      .then(() => {
        OnSuccessDeleteDialogAction()
        SuccessMessage('تم حذف المستخدم بنجاح')
      })
      .catch(err => {
        errorMessage('تعذر الحذف')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // return component ui
  return (
    <Stack spacing={2}>
      <List>
        {user?.tenants?.map(company => (
          <ListItem disablePadding key={company.id}>
            <ListItemButton onClick={handleToggle(company.id)} disabled={loading}>
              <ListItemAvatar>
                <img
                  src={company.media?.[0]?.original_url ?? ''}
                  alt={company.name}
                  width={'35px'}
                  height={'35px'}
                  style={{ borderRadius: '50%' }}
                />
              </ListItemAvatar>
              <ListItemText id={`company-label-${company.id}`} primary={company.name ?? ''} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  tabIndex={-1}
                  disabled={loading}
                  disableRipple
                  onChange={handleToggle(company.id)}
                  checked={checked.indexOf(company.id) !== -1}
                  inputProps={{ 'aria-labelledby': `company-label-${company.id}` }}
                />
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button fullWidth color='error' variant='contained' onClick={handleClick} disabled={loading}>
        {loading ? 'جاري الحذف..' : 'حذف'}
      </Button>
    </Stack>
  )
}

type PropsType = {
  user: UserType
  OnSuccessDeleteDialogAction: () => void
}
