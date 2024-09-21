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
    label: 'أدارة المستخدمين',
    icon: 'ri-group-line',
    children: [
      {
        label: 'المستخدمين',
        href: '/users',
        icon: 'ri-user-settings-line'
      }
    ]
  }
]

export default SidebarMenuData
