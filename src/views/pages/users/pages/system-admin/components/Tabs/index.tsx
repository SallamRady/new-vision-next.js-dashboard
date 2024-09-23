// MUI Imports
import UserRolesTab from './components/01.UsersRoles/01.UserRolesTab'
import UserStatusTab from './components/02.UserStatusTab/02.UserStatusTab'
import UsersPageSettingsTab from './components/03.PageSettings/UsersPageSettingsTab'
import GeneralTabsComponent, { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'

export default function TabsOfUserSystemAdmin() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    { id: 1, label: 'أدوار المستخدمين', tabContent: <UserRolesTab /> },
    { id: 2, label: 'حالات المستخدم', tabContent: <UserStatusTab /> },
    { id: 3, label: 'أعدادات صفحة المستخدمين', tabContent: <UsersPageSettingsTab /> }
  ]

  // return component ui
  return <GeneralTabsComponent tabs={tabsData} />
}
