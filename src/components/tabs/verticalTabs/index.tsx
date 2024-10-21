'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'
import type { GeneralTabsComponentTabType } from '../GeneralTabs'

type GeneralVirticalTabsComponentProps = {
  defaultTabId: string
  tabs: GeneralTabsComponentTabType[]
}

const GeneralVirticalTabsComponent = (props: GeneralVirticalTabsComponentProps) => {
  // ** delcare and define component state and variables
  const { defaultTabId, tabs } = props
  const [value, setValue] = useState<string>(defaultTabId)

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <div className='flex w-full'>
        <CustomTabList
          pill='true'
          orientation='vertical'
          onChange={handleChange}
          aria-label='customized vertical tabs example'
          sx={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(67, 55, 140, 0.1) 100%)',
            boxShadow: '0px 2px 10px 0px #1415212E',
            borderRadius: '10px',
            padding: '20px',
            gap: '60px'
          }}
        >
          {tabs?.map(tab => <Tab key={tab.id} value={tab.id} label={tab.label} />)}
        </CustomTabList>
        {tabs?.map(tab => (
          <TabPanel key={tab.id} value={tab.id} className='flex-grow'>
            {tab.tabContent}
          </TabPanel>
        ))}
      </div>
    </TabContext>
  )
}

export default GeneralVirticalTabsComponent
