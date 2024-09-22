'use client'
// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import UserRolesTab from './components/UserRolesTab'
import UserStatusTab from './components/UserStatusTab'
import UsersPageSettingsTab from './components/UsersPageSettingsTab'

export default function TabsOfUserSystemAdmin() {
  // States
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='simple tabs example'>
        <Tab
          value='1'
          label={
            <Typography variant='body2' fontSize={'1rem'} color={value == '1' ? 'primary' : 'default'}>
              أدوار المستخدمين
            </Typography>
          }
        />
        <Tab
          value='2'
          label={
            <Typography variant='body2' fontSize={'1rem'} color={value == '2' ? 'primary' : 'default'}>
              حالات المستخدم
            </Typography>
          }
        />
        <Tab
          value='3'
          label={
            <Typography variant='body2' fontSize={'1rem'} color={value == '3' ? 'primary' : 'default'}>
              أعدادات صفحة المستخدمين
            </Typography>
          }
        />
      </TabList>
      <TabPanel value='1'>
        <UserRolesTab />
      </TabPanel>
      <TabPanel value='2'>
        <UserStatusTab />
      </TabPanel>
      <TabPanel value='3'>
        <UsersPageSettingsTab />
      </TabPanel>
    </TabContext>
  )
}
