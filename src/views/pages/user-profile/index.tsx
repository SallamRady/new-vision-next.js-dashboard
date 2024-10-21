'use client'

// React Imports
import { useState } from 'react'
import type { ReactElement, SyntheticEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Type Imports
import { Paper } from '@mui/material'

import type { Data } from '@/types/pages/profileTypes'

// Component Imports
import UserProfileHeader from './UserProfileHeader'
import CustomTabList from '@core/components/mui/TabList'
import TopCards from './TopCards'
import type { User } from '@/types/api/common/User'

const UserProfile = ({
  tabContentList,
  data,
  user
}: {
  tabContentList: { [key: string]: ReactElement }
  data?: Data
  user: User
}) => {
  // States
  const [activeTab, setActiveTab] = useState('profile')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserProfileHeader data={data?.profileHeader} user={user} />
      </Grid>

      <Grid item xs={12}>
        <TopCards />
      </Grid>
      {activeTab === undefined ? null : (
        <Grid item xs={12} className='flex flex-col gap-6'>
          <TabContext value={activeTab}>
            <Paper className='p-1'>
              <CustomTabList onChange={handleChange} variant='scrollable'>
                <Tab
                  label={
                    <div className='flex items-center gap-2'>
                      <i className='ri-user-3-line text-lg' />
                      الملف الشخصي
                    </div>
                  }
                  value='profile'
                />
                <Tab
                  label={
                    <div className='flex items-center gap-2'>
                      <i className='ri-team-line text-lg' />
                      العقد
                    </div>
                  }
                  value='contract'
                />
                <Tab
                  label={
                    <div className='flex items-center gap-2'>
                      <i className='ri-computer-line text-lg' />
                      المشاريع
                    </div>
                  }
                  value='projects'
                />
                <Tab
                  label={
                    <div className='flex items-center gap-2'>
                      <i className='ri-link-m text-lg' />
                      الاتصالات
                    </div>
                  }
                  value='connections'
                />
              </CustomTabList>
            </Paper>

            <TabPanel value={activeTab} className='p-0'>
              {tabContentList[activeTab]}
            </TabPanel>
          </TabContext>
        </Grid>
      )}
    </Grid>
  )
}

export default UserProfile
