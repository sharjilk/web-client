import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/auth.api';

export const useAuth = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });
};
