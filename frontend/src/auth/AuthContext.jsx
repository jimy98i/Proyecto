import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext(null);

// Tiempo de inactividad en milisegundos (15 minutos)
const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  // Función para limpiar la sesión
  const clearSession = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUserName('');
    setUserRole('');
    setUserEmail('');
    navigate('/');
  };

  // Función para verificar el token
  const checkToken = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/session-check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Token inválido o expirado');
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      clearSession();
    }
  };

  useEffect(() => {
    // Verificar el estado de autenticación al cargar
    const token = localStorage.getItem('access_token');
    const storedUserName = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserEmail = localStorage.getItem('userEmail');
    
    setIsAuthenticated(!!token);
    setUserName(storedUserName || '');
    setUserRole(storedUserRole || '');
    setUserEmail(storedUserEmail || '');

    // Configurar el temporizador de inactividad
    let inactivityTimer;

    const resetTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        clearSession();
      }, INACTIVITY_TIMEOUT);
    };

    // Eventos para detectar actividad del usuario
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    // Detectar cierre de página
    const handleBeforeUnload = () => {
      clearSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Verificar el token cada 5 minutos
    const tokenCheckInterval = setInterval(checkToken, 5 * 60 * 1000);

    // Iniciar el temporizador
    resetTimer();

    return () => {
      // Limpiar event listeners y temporizadores
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (inactivityTimer) clearTimeout(inactivityTimer);
      clearInterval(tokenCheckInterval);
    };
  }, []);

  const login = async ({ email, password }) => {
    try {
      // Obtener el token CSRF primero
      const csrfResponse = await fetch(`${API_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      if (!csrfResponse.ok) {
        throw new Error('Error al obtener el token CSRF');
      }

      // Obtener el token CSRF de las cookies
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          const token = parts.pop().split(';').shift();
          console.log(`Found ${name}:`, token);
          return token;
        }
        console.log(`Cookie ${name} not found`);
        return null;
      };

      // Intentar obtener el token de diferentes nombres de cookie
      let csrfToken = getCookie('XSRF-TOKEN');

      if (!csrfToken) {
        console.error('No CSRF token found in cookies');
        throw new Error('No se pudo obtener el token de seguridad');
      }

      // Decodificar el token si es necesario
      try {
        csrfToken = decodeURIComponent(csrfToken);
      } catch (e) {
        console.error('Error decoding CSRF token:', e);
      }

      console.log('Using CSRF Token:', csrfToken);

      // Esperar un momento para asegurarnos de que la cookie se ha establecido
      await new Promise(resolve => setTimeout(resolve, 100));

      const loginResponse = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      console.log('Login Response Headers:', Object.fromEntries(loginResponse.headers.entries()));

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        if (errorData.message === 'Invalid credentials.') {
          throw new Error('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
        } else if (errorData.message === 'User not found') {
          throw new Error('El usuario no existe. Por favor, regístrate primero.');
        } else {
          throw new Error('Error desconocido. Por favor, inténtalo de nuevo más tarde.');
        }
      }

      const loginData = await loginResponse.json();
      console.log('Login exitoso:', loginData);

      const userResponse = await fetch(`${API_URL}/user/${loginData.user}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('No autenticado');
      }

      const userData = await userResponse.json();
      console.log('Usuario autenticado:', userData);

      // Actualizar el estado de autenticación
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', userData.nombre);
      localStorage.setItem('userRole', userData.rol);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('access_token', loginData.access_token);
      
      setIsAuthenticated(true);
      setUserName(userData.nombre);
      setUserRole(userData.rol);
      setUserEmail(userData.email);

      // Redirigir según el rol
      if (userData.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/client');
      }

      return userData;
    } catch (err) {
      console.error('Error capturado:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      clearSession();
    }
  };

  const value = {
    isAuthenticated,
    userName,
    userRole,
    userEmail,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}; 