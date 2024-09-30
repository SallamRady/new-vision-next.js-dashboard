'use client'

import { Tab, Tabs } from '@mui/material'
import { ReactNode, useMemo, useState } from 'react'
import OverviewTab from './tabs/overview'
import RolesTab from './tabs/roles'

const views: Record<number, ReactNode> = {
  1: <OverviewTab />,
  2: <RolesTab />,
  3: <div>اعدادات المعرف</div>,
  4: <div>الدول واللغات</div>,
  5: <div>اعدادات المراسلات</div>,
  6: <div>اعدادات التخزين</div>,
  7: <div>انواع الشركات</div>,
  8: <div>الموقع والشركات</div>
}

function SystemSettings() {
  const [tab, setTab] = useState(1)

  const view = useMemo(() => views[tab], [tab])

  return (
    <div>
      <Tabs value={tab} onChange={(e, tab) => setTab(tab)} variant='scrollable'>
        <Tab label='بيانات الشركة' value={1} />
        <Tab label='ادوار النظام' value={2} />
        <Tab label='اعدادات المعرف' value={3} />
        <Tab label='الدول واللغات' value={4} />
        <Tab label='اعدادات المراسلات' value={5} />
        <Tab label='اعدادات التخزين' value={6} />
        <Tab label='انواع الشركات' value={7} />
        <Tab label='الموقع والشركات' value={8} />
      </Tabs>
      <div className='pt-8'>{view}</div>
    </div>
  )
}

export default SystemSettings
