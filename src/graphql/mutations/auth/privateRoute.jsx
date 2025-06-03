import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { VERIFY_TOKEN_QUERY } from '../../queries/auth/verifyToken';
import { authClient } from '../../apolloClient';

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checked, setChecked] = useState(false);

  const [verifyToken, { data, loading, error }] = useLazyQuery(VERIFY_TOKEN_QUERY, {
    variables: { token },
    fetchPolicy: 'network-only',
    client: authClient 
  });

useEffect(() => {
  if (!token) {
    setChecked(true);
    setIsAuthorized(false);
    return;
  }
  verifyToken();
}, [token, verifyToken]);

useEffect(() => {
  if (data) {
    if (data.verifyToken) {
      if (allowedRoles.includes(data.verifyToken.clasificacion)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(false);
    }
    setChecked(true);
  } else if (error) {
    setIsAuthorized(false);
    setChecked(true);
  }
}, [data, error, allowedRoles]);

  if (!checked || loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthorized) {
    console.log(isAuthorized);
    
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
