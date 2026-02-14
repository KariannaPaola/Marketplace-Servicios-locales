import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import ProviderRoute from "./ProviderRoute";
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
import AdminDashboard from "../pages/administrador/InicioAdmin";
import SuccessfulRequestPage from "../pages/clientes/SolicitudExitosa";
import SuccessfulChangePasswordPage from "../pages/auth/ContraseñaCambiada";
import SuccessfulRegisterProviderPage from "../pages/auth/RegistroProveedorExitoso";
import SuccessfulPayMyFeePage from "../pages/proveedores/PagoExitoso";
import ProviderSearchFilter from "../pages/clientes/ProvidersFilter";
import PublicRoute from "./PublicRoute";
import ProviderSearchFilterPublic from "../pages/public/ProvidersFilter";
import ProfileProviderPagePublic from "../pages/public/PerfilPrestadorPublic";



export default function AppRouter() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <MainLayout>
      <Routes>
        {/* PUBLICAS */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>} />
        <Route path="/home" element={<PublicRoute><Home/></PublicRoute>} />
        <Route path="/verify-email/:token" element={<PublicRoute><VerifyEmailPage /></PublicRoute>} />
        <Route path="/recoverPassword" element={<PublicRoute><RecoverPasswordPage/></PublicRoute>} />
        <Route path="/ChangePassword/:token" element={<PublicRoute><ChangePasswordPage/></PublicRoute>} />
        <Route path="/contraseñaCambiada" element={<PublicRoute><SuccessfulChangePasswordPage/></PublicRoute>} />
        <Route path="/searchPublic" element={<PublicRoute><ProviderSearchFilterPublic/></PublicRoute>} />
        <Route path="/profileProviderPublic/:id" element={<PublicRoute><ProfileProviderPagePublic/></PublicRoute>} />

        {/* CLIENTE (todos los logueados) */}
        <Route path="/client/inicio" element={<PrivateRoute><HomeClientPage/></PrivateRoute>}  />
        <Route path="/Chat/:chatId" element={<PrivateRoute><ChatPage/></PrivateRoute>} />
        <Route path="/request/:Id_request" element={<PrivateRoute><FormRequestPage/></PrivateRoute>} />
        <Route path="/profileProvider/:id" element={<PrivateRoute><ProfileProviderPage/></PrivateRoute>} />
        <Route path="/getProviders" element={<PrivateRoute><GetProvidersSearch/></PrivateRoute>} />
        <Route path="/client/request" element={<PrivateRoute><MyRequestClient/></PrivateRoute>} /> 
        <Route path="/register/provider" element={<PrivateRoute><RegisterProvider /></PrivateRoute>} />
        <Route path="/client/RequestExitosa" element={<PrivateRoute><SuccessfulRequestPage /></PrivateRoute>} />
        <Route path="/client/RegistroProveedorExitoso" element={<PrivateRoute><SuccessfulRegisterProviderPage /></PrivateRoute>} />
        <Route path="/upload/file" element={<PrivateRoute><SubirCedula/></PrivateRoute>} />
        <Route path="/search" element={<PrivateRoute><ProviderSearchFilter/></PrivateRoute>} />
        
        
        {/* PROVEEDOR */}
        <Route path="/provider/myfees" element={<ProviderRoute><MyFeesPage/></ProviderRoute>} /> 
        <Route path="/provider/profile" element={<ProviderRoute><MyProfileProviderPage/></ProviderRoute>} /> 
        <Route path="/provider/request" element={<ProviderRoute><MyRequestProvider/></ProviderRoute>} /> 
        <Route path="/provider/payfee/:id" element={<ProviderRoute><PayFeePage/></ProviderRoute>} /> 
        <Route path="/provider/succefullPay" element={<ProviderRoute><SuccessfulPayMyFeePage/></ProviderRoute>} /> 

       {/* ADMIN */}
        <Route path="/admin/inicio" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><CategoriesAdminPage /></AdminRoute>} />
        <Route path="/admin/fees" element={<AdminRoute><FeesAdminPage/></AdminRoute>} /> 
        <Route path="/admin/fee/:id" element={<AdminRoute><VerifyFee/></AdminRoute>} /> 
        <Route path="/admin/providers" element={<AdminRoute><GetProvidersAdmin /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UsersAdminPage /></AdminRoute>} />
        <Route path="/admin/file/:id" element={<AdminRoute><ReadImages/></AdminRoute>} /> 

        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </MainLayout>
    </AuthProvider>
    </BrowserRouter>
  );
}