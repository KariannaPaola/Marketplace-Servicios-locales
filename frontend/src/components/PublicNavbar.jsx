import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX, FiHome, FiLogIn, FiUserPlus} from "react-icons/fi";


export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const links = [
    { to: "/home", label: "Home", icon: <FiHome /> },
    { to: "/login", label: "Login", icon: <FiLogIn /> },
    { to: "/register", label: "Registro", icon: <FiUserPlus /> }
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
          <div className="hidden md:flex space-x-6 items-center">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium">
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
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
        </div>
      )}
    </nav>
  );
}