import GeneralTabsComponent, { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import SystemAdminLoginIdentifiersTab from './tabs/LoginIdentifiers'

export default function SystemAdminLoginIDsTab() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 1,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-login-box-line text-lg' />
          برامج الدخول
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 2,
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
  return <GeneralTabsComponent tabs={tabsData} />
}

type PropsType = {}
