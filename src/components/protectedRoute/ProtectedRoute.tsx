import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hook';
import { useCurrentToken } from '@/features/auth/authSlice';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />
  }

  return children;
};

export default ProtectedRoute;