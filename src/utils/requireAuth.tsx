import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../app/store';

type RequireAuthPropsType = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthPropsType) => {
  const userName = useSelector<RootState>((state) => state.user.name);
  if (!userName) return <Navigate to='/' />;

  return children;
};

export default RequireAuth;
