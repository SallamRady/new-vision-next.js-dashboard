import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import { Tab, Tabs } from '@mui/material'

import UsersRoles from './tabs/users-roles'

const views: Record<number, ReactNode> = {
  1: <UsersRoles />,
  2: <>باقات الاشتراكات</>
}

function RolesTab() {
  const [tab, setTab] = useState(1)

  const view = useMemo(() => views[tab], [tab])

  return (
    <div>
      <Tabs value={tab} onChange={(e, tab) => setTab(tab)} variant='scrollable'>
        <Tab label='ادوار المستخدمين' value={1} />
        <Tab label='باقات الشركات' value={2} />
      </Tabs>
      <div className='py-4'>{view}</div>
    </div>
  )
}

export default RolesTab
