// MUI Imports
import GeneralTabsComponent, { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import SystemAdminCountryTab from './components/countries/SystemAdminCountryTab'

export default function TabsOfMainystemAdmin() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 1,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-building-3-fill text-lg' />
          الدول
        </div>
      ),
      tabContent: <SystemAdminCountryTab />
    },
    {
      id: 2,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-money-dollar-box-fill text-lg' />
          العملة
        </div>
      ),
      tabContent: <>Currency</>
    }
  ]

  // return component ui
  return <GeneralTabsComponent tabs={tabsData} />
}
