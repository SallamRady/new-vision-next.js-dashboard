export type UsersRolesType = {
  id: number
  title: string
  permissions: string[]
  actions?: string
}

export type UserStatusType = {
  id: number
  title: string
  actions?: string
}

export type UserAdminPageCardsControlType = {
  id: number
  title: string
  visible: boolean
}

export type UserAdminPageSearchFiltersControlType = {
  id: number
  title: string
  visible: boolean
}

export type UserAdminPageTableColumnsControlType = {
  id: number
  title: string
  visible: boolean
}
