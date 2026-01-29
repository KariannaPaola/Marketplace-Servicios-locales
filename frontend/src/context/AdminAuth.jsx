import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <p>Cargando...</p>; 
  if (!user) return <Navigate to="/login" />; 
  if (user.user_type !== "admin") return <Navigate to="/no-autorizado" />; 
  return children; 
};

export default AdminRoute;