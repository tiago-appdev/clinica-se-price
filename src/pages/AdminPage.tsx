import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Index";
import UserTable from "../components/UserTable";
import Sidebar from "../components/Sidebar";
import SettlementPage from "../pages/SettlementPage";

// Pagina de administrador
const AdminPage = () => {
	const [currentPage, setCurrentPage] = useState("UserTable");

	return (
		<div className="h-screen flex flex-col max-h-195px">
			<NavBar message="Cerrar Sesión" />
			<div className="flex flex-grow">
				<Sidebar
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
				<div className="flex-grow p-4">
					{currentPage === "UserTable" && <UserTable />}
					{currentPage === "SettlementPage" && <SettlementPage />}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default AdminPage;
