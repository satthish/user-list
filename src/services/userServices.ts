// src/services/userService.ts
import { apiCall } from '@/utils/apiUtils';

const fetchUser = async () => {
  return apiCall('/api/users');
};

const fetchSingleUser = async (id: any) => {
  return apiCall(`/api/users/${id}`)
}

export const userService = {
  fetchUser,
  fetchSingleUser
};
