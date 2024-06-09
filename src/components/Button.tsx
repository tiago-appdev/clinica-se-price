import React from "react";

const Button = ({
	children,
	onClick = () => {},
	className = "",
	variant = "primary",
	...props
}) => {
	const baseStyles =
		"inline-flex h-10 items-center justify-center rounded-md text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1";
	const variantStyles =
		variant === "primary"
			? "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary"
			: "bg-gray-200 text-black hover:bg-gray-300 focus-visible:ring-gray-400";
	const combinedStyles = `${baseStyles} ${variantStyles} ${className}`;

	return (
		<button onClick={onClick} className={combinedStyles} {...props}>
			{children}
		</button>
	);
};

export default Button;
