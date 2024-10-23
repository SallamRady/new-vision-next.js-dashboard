'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { Box, Paper } from '@mui/material'

export default function GeneralTabsComponent(props: GeneralTabsComponentProps) {
  // extract data from props
  const { tabs, defaultTabId } = props

  // States
  const [value, setValue] = useState<string>(defaultTabId)

  // declare and define component helper methods
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // return component ui
  return (
    <TabContext value={value}>
      <Paper sx={{ my: 2 }}>
        <TabList
          onChange={handleChange}
          aria-label='generic-tabs-components'
          className='overflow-x-auto whitespace-nowrap'
        >
          {tabs?.map(tabData => (
            <Tab
              key={`tab-label-${tabData.id}-${tabData.label}`}
              value={tabData.id.toString()}
              label={<Box color={value == tabData.id.toString() ? 'primary' : 'default'}>{tabData?.label}</Box>}
            />
          ))}
        </TabList>
      </Paper>
      {tabs?.map(tabData => (
        <TabPanel key={`tab-panel-${tabData.id}-${tabData.label}`} value={tabData.id.toString()}>
          {tabData?.tabContent}
        </TabPanel>
      ))}
    </TabContext>
  )
}

export type GeneralTabsComponentTabType = { id: string; label: React.ReactNode; tabContent: React.ReactNode }
type GeneralTabsComponentProps = {
  defaultTabId: string
  tabs: GeneralTabsComponentTabType[]
}
