// src/views/pages/Roles/fetchRoles.ts
import axios from 'axios';
import { api } from '@/Constants/Api';

interface Permission {
  id: number;
  name: string;
  guard_name: string;
  label: string;
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  permissions: Permission[];
}

export const fetchRoles = async (): Promise<{ roles: Role[]; error: string | null }> => {
  let roles: Role[] = [];
  let error: string | null = null;

  try {
    const response = await axios.get(api`get-roles`);
    console.log('API Response:', response.data);
    roles = response.data.roles || [];
  } catch (err) {
    console.error('Failed to fetch roles:', err);
    error = 'Failed to fetch roles.';
  }

  return { roles, error };
};
