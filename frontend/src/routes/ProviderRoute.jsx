import { useAuth  } from "../context/useAuth";
import NotFound from "../pages/public/NotFound";

export default function ProviderRoute({ children }) {

  const { isProvider, loading } = useAuth();
  if (loading) return <p>Cargando..</p>;
  if (!isProvider) {
    return <NotFound />;
  }
  
  return children;
}