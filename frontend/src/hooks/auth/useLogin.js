import React, { useState , useContext } from "react";
import { login as loginApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function useLogin(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const errors=[];
    if (!email || !password) {
    errors.push("Todos los campos son obligatorios");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      errors.push("Ingrese un correo válido");
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (password && !passwordRegex.test(password)) {
    errors.push("La contraseña debe tener al menos una mayúscula, un número y un carácter especial");
    }
    if (errors.length > 0) {
      setError(errors);
      return;
      }
    try {
      const data = await loginApi(email, password);
      login(data.user, data.token)
      navigate("/client/inicio");
    } catch (error) {
      setError([error.response?.data?.message || "Error de login"]);
    }
  };

return{email, setEmail,password, setPassword ,login, handleSubmit ,setError, error}

}