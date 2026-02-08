import { useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import ClientSidebar from "./ClientSideBar";
import PublicNavbar from "../components/PublicNavbar";
import ClientNavbar from "../components/ClientNavbar";
import AdminNavbar from "../components/AdminNavbar";

export default function MainLayout({ children }) {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  const publicRoutes = [
    "/",
    "/home",
    "/login",
    "/register",
    "/recoverPassword",
    "/verify-email",
    "/ChangePassword"
  ];

  const isPublicRoute = publicRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  const showNavbar = isPublicRoute || isAuthenticated;

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {isAuthenticated && !isAdmin && <ClientSidebar />}
      <div className="flex-1 flex flex-col min-h-screen">
        {showNavbar && (
          <>
            {isPublicRoute && !isAuthenticated && <PublicNavbar />}
            {isAuthenticated && (isAdmin ? <AdminNavbar /> : <ClientNavbar />)}
          </>
        )}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}