//UsersIndex
// MUI Imports
import GeneralTabsComponent, { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import UserRolesTab from './tabs/01.UsersRoles/01.UserRolesTab'
import UserStatusTab from './tabs/02.UserStatusTab/02.UserStatusTab'

export default function UsersTabIndexOfUserSystemAdmin() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    { id: 1, label: 'حالات المستخدم', tabContent: <UserRolesTab /> },
    { id: 2, label: 'حالات المستخدم', tabContent: <UserStatusTab /> }
  ]

  // return component ui
  return <GeneralTabsComponent tabs={tabsData} />
}
