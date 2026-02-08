import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 
  const [loading, setLoading] = useState(true); 
  

  useEffect(() => {
  const savedToken = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (savedToken && savedUser) {
    fetch("http://localhost:4000/auth/validateToken", {
      headers: { Authorization: `Bearer ${savedToken}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Token inválido");
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      })
      .catch(() => {
        // Si el token es inválido → limpiar auth
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
      })
      .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, []);

  const login = (user, token, navigate) => {
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