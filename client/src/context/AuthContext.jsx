import { createContext, useContext, useEffect, useState } from "react";
import { signupRequest, loginRequest, verifyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext(); // almacenar/compartir datos de la auth del user x toda la app

// Este hook nos permite acceder a los datos del usuario autenticado desde cualquier
// componente dentro del AuthProvider sin tener que importar useContext todo el rato
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Este componente provee la funcionalidad de autenticación a los componentes hijos
// Es decir, ejecutamos el signup en el contexto y guardamos el usuario en el estado
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // saber si el usuario está autenticado
  const [errors, setErrors] = useState([]); // errores de validación
  const [loading, setLoading] = useState(true);

  // Función para registrar un usuario
  const signup = async (user) => {
    try {
      const res = await signupRequest(user); // manda los datos al servidor
      console.log(res);
      setUser(res.data); // guarda el usuario en el estado
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
    }
  };

  // funcion para loguear usuario
  const login = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
    }
  }

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  }

  // Cada vez que los errors cambien, espero 5s y limpio el []
  useEffect(() => {
    if (errors.length) {
      const timer = setTimeout(() => { setErrors([]) }, 5000);
      return () => clearTimeout(timer); // si el usuario cambia de pantalla se elimina el timer
    }
  }, [errors]); // [errors] significia que cada vez que esa prop cambie, se ejecuta el useEffect

  // para que cada vez que se cambie de url (se recarga la App) siga el isAuthenticated=true
  // checkeamos si existe el token en las cookies
  useEffect(() => {
    const checkLogin = async () => { // hago esto para poder poner el async
      const token = Cookies.get('token'); // traemos todas las cookies
      console.log('cookies.get ', token);

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      console.log('token found');
      try {
        const res = await verifyTokenRequest();
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, [])


  return (
    // Proveemos los datos del usuario autenticado a los componentes hijos
    <AuthContext.Provider value={{ user, signup, login, logout, isAuthenticated, loading, errors }}>
      {children}
    </AuthContext.Provider>
  );
}