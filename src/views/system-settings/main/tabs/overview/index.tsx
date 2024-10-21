import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { Tab, Tabs } from '@mui/material'

import DataBoard from './tabs/data-board'

const views: Record<number, ReactNode> = {
  1: <DataBoard />
}

function OverviewTab() {
  const [tab, setTab] = useState(1)

  const view = useMemo(() => views[tab], [tab])

  return (
    <div>
      <Tabs value={tab} onChange={(e, tab) => setTab(tab)} variant='scrollable'>
        <Tab label='لوحة المعلومات' value={1} />
      </Tabs>
      <div className='py-4'>{view}</div>
    </div>
  )
}

export default OverviewTab
