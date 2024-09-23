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

export default function GeneralTabsComponent(props: GeneralTabsComponentProps) {
  // States
  const [value, setValue] = useState<string>('1')
  // extract data from props
  const { tabs } = props

  // declare and define component helper methods
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  // return component ui
  return (
    <TabContext value={value}>
      <TabList onChange={handleChange} aria-label='simple tabs example'>
        {tabs?.map(tabData => (
          <Tab
            key={`tab-label-${tabData.id}-${tabData.label}`}
            value={tabData.id.toString()}
            label={
              <Typography
                variant='body2'
                fontSize={'1rem'}
                color={value == tabData.id.toString() ? 'primary' : 'default'}
              >
                {tabData?.label}
              </Typography>
            }
          />
        ))}
      </TabList>
      {tabs?.map(tabData => (
        <TabPanel key={`tab-label-${tabData.id}-${tabData.label}`} value={tabData.id.toString()}>
          {tabData?.tabContent}
        </TabPanel>
      ))}
    </TabContext>
  )
}

export type GeneralTabsComponentTabType = { id: number; label: string; tabContent: React.ReactNode }
type GeneralTabsComponentProps = {
  tabs: GeneralTabsComponentTabType[]
}
