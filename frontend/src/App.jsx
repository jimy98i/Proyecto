import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoutes from './pageAuth/ProtectedRoutes';
import LayoutPublic from './layout/LayoutPublic';
import LayoutAdmin from './layout/LayoutAdmin';
import LayoutClient from './layout/LayoutClient';
import PageHome from './pagePublic/PageHome';
import PageContacto from './pagePublic/PageContacto';
import PageNosotros from './pagePublic/PageNosotros';
import PageEmpleados from './pagePublic/PageEmpleados';
import PageServicios from './pagePublic/PageServicios';
import Citas from './pages/Citas';
import MyPerfil from './pages/Profile';
import Login from './pages/Login';

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
          <Route path="empleados" element={<PageEmpleados />} />
          <Route path="servicios" element={<PageServicios />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Rutas protegidas para administradores */}
        <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Citas />} />
            <Route path="citas" element={<Citas />} />
          </Route>
        </Route>

        {/* Rutas protegidas para clientes */}
        <Route element={<ProtectedRoutes allowedRoles={['cliente']} />}>
          <Route path="/client" element={<LayoutClient />}>
            <Route index element={<PageHome />} />
            <Route path="citas" element={<Citas />} />
            <Route path="myperfil" element={<MyPerfil />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;


