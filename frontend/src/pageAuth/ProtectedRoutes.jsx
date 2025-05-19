import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoutes = ({ allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    console.log('Usuario no autenticado, redirigiendo a login');
    return <Navigate to="/" replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log('Usuario no tiene el rol requerido:', allowedRoles);
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, renderizar las rutas hijas
  console.log('Acceso permitido para rol:', userRole);
  return <Outlet />;
};

export default ProtectedRoutes;