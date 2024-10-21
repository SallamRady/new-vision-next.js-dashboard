import type { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import GeneralTabsComponent from '@/components/tabs/GeneralTabs'
import SystemAdminLoginIdentifiersTab from './tabs/LoginIdentifiers'
import SystemAdminLoginsWaysTab from './tabs/loginsApps/LoginsWaysTab'

export default function SystemAdminLoginIDsTab() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 'GT-SA-LS-1',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-login-box-line text-lg' />
          برامج الدخول
        </div>
      ),
      tabContent: <SystemAdminLoginsWaysTab />
    },
    {
      id: 'GT-SA-LS-2',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-shield-check-line text-lg' />
          المعرف
        </div>
      ),
      tabContent: <SystemAdminLoginIdentifiersTab />
    }
  ]

  // return component ui
  return <GeneralTabsComponent defaultTabId='GT-SA-LS-1' tabs={tabsData} />
}
