import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { initializeCsrf, post, get } from '../utils/api';

const AuthContext = createContext(null);

// Tiempo de inactividad en milisegundos (15 minutos)
const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const API_URL = import.meta.env.VITE_API_URL;

    // Función para limpiar la sesión
    const clearSession = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userId');
        localStorage.removeItem('profile_image');
        localStorage.removeItem('user_data');
        setIsAuthenticated(false);
        setUserName('');
        setUserRole('');
        setUserEmail('');
        setUserId(null);
        setToken(null);
        setProfileImage(null);
        navigate('/');
    };

    // Función para verificar el token
    const checkToken = async () => {
        const storedToken = localStorage.getItem('access_token');
        if (!storedToken) return;

        try {
            const response = await get('/session-check');
            if (!response.ok) {
                throw new Error('Token inválido o expirado');
            }
        } catch (error) {
            console.error('Error al verificar el token:', error);
            clearSession();
        }
    };

    // Función para cargar el estado de autenticación
    const loadAuthState = () => {
        const storedToken = localStorage.getItem('access_token');
        const storedUserName = localStorage.getItem('userName');
        const storedUserRole = localStorage.getItem('userRole');
        const storedUserEmail = localStorage.getItem('userEmail');
        const storedUserId = localStorage.getItem('userId');
        
        if (storedToken) {
            setIsAuthenticated(true);
            setToken(storedToken);
            setUserName(storedUserName || '');
            setUserRole(storedUserRole || '');
            setUserEmail(storedUserEmail || '');
            setUserId(storedUserId);

            // Redirigir según el rol si estamos en la página principal
            if (location.pathname === '/') {
                if (storedUserRole === 'admin') {
                    navigate('/admin');
                } else if (storedUserRole === 'cliente') {
                    navigate('/client');
                }
            }
        }
    };

    useEffect(() => {
        // Cargar el estado de autenticación al iniciar
        loadAuthState();

        // Cargar la imagen del perfil si existe en localStorage
        const storedProfileImage = localStorage.getItem('profile_image');
        if (storedProfileImage) {
            setProfileImage(storedProfileImage);
        }

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

        // Verificar el token cada 5 minutos
        const tokenCheckInterval = setInterval(checkToken, 5 * 60 * 1000);

        // Iniciar el temporizador
        resetTimer();

        return () => {
            // Limpiar event listeners y temporizadores
            events.forEach(event => {
                document.removeEventListener(event, resetTimer);
            });
            if (inactivityTimer) clearTimeout(inactivityTimer);
            clearInterval(tokenCheckInterval);
        };
    }, [location.pathname]); // Añadido location.pathname como dependencia

    useEffect(() => {
        if (token) {
            const userData = JSON.parse(localStorage.getItem('user_data'));
            
            if (userData) {
                setUserName(userData.nombre);
                setUserRole(userData.rol);
                setUserEmail(userData.email);
                setUserId(userData.id);
                setIsAuthenticated(true);
                
                if (userData.id) {
                    fetchUserProfileImage(userData.id);
                }
            }
        }
    }, [token]);

    const fetchUserProfileImage = async (userId) => {
        try {
            const response = await fetch(`${API_URL}/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching user data');
            }

            const userData = await response.json();

            if (userData.foto) {
                const fileName = userData.foto.split('/').pop();
                const imagePath = `Imagenes/Client_User/${fileName}`;
                
                const imageResponse = await fetch(`${API_URL}/storage/${imagePath}`);
                if (imageResponse.ok) {
                    setProfileImage(imagePath);
                    localStorage.setItem('profile_image', imagePath);
                }
            }
        } catch (error) {
            console.error('Error fetching user profile image:', error);
        }
    };

    const login = async ({ email, password }) => {
        try {
            await initializeCsrf();

            const loginResponse = await post('/login', { email, password });

            if (loginResponse.error || loginResponse.message === 'Invalid credentials.' || loginResponse.message === 'User not found') {
                if (loginResponse.message === 'Invalid credentials.') {
                    throw new Error('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
                } else if (loginResponse.message === 'User not found') {
                    throw new Error('El usuario no existe. Por favor, regístrate primero.');
                } else {
                    throw new Error('Error desconocido. Por favor, inténtalo de nuevo más tarde.');
                }
            }

            const loginData = loginResponse;

            const userResponse = await get(`/user/${loginData.user}`);
            // userResponse ya es el JSON, no un objeto Response
            if (userResponse.error || userResponse.message === 'Unauthenticated.' || !userResponse.id) {
                throw new Error('No autenticado');
            }
            const userData = userResponse;

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', userData.nombre);
            localStorage.setItem('userRole', userData.rol);
            localStorage.setItem('userEmail', userData.email);
            localStorage.setItem('access_token', loginData.access_token);
            localStorage.setItem('userId', userData.id);
            localStorage.setItem('user_data', JSON.stringify(userData));
            
            setIsAuthenticated(true);
            setToken(loginData.access_token);
            setUserName(userData.nombre);
            setUserRole(userData.rol);
            setUserEmail(userData.email);
            setUserId(userData.id);

            if (userData.foto) {
                const fileName = userData.foto.split('/').pop();
                const imagePath = `Imagenes/Client_User/${fileName}`;
                setProfileImage(imagePath);
                localStorage.setItem('profile_image', imagePath);
            }

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
            const storedToken = localStorage.getItem('access_token');
            if (storedToken) {
                await post('/logout');
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
        userId,
        token,
        profileImage,
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