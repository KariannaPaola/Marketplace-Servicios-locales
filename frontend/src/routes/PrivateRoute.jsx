import { useAuth } from "../context/useAuth";
import NotFound from "../pages/public/NotFound";

export default function PrivateRoute({ children }) {
const { isAuthenticated, loading, isClient } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <NotFound />;
  return children;
}