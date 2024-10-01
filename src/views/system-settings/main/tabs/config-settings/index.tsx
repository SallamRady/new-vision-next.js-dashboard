import { Tab, Tabs } from '@mui/material'
import { ReactNode, useMemo, useState } from 'react'
import SettingsTab from './tabs/settings'

const views: Record<number, ReactNode> = {
  1: <SettingsTab />,
  2: <>باقات الاشتراكات</>
}

function ConfigSettingsTab() {
  const [tab, setTab] = useState(1)

  const view = useMemo(() => views[tab], [tab])

  return (
    <div>
      <Tabs value={tab} onChange={(e, tab) => setTab(tab)} variant='scrollable'>
        <Tab label='الاعداد' value={1} />
        <Tab label='المعرف' value={2} />
      </Tabs>
      <div className='py-4'>{view}</div>
    </div>
  )
}

export default ConfigSettingsTab
