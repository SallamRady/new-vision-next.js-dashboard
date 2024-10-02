import GeneralTabsComponent, { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import UsersRolesTableTab from './tabs/UsersRolesTable'

export default function SystemRolesTabInSystemSettings() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 1,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-team-line text-lg' />
          ادوار المستخدمين
        </div>
      ),
      tabContent: <UsersRolesTableTab />
    },
    {
      id: 2,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-building-line text-lg' />
          باقات الشركات
        </div>
      ),
      tabContent: <>test 2</>
    }
  ]

  // return component ui
  return <GeneralTabsComponent tabs={tabsData} />
}
