import Roles from "../../../views/pages/Roles";
import { getRoles } from '@/utils/api/user/get-roles';
import { notFound } from 'next/navigation';
import { getAuthHeaders } from '@/libs/headers/headerServices';
import { AuthHeaders } from '@/types/AuthHeaders';
import { Rolee } from '../../../views/pages/Roles/index';

const RolesPage = async () => {
  const headers: AuthHeaders = await getAuthHeaders();
  let roles: Rolee[];

  try {
    roles = await getRoles(headers);
  } catch (error) {
    console.error(error);
    notFound();
    return null; // Prevent further execution after notFound
  }

  return <Roles roles={roles} />;
};

export default RolesPage;
