import React, { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import LayoutPublic from './layout/LayoutPublic';
import LayoutAdmin from './layout/LayoutAdmin';
import LayoutClient from './layout/LayoutClient';
import ProtectedRoutes from './pageAuth/ProtectedRoutes';
import PageHome from './pagePublic/PageHome';
import { BrowserRouter as Router, Route, Routes, Outlet, Link } from "react-router-dom";
import './css/app.css';
import LoginSanctum from './pages/Login';
import Title from './componentes/Title';
import { Button } from './componentes/Button';

const App = () => {
  const [apiResponse, setApiResponse] = useState(null);  // State para almacenar la respuesta del backend
  const apiUrl = import.meta.env.VITE_API_URL + '/ping';
  console.log(apiResponse);
  // useEffect para hacer la llamada a la API cuando el componente se monte
  useEffect(() => {
    fetch(apiUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content') // Si necesitas el CSRF token
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setApiResponse(data);  // Almacenamos la respuesta en el estado
    })
    .catch(error => console.log('Error:', error));
  }, []);  // El array vacío hace que esto solo se ejecute una vez cuando el componente se monta

  return (
    <div>
      {/* Renderizamos las rutas y el layout */}
      <Routes>
        <Route path='/' element={<LayoutPublic />}>
          <Route index element={<PageHome />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/admin' element={<LayoutAdmin />}>
            <Route index element={<PageHome />} />
          </Route>
          <Route path='/client' element={<LayoutClient />}>
            <Route index element={<PageHome />} />
          </Route>
        </Route>
      </Routes>

      {/* Mostrar logos */}
      <img src={viteLogo} alt="Vite logo" />
      <h1>Frontend en React de Nombre Completo</h1>
      <p>Esta aplicación se conecta al backend de Laravel pidiéndole una respuesta</p>

      {/* Mostrar la respuesta del backend si está disponible */}
      <p>Respuesta del Backend: {apiResponse ? apiResponse.message : 'Loading...'}</p>

      <Title />
      <Button />
      <Button onClick={() => alert("primer boton")}/>
      <Button onClick={() => alert("segundo boton")} text="click more"/>
      <LoginSanctum />
    <div className='bg-primary w-full overflow-hidden'>
      <h1>
        Hello, word
      </h1>
    </div>
    </div>
  );
};

// function Layout() {
//   return (
//     <>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/Contenido1">Home</Link>
//       </nav>
//       <Outlet />
//     </>
//   );
// }

export default App;


