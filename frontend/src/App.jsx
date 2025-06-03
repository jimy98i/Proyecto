import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import LayoutPublic from './layout/LayoutPublic';
import LayoutAdmin from './layout/LayoutAdmin';
import LayoutClient from './layout/LayoutClient';
import PageHome from './pagePublic/PageHome';
import PageContacto from './pagePublic/PageContacto';
import PageNosotros from './pagePublic/PageNosotros';
import PageServicios from './pagePublic/PageServicios';
import Citas from './pages/Citas';
import MyPerfil from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import HistorialMascotas from './componentes/HistorialMascotas';
import Recuperacion from './pages/Recuperacion';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { userRole, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/client" />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { userRole, isAuthenticated } = useAuth();

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LayoutPublic />}>
          <Route index element={<PageHome />} />
          <Route path="home" element={<PageHome />} />
          <Route path="contacto" element={<PageContacto />} />
          <Route path="nosotros" element={<PageNosotros />} />
          <Route path="servicios" element={<PageServicios />} />
          <Route path="login" element={<Login />} />
          <Route path="recuperacion" element={<Recuperacion />} />
        </Route>

        {/* Rutas protegidas para clientes */}
        <Route path="/client" element={
          <PrivateRoute allowedRoles={['cliente']}>
            <LayoutClient />
          </PrivateRoute>
        }>
          <Route index element={<PageHome />} />
          <Route path="citas" element={<Citas />} />
          <Route path="myperfil" element={<MyPerfil />} />
          <Route path="historial" element={<HistorialMascotas />} />
        </Route>

        {/* Rutas protegidas para administradores */}
        <Route path="/admin" element={
          <AdminRoute>
            <LayoutAdmin />
          </AdminRoute>
        }>
          <Route index element={<Citas />} />
          <Route path="citas" element={<Citas />} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;


