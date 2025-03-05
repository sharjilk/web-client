import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../api/auth.api';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    // Don't trigger on error since that indicates no session
    enabled: true,
  });

  // While loading, render nothing (or a loader)
  if (isLoading) return <div>Loading...</div>;
  // If data is available (user is authenticated), redirect to dashboard.
  if (data && !isError) return <Navigate to='/dashboard' replace />;
  // Otherwise, render the public route
  return <>{children}</>;
};

export default PublicRoute;
