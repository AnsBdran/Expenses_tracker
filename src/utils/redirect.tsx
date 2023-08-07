import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';

type RedirectPropsType = {
  children: React.ReactNode;
};

const Redirect = ({ children }: RedirectPropsType) => {
  const location = useLocation();
  const userName = useSelector<RootState>((state) => state.user.name);
  if (!userName && location.pathname === '/dashboard') {
    return <Navigate to='/' />;
  }
  if (userName && location.pathname === '/') {
    return <Navigate to='/dashboard' />;
  }

  return children;
};

export default Redirect;
