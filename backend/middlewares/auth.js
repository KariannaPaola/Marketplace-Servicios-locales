import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No autorizado, token no enviado" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: 'No hay token, acceso denegado' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user= await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: "Usuario no válido" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

export default authMiddleware;