import React from "react";

// Componente Label para mantener consistencia en las etiquetas de la aplicación
const Label = ({ children, htmlFor, className }) => {
	return (
		<label
			htmlFor={htmlFor}
			className={`block text-sm font-medium text-gray-700 ${className}`}
		>
			{children}
		</label>
	);
};

export default Label;
