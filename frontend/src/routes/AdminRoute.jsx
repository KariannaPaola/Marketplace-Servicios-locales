import { useAuth } from "../context/useAuth";
import NotFound from "../pages/public/NotFound";


const AdminRoute = ({ children }) => {
  
  const { isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isAdmin) {
    return <NotFound />;
  }
  return children;
};

export default AdminRoute;