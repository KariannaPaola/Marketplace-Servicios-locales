import dotenv from 'dotenv';
dotenv.config();

export const authRoleClient = (req, res, next) => {
  const user= req.user;
  if (!user) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }
  if (user.user_type !== 'cliente') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol cliente' });
  }
  next();
};

export const authRoleProvider = (req, res, next) => {
  const user= req.user;
  if (!user) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }
  if (user.user_type !== 'proveedor') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol proveedor' });
  }
  next();
};

export const authRoleAdmin = (req, res, next) => {
  const user= req.user;
  if (!user) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }
  if (user.user_type !== 'administrador') {
    return res.status(403).json({ msg: 'Acceso denegado: se requiere rol administrador' });
  }
  next();
};

