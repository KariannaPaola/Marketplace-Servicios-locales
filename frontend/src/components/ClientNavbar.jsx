import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FiMenu, FiX, FiHome, FiClipboard, FiUser, FiLogOut } from "react-icons/fi";
import { useState } from "react";


import useLogout from "../hooks/auth/useLogout";

export default function ClientNavbar() {
   const [isOpen, setIsOpen] = useState(false);
  const { isProvider, isProviderPending } = useAuth();
  
  const {handleLogout}=useLogout();
  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { to: "/client/inicio", label: "Inicio", icon: <FiHome /> },
    { to: "/client/request", label: "Solicitudes realizadas", icon: <FiClipboard /> },
  ];
 if (isProvider) {
    links.push({
      to: "/provider/request",
      label: "Solicitudes recibidas",
      icon: <FiUser />,
    }, {
      to: "/provider/myfees",
      label: "Historial de tarifas",
      icon: <FiUser />,
    });
  }
  if (!isProvider) {
    links.push({
      to: "/register/provider",
      label: "Registarse como proveedor",
      icon: <FiUser />,
    });
  }
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              to="/home"
              className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-900 to-blue-950 bg-clip-text text-transparent">
              Servi<span className="font-black">Ya</span>
            </Link>
          </div>
          <div className="hidden lg:flex space-x-6 items-center">
            {isProviderPending && (
              <span className="text-gray-500 italic">
                Proveedor en revisión
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium">
              <FiLogOut />
              <span>Cerrar sesión</span>
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white px-2 pt-2 pb-3 space-y-1 shadow-md">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          {isProviderPending && (
            <span className="block px-3 py-2 text-gray-500 italic">
              Proveedor en revisión
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium">
            <FiLogOut />
            <span>Cerrar sesión</span>
          </button>
        </div>
      )}
    </nav>
  );
}