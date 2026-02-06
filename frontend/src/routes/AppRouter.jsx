import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "../pages/public/NotFound";
import LoginPage from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmailPage from "../pages/auth/VerifyEmail";
import RegisterProvider from "../pages/auth/RegisterProvider";
import CategoriesAdminPage from "../pages/administrador/Categorias";
import UsersAdminPage from "../pages/administrador/Usuarios";
import Home from "../pages/public/Inicio";
import GetProvidersSearch from "../pages/clientes/ResultadosBusqueda";
import ProfileProviderPage from "../pages/clientes/PerfilPrestador"
import ChatPage from "../pages/clientes/Chat";
import GetProvidersAdmin from "../pages/administrador/Proveedores";
import MyRequestProvider from "../pages/proveedores/MisSolicitudes";
import MyRequestClient from "../pages/clientes/MisSolicitudes";
import MyFeesPage from "../pages/proveedores/Pagos";
import FeesAdminPage from "../pages/administrador/Tarifas";
import PayFeePage from "../pages/proveedores/PagarTarifa";
import VerifyFee from "../pages/administrador/RevisarPago";
import RecoverPasswordPage from "../pages/auth/RecuperarContraseña";
import ChangePasswordPage from "../pages/auth/CambiarContraseña";
import MyProfileProviderPage from "../pages/proveedores/MiPerfil";
import SubirCedula from "../pages/auth/EnviarArchivos";
import ReadImages from "../pages/administrador/VerArchivos";
import HomeClientPage from "../pages/clientes/Inicio";
import FormRequestPage from "../pages/clientes/FormularioConfirmacion";

function ClientDashboard() {
  return <h1>holaa</h1>;
}
function ProviderDashboard() {
  return <h1>Dashboard Prestador</h1>;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/client/inicio" element={<PrivateRoute><HomeClientPage/></PrivateRoute>}  />
        <Route path="/home" element={<Home/>} />
        <Route path="/recoverPassword" element={<RecoverPasswordPage/>} />
        <Route path="/ChangePassword/:token" element={<ChangePasswordPage/>} />
        <Route path="/Chat/:chatId" element={<PrivateRoute><ChatPage/></PrivateRoute>} />
        <Route path="/request/:Id_request" element={<PrivateRoute><FormRequestPage/></PrivateRoute>} />
        <Route path="/profileProvider/:id" element={<PrivateRoute><ProfileProviderPage/></PrivateRoute>} />
        <Route path="/getProviders" element={<PrivateRoute><GetProvidersSearch/></PrivateRoute>} />
        <Route path="/dashboard/provider" element={<ProviderDashboard />} />
        <Route path="/register/provider" element={<PrivateRoute><RegisterProvider /></PrivateRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><CategoriesAdminPage /></AdminRoute>} />
        <Route path="/admin/providers" element={<AdminRoute><GetProvidersAdmin /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UsersAdminPage /></AdminRoute>} />
        <Route path="/provider/request" element={<PrivateRoute><MyRequestProvider/></PrivateRoute>} /> 
        <Route path="/client/request" element={<PrivateRoute><MyRequestClient/></PrivateRoute>} /> 
        <Route path="/provider/myfees" element={<PrivateRoute><MyFeesPage/></PrivateRoute>} /> 
        <Route path="/provider/profile" element={<PrivateRoute><MyProfileProviderPage/></PrivateRoute>} /> 
        <Route path="/admin/fees" element={<AdminRoute><FeesAdminPage/></AdminRoute>} /> 
        <Route path="/admin/fee/:id" element={<AdminRoute><VerifyFee/></AdminRoute>} /> 
        <Route path="/provider/payfee/:id" element={<PrivateRoute><PayFeePage/></PrivateRoute>} /> 
        <Route path="/upload/file" element={<PrivateRoute><SubirCedula/></PrivateRoute>} />
        <Route path="/admin/file/:id" element={<AdminRoute><ReadImages/></AdminRoute>} /> 
        
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
    </BrowserRouter>
  );
}