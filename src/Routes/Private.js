// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';

const PrivateRoute = () => {
  const authContext = useAuthContext();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!authContext.isLoading) {
      setIsAuthChecked(true);
    }
  }, [authContext.isLoading]);

  return isAuthChecked ? (
    authContext.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>
  ) : null;
};

export default PrivateRoute;
