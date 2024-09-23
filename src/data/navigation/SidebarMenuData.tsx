// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const SidebarMenuData = (): HorizontalMenuDataType[] => [
  {
    label: 'Home',
    href: '/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'About',
    href: '/about',
    icon: 'ri-information-line'
  },
  {
    label: 'الشركات',
    icon: 'ri-dashboard-fill',
    children: [
      {
        label: 'الشركات',
        href: '/companies',
        icon: 'ri-community-fill'
      }
    ]
  },
  {
    label: 'أدارة المستخدمين',
    icon: 'ri-group-line',
    children: [
      {
        label: 'مدير نظام قسم المستخدمين',
        href: '/users/system-admin',
        icon: 'ri-tools-fill'
      },
      {
        label: 'المستخدمين',
        href: '/users',
        icon: 'ri-user-settings-line'
      }
    ]
  }
]

export default SidebarMenuData
