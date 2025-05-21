import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoutes = ({ allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (allowedRoles && !allowedRoles.includes(userRole)) {

    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizar las rutas hijas
  return <Outlet />;
};

export default ProtectedRoutes;