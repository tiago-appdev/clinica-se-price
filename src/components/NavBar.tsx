import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CrossIcon } from "../icons/icons";
import { useNavigate } from "react-router-dom";

const NavBar = ({ message }) => {
	const navigate = useNavigate();
	const { logout } = useContext(AuthContext);
	return (
		<header className="bg-gray-900 text-white px-4 lg:px-6 h-12 flex items-center">
			<button
				onClick={() => {
					logout();
					navigate("/", { replace: true });
				}}
				className="flex items-center justify-center"
			>
				<CrossIcon className="h-6 w-6" />
				<span className="font-bold text-lg p-1">Clinica SePrice</span>
			</button>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				<button
					onClick={() => {
						logout();
						navigate("/", { replace: true });
					}}
					className="text-sm font-medium hover:underline underline-offset-4"
				>
					{message}
				</button>
			</nav>
		</header>
	);
};

export default NavBar;
