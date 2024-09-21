export type UsersTableRowType = {
  id: number
  name: string
  email: string
  phone: string
  title: string
  branch: string
  company: string
  userType: 'Admin' | 'Employee'
  completionStatus: boolean
  avatar?: string
  actions?: string
}
