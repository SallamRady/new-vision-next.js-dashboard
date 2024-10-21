// MUI Imports
import UsersTabIndexOfUserSystemAdmin from './components/01.UsersIndex'
import UsersPageSettingsTab from './components/03.PageSettings/UsersPageSettingsTab'
import type { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import GeneralTabsComponent from '@/components/tabs/GeneralTabs'

export default function TabsOfUserSystemAdmin() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 'GT-SA-US-1',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-team-line text-lg' />
          المستخدمين
        </div>
      ),
      tabContent: <UsersTabIndexOfUserSystemAdmin />
    },
    {
      id: 'GT-SA-US-2',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-dashboard-horizontal-fill text-lg' />
          أعدادات صفحة المستخدمين
        </div>
      ),
      tabContent: <UsersPageSettingsTab />
    }
  ]

  // return component ui
  return <GeneralTabsComponent defaultTabId='GT-SA-US-1' tabs={tabsData} />
}
