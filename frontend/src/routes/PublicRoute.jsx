import { useAuth } from "../context/useAuth";
import NotFound from "../pages/public/NotFound";

export default function PublicRoute({ children }) {
const { isAuthenticated, loading} = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <NotFound />;
  return children;
}