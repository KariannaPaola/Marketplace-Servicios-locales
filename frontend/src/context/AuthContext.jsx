import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 
  const [loading, setLoading] = useState(true); 
  

 useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (!savedToken || !savedUser) {
    setLoading(false);
    return;
  }

  api
    .get("/auth/me")
    .then(() => {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    })
    .catch(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
    })
    .finally(() => setLoading(false));
}, []);

  const login = (user, token) => {
  setUser(user);
  setToken(token);
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.user_type === "administrador";
  const isProvider = user?.user_type === "proveedor";
  const isProviderPending = user?.user_type === "proveedorPendiente";
  const isClient = isAuthenticated && !isAdmin;
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated,
    isAdmin,
    isProvider,
    isProviderPending,
    isClient }}>
      {children}
    </AuthContext.Provider>
  );
};  