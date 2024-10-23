// MUI Imports

import type { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import GeneralTabsComponent from '@/components/tabs/GeneralTabs'
import CompanyProfileTab from './tabs/company-profile'

export default function CompanyDetailsPageTabs() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 'GT-SA-CD-1',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-user-line'></i>
          ملف الشركة
        </div>
      ),
      tabContent: <CompanyProfileTab />
    },
    {
      id: 'GT-SA-CD-2',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-briefcase-line'></i>
          المشاريع
          <i className='ri-arrow-down-s-line'></i>
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 'GT-SA-CD-3',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-money-dollar-circle-line'></i>
          البيانات المالية
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 'GT-SA-CD-4',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-flight-takeoff-line'></i>
          الاجازات
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 'GT-SA-CD-6',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-briefcase-line'></i>
          اجراءات المستخدم
        </div>
      ),
      tabContent: <></>
    }
  ]

  // return component ui
  return <GeneralTabsComponent defaultTabId='GT-SA-CD-1' tabs={tabsData} />
}
