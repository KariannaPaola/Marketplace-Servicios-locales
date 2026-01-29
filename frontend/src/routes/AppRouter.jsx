import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/public/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import RegisterProvider from "../pages/auth/RegisterProvider";
import CategoriesAdmin from "../pages/administrador/Categorias";
import UsersAdmin from "../pages/administrador/Usuarios";
import Home from "../pages/public/Home";
import GetProvidersSearch from "../pages/clientes/ResultadosBusqueda";
import ProfileProvider from "../pages/clientes/PerfilPrestador";
import Chat from "../pages/clientes/Chat";
import FormRequest from "../pages/clientes/FormularioConfirmacion";
import GetProvidersAdmin from "../pages/administrador/Proveedores";
import MyRequestProvider from "../pages/proveedores/MisSolicitudes";
import MyRequestClient from "../pages/clientes/MisSolicitudes";
import MyFees from "../pages/proveedores/Pagos";
import ListAllFees from "../pages/administrador/Pagos";


function ClientDashboard() {
  return <h1>holaa</h1>;
}
function ProviderDashboard() {
  return <h1>Dashboard Prestador</h1>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/Chat/:Id_provider" element={<PrivateRoute><Chat/></PrivateRoute>} />
        <Route path="/request/:Id_request" element={<PrivateRoute><FormRequest/></PrivateRoute>} />
        <Route path="/profileProvider/:id" element={<PrivateRoute><ProfileProvider/></PrivateRoute>} />
        <Route path="/getProviders" element={<PrivateRoute><GetProvidersSearch/></PrivateRoute>} />
        <Route path="/dashboard/provider" element={<ProviderDashboard />} />
        <Route path="/register/provider" element={<PrivateRoute><RegisterProvider /></PrivateRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><CategoriesAdmin /></AdminRoute>} />
        <Route path="/admin/providers" element={<AdminRoute><GetProvidersAdmin /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UsersAdmin /></AdminRoute>} />
        <Route path="/provider/request" element={<PrivateRoute><MyRequestProvider/></PrivateRoute>} /> 
        <Route path="/client/request" element={<PrivateRoute><MyRequestClient/></PrivateRoute>} /> 
        <Route path="/provider/myfees" element={<PrivateRoute><MyFees/></PrivateRoute>} /> 
        <Route path="/admin/fees" element={<PrivateRoute><ListAllFees/></PrivateRoute>} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}