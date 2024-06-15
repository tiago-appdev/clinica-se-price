import React from "react";

const Sidebar = () => {
    return (
        <nav className="w-64 bg-gray-100 dark:bg-gray-900 flex flex-col gap-1 p-4 h-full">
            <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-200 dark:bg-gray-800 dark:text-gray-50 transition-all"
            >
                Panel de Control
            </a>
            <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
                Turnos
            </a>
            <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
                Perfil
            </a>
            <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
                Historias Médicas
            </a>
            <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
                Ajustes
            </a>
        </nav>
    );
};

export default Sidebar;
