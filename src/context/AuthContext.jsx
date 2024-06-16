/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		const userId = localStorage.getItem("userId") || Cookies.get("userId");
		return !!userId; 
	});
    const userId = localStorage.getItem("userId") || Cookies.get("userId");

	const login = (userId) => {
		localStorage.setItem("userId", userId);
		Cookies.set("userId", userId, { expires: 7 });
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("userId");
		Cookies.remove("userId");
		setIsAuthenticated(false);
	};

	useEffect(() => {
		const userId = localStorage.getItem("userId") || Cookies.get("userId");
		if (userId) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false); 
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, AuthContext };
