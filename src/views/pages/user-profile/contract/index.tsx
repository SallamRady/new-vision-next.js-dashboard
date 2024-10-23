'use client'

import type { FC } from 'react'
import { useMemo, useState } from 'react'

import { Tab, Tabs } from '@mui/material'

import PersonalDetails from './Tabs/personal-details'

const tabs: Record<number, FC | undefined> = {
  0: PersonalDetails
}

function ContractView() {
  const [tab, setTab] = useState(0)

  const renderActiveTab = useMemo(() => {
    const Tab = tabs[tab]

    if (!Tab) return null

    return <Tab />
  }, [tab])

  return (
    <div>
      <Tabs variant='scrollable' value={tab} onChange={(e, tab) => setTab(tab)}>
        <Tab label='البيانات الشخصي' value={0} />
        <Tab label='عقد العمل' value={1} />
        <Tab label='المشاريع' value={2} />
        <Tab label='البيانات المالية ' value={3} />
        <Tab label='الاجازات ' value={4} />
        <Tab label='اجرائات المستخدم ' value={5} />
      </Tabs>
      <div className='py-10'>{renderActiveTab}</div>
    </div>
  )
}

export default ContractView
