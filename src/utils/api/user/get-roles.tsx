// In a new file (e.g., rolesService.ts)
import { api } from '@/Constants/Api';
import axios from 'axios';
import { AuthHeaders } from '@/types/AuthHeaders';

export const getRoles = async (headers: AuthHeaders) => {
  try {
    const response = await axios.get(api`get-roles`, { headers });
    return response.data.roles; // Return the roles data
  } catch (error: any) {
    console.error('Failed to fetch roles:', error);
    throw new Error('Failed to fetch roles');
  }
};
