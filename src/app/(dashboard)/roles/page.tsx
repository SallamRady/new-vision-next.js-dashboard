// Data Imports
import { getAuthHeaders } from '@/libs/headers/headerServices'
import { notFound } from 'next/navigation'
import Roles from '@/views/roles'
import { getRoles } from '@/utils/api/roles/get-roles'

const RolesPage = async () => {
  // Vars
  const headers = await getAuthHeaders()
  const roles = await getRoles(headers)

  if (!roles) notFound()

  return <Roles roles={roles} />
}

export default RolesPage
