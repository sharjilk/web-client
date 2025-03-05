import { useQuery } from '@tanstack/react-query';
import { getCurrentUser, logoutApi } from '../api/auth.api';
import { Navigate, useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

const DashboardPage = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery<User, Error>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });

  if (isError) {
    return <Navigate to='/signin' replace />;
  }

  if (isLoading) return <div>Loading...</div>;

  const handleLogout = async () => {
    try {
      await logoutApi();
      navigate('/signin', { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <p>Welcome, {data?.name}</p>
      <button className='btn btn-secondary' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
