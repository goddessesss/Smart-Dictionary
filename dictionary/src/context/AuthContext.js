import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('authToken');
    return storedToken || null;
  });
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const extractUserInfoFromToken = (token) => {
      try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken?.userId ?? null;
        const uniqueName = decodedToken?.unique_name ?? null;
        setUserId(userId);
        setUsername(uniqueName);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    if (token) {
      extractUserInfoFromToken(token);
    } else {
      setUserId(null);
      setUsername(null);
    }
  }, [token]);

  const handleLogin = (newToken, decodeToken = true) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);

    if (decodeToken) {
      try {
        const decodedToken = jwt_decode(newToken);
        const userId = decodedToken?.userId ?? null;
        const uniqueName = decodedToken?.unique_name ?? null;
        setUserId(userId);
        setUsername(uniqueName);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setUsername(null); 

    localStorage.removeItem('authToken');
    window.location.reload(); 
  };

  return (
    <AuthContext.Provider value={{ token, userId, username, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
