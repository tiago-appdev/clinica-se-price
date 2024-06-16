/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize isAuthenticated based on token presence
    const token = localStorage.getItem("token") || Cookies.get("token");
    return !!token; // true if token exists, false otherwise
  });

  const login = (token) => {
    localStorage.setItem("token", token);
    Cookies.set("token", token, { expires: 7 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // Ensure isAuthenticated reflects token presence on mount
    const token = localStorage.getItem("token") || Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); // Ensure it's false if token is not found
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
