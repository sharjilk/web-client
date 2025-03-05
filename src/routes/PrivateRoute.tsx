import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, isError } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <Navigate to='/signin' />;
  return <>{children}</>;
};

export default PrivateRoute;
