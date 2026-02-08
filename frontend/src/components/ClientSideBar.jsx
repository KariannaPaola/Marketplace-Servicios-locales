import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FiHome, FiClipboard, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import useLogout from "../hooks/auth/useLogout";

export default function ClientSidebar() {
  const { isProvider, isProviderPending } = useAuth();
  const { handleLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(true);

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
      label: "Tarifas",
      icon: <FiUser />,
    },  {
      to: "/provider/profile",
      label: "Mi perfil",
      icon: <FiUser />,
    });
  }
  if (!isProvider) {
    links.push({
      to: "/register/provider",
      label: "Registarse como proveddor",
      icon: <FiUser />,
    });
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed top-20 left-4 z-50 p-2 rounded-md bg-blue-600 text-white">
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <aside
        className={`hidden md:flex fixed top-30  bg-white shadow-md transition-transform z-50  duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-64"} rounded-md`}>
        <nav className="flex flex-col space-y-1 px-2 py-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md font-medium">
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
            className="flex items-center space-x-2 w-full px-3 py-2 mt-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium">
            <FiLogOut />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </aside>
    </>
  );
}