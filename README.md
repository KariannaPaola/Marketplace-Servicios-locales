Marketplace de Servicios Locales

Aplicación web full-stack que permite a usuarios publicar y contratar servicios locales.
Los proveedores pueden ofrecer sus servicios y los clientes pueden contactarlos, acordar condiciones y confirmar la contratación dentro de la plataforma.

Live Demo
https://marketplace-servicios-locales.vercel.app/

Tech Stack

Frontend
React
Tailwind CSS

Backend
Node.js
Express

Base de datos
MongoDB

Otros
Consumo de API externa (DolarAPI)

Features
Usuarios:
Registro de usuarios.
Inicio de sesión (login).
Confirmación de email al registrarse.
Recuperación y cambio de contraseña.
Edición de perfil.
Búsqueda y contratación de servicios.

Proveedores de servicios:
Registro como proveedor de servicios.
Publicación de servicios con precios.
Edición de servicios publicados.
Chat interno con clientes para acordar condiciones.
Confirmación de servicio contratado.
Generación automática de una tarifa que el proveedor debe pagar a la plataforma.

Panel de administrador:
Aprobar o rechazar registros de proveedores.
Revisión de documentos de identidad enviados por proveedores.
Bloquear usuarios.
Crear, editar o eliminar categorías de servicios.
Gestión general de la plataforma.

Interfaz:
Interfaz simple e intuitiva.
Flujo de contratación claro entre cliente y proveedor.

Installation
git clone https://github.com/KariannaPaola/marketplace-servicios-locales
cd marketplace-servicios-locales
npm install
npm run dev

What I Learned
Construcción de una aplicación full-stack con React y Node.js.
Manejo de estado en aplicaciones React.
Diseño de APIs REST.
Integración de servicios externos (DolarAPI).
Gestión de usuarios con diferentes roles (cliente, proveedor, administrador).
