// MUI Imports
import GeneralTabsComponent, { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import SystemAdminCountryTab from './components/countries/SystemAdminCountryTab'
import SystemAdminLanguagesTab from './components/languages/SystemAdminLanguagesTab'
import SystemAdminCompaniesTab from './components/companies'
import SystemRolesTabInSystemSettings from './components/system-roles'

export default function TabsOfMainystemAdmin() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 1,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-community-fill text-lg' />
          بيانات الشركة
        </div>
      ),
      tabContent: <SystemAdminCompaniesTab />
    },
    {
      id: 2,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-money-dollar-box-fill text-lg' />
          ادوار النظام
        </div>
      ),
      tabContent: <SystemRolesTabInSystemSettings />
    },
    {
      id: 3,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-global-line text-lg' />
          الدول واللغات
        </div>
      ),
      tabContent: <>الدول واللغات</>
    },
    {
      id: 4,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-chat-1-line text-lg' />
          اعدادات المراسلات
        </div>
      ),
      tabContent: <>اعدادات المراسلات</>
    },
    {
      id: 5,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-cloud-fill text-lg' />
          اعدادات التخزين
        </div>
      ),
      tabContent: <>اعدادات التخزين</>
    },
    {
      id: 6,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-git-repository-private-fill text-lg' />
          الامن والحماية
        </div>
      ),
      tabContent: <>الامن والحماية</>
    },
    {
      id: 7,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-building-3-fill text-lg' />
          انواع الشركات
        </div>
      ),
      tabContent: <>انواع الشركات</>
    },
    {
      id: 8,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-file-code-fill text-lg' />
          اعدادات الموقع والتطبيقات
        </div>
      ),
      tabContent: <>اعدادات الموقع والتطبيقات</>
    }
    // {
    //   id: 1,
    //   label: (
    //     <div className='flex items-center gap-2 text-lg'>
    //       <i className='ri-building-3-fill text-lg' />
    //       الدول
    //     </div>
    //   ),
    //   tabContent: <SystemAdminCountryTab />
    // },
    // {
    //   id: 2,
    //   label: (
    //     <div className='flex items-center gap-2 text-lg'>
    //       <i className='ri-money-dollar-box-fill text-lg' />
    //       العملات
    //     </div>
    //   ),
    //   tabContent: <>Currency</>
    // },
    // {
    //   id: 3,
    //   label: (
    //     <div className='flex items-center gap-2 text-lg'>
    //       <i className='ri-global-line text-lg' />
    //       اللغات
    //     </div>
    //   ),
    //   tabContent: <SystemAdminLanguagesTab />
    // }
  ]

  // return component ui
  return <GeneralTabsComponent tabs={tabsData} />
}
