import dotenv from 'dotenv';
dotenv.config();

export const authRoleClient = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }

  if (req.user.role !== 'cliente') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol cliente' });
  }

  next();
};

export const authRoleProvider = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }

  if (req.user.role !== 'proveedor') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol proveedor' });
  }

  next();
};

export const authRoleAdmi = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }

  if (req.user.role !== 'admnistrador') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol administrador' });
  }

  next();
};

export default authRole;