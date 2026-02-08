import { Link } from "react-router-dom";
import { useState } from "react";
import useLogout from "../hooks/auth/useLogout";
import { FiMenu, FiX, FiHome, FiUsers, FiBox, FiDollarSign, FiTag, FiLogOut } from "react-icons/fi";

export default function AdminNavbar() {

  const {handleLogout}=useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { to: "/admin/inicio", label: "Inicio", icon: <FiHome /> },
    { to: "/admin/users", label: "Usuarios", icon: <FiUsers /> },
    { to: "/admin/providers", label: "Proveedores", icon: <FiBox /> },
    { to: "/admin/fees", label: "Tarifas", icon: <FiDollarSign /> },
    { to: "/admin/categories", label: "Categorías", icon: <FiTag /> },
  ];

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
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium space-x-1">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium space-x-1">
              <FiLogOut />
              <span>Cerrar sesión</span>
            </button>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 focus:outline-none">
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
              className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 font-medium space-x-2"
              onClick={() => setIsOpen(false)}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium space-x-2">
            <FiLogOut />
            <span>Cerrar sesión</span>
          </button>
        </div>
      )}
    </nav>
  );
}


