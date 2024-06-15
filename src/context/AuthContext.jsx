/* eslint-disable react/prop-types */
// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null); // State to store user_id

  const login = (userId) => {
    setIsAuthenticated(true);
    setUserId(userId); // Store user_id when logging in
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null); // Clear user_id on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
