import type { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import GeneralTabsComponent from '@/components/tabs/GeneralTabs'
import CompanyDashboardTab from './tabs/company-dashboard'

export default function SystemAdminCompaniesTab() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: `GT-SA-COM-1`,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-settings-4-fill text-lg' />
          لوحة المعلومات
        </div>
      ),
      tabContent: <CompanyDashboardTab />
    }
  ]

  // return component ui
  return <GeneralTabsComponent defaultTabId='GT-SA-COM-1' tabs={tabsData} />
}
