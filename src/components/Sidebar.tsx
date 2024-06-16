import React from "react";

const Sidebar = ({ currentPage, setCurrentPage }) => {
	return (
		<nav className="w-64 bg-gray-100 dark:bg-gray-900 flex flex-col gap-1 p-4 h-full">
			<a
				href="#"
				onClick={() => setCurrentPage("UserTable")}
				className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
					currentPage === "UserTable"
						? "text-gray-900 bg-gray-200 dark:bg-gray-800 dark:text-gray-50"
						: "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
				}`}
			>
				Panel de Control
			</a>
			<a
				href="#liquidaciones"
				onClick={() => setCurrentPage("SettlementPage")}
				className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
					currentPage === "SettlementPage"
						? "text-gray-900 bg-gray-200 dark:bg-gray-800 dark:text-gray-50"
						: "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
				}`}
			>
				Liquidaciones
			</a>
		</nav>
	);
};

export default Sidebar;
