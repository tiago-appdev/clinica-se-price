import React from "react";
import NavBar from "../components/NavBar";
import { Footer } from "../components";
import UserTable from "../components/UserTable";
import Sidebar from "../components/Sidebar";

const DashboardAdmin = () => {
    return (
        <div className="h-screen flex flex-col max-h-195px">
            <NavBar message="Cerrar Sesión" />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow p-4">
                    <UserTable />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardAdmin;
