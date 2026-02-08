import React, { useState , useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function useLogout(){
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout()
      navigate("/home");
    } catch (error) {
      setError([error.response?.data?.message || "Error al salir"]);
    }
  };

return{handleLogout}

}