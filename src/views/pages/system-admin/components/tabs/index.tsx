// MUI Imports
import SystemAdminCompaniesTab from './components/companies'
import CorrespondenceSettingsTabIndex from './components/CorrespondenceSettings'
import SystemAdminCountryTab from './components/countries/SystemAdminCountryTab'
import SystemAdminLoginIDsTab from './components/login-ids'
import SystemRolesTabInSystemSettings from './components/system-roles'
import GeneralTabsComponent, { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'

//Login IDs
export default function TabsOfMainystemAdmin() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 'GT-SA-1',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-community-fill text-lg' />
          بيانات الشركة
        </div>
      ),
      tabContent: <SystemAdminCompaniesTab />
    },
    {
      id: 'GT-SA-2',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-money-dollar-box-fill text-lg' />
          ادوار النظام
        </div>
      ),
      tabContent: <SystemRolesTabInSystemSettings />
    },
    {
      id: 'GT-SA-3',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-global-line text-lg' />
          الدول واللغات
        </div>
      ),
      tabContent: <SystemAdminCountryTab />
    },
    {
      id: 'GT-SA-4',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-shield-check-line text-lg' />
          معرفات الدخول
        </div>
      ),
      tabContent: <SystemAdminLoginIDsTab />
    },
    {
      id: 'GT-SA-5',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-chat-1-line text-lg' />
          اعدادات المراسلات
        </div>
      ),
      tabContent: <CorrespondenceSettingsTabIndex />
    },
    {
      id: 'GT-SA-6',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-cloud-fill text-lg' />
          اعدادات التخزين
        </div>
      ),
      tabContent: <>اعدادات التخزين</>
    },
    {
      id: 'GT-SA-7',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-git-repository-private-fill text-lg' />
          الامن والحماية
        </div>
      ),
      tabContent: <>الامن والحماية</>
    },
    {
      id: 'GT-SA-8',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-building-3-fill text-lg' />
          انواع الشركات
        </div>
      ),
      tabContent: <>انواع الشركات</>
    },
    {
      id: 'GT-SA-9',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-file-code-fill text-lg' />
          اعدادات الموقع والتطبيقات
        </div>
      ),
      tabContent: <>اعدادات الموقع والتطبيقات</>
    }
  ]

  // return component ui
  return <GeneralTabsComponent defaultTabId={'GT-SA-1'} tabs={tabsData} />
}
