import { Stack } from '@mui/material'

import type { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import GeneralTabsComponent from '@/components/tabs/GeneralTabs'
import CompanyDetailsProfileMainInformation from './MainData'
import CompanyDetailsLegalData from './LegalData'
import CompanyAdminsUsersData from './adminsUsersData'
import CompanyDetailsAddressData from './addressData'

export default function CompanyProfileNestedTabs() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 'GT-SA-CD-NT-1',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-user-line'></i>
          البيانات الرسمية
        </div>
      ),
      tabContent: (
        <Stack spacing={6}>
          <CompanyDetailsProfileMainInformation />
          <CompanyDetailsLegalData />
          <CompanyAdminsUsersData />
          <CompanyDetailsAddressData />
        </Stack>
      )
    },
    {
      id: 'GT-SA-CD-NT-2',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-map-pin-line'></i>
          الفروع
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 'GT-SA-CD-NT-3',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-briefcase-line'></i>
          الادارات
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 'GT-SA-CD-NT-4',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-briefcase-line'></i>
          الاقسام
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 'GT-SA-CD-NT-6',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-briefcase-line'></i>
          البيانات الوظيفية
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 'GT-SA-CD-NT-7',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-briefcase-line'></i>
          الاوراق الرسمية
        </div>
      ),
      tabContent: <></>
    }
  ]

  // return component ui
  return <GeneralTabsComponent defaultTabId='GT-SA-CD-NT-1' tabs={tabsData} />
}
