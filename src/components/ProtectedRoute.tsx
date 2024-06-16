import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
// Este elemento recibe un children que es el componente que se va a renderizar si el usuario está autenticado.
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useContext(AuthContext);

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
