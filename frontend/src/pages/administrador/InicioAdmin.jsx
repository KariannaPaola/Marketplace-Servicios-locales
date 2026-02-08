import { Link } from "react-router-dom";
import { FaUsers, FaTags, FaTruck, FaDollarSign } from "react-icons/fa";

export default function AdminDashboard() {
  const cards = [
    { title: "Usuarios", icon: <FaUsers size={40} />, link: "/admin/users", color: "bg-blue-100 text-blue-700" },
    { title: "Categorías", icon: <FaTags size={40} />, link: "/admin/categories", color: "bg-green-100 text-green-700" },
    { title: "Proveedores", icon: <FaTruck size={40} />, link: "/admin/providers", color: "bg-yellow-100 text-yellow-700" },
    { title: "Tarifas", icon: <FaDollarSign size={40} />, link: "/admin/fees", color: "bg-purple-100 text-purple-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link 
            to={card.link} 
            key={card.title} 
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow ${card.color}`}
          >
            <div className="mb-4">{card.icon}</div>
            <h2 className="text-xl font-semibold">{card.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}