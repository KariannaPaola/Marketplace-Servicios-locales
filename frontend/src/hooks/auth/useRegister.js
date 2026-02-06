import React, { useState} from "react";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function useRegister(){
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [password_repeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState([]);
    const navigate = useNavigate();
  
    const handleSubmit = async () => { 
      const errors=[];
      if (!name || !lastname|| !email || !phone_number|| !password || !password_repeat) {
      errors.push("Todos los campos son obligatorios");
      }
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      if (password && !passwordRegex.test(password)) {
      errors.push("La contraseña debe tener al menos una mayúscula, un número y un carácter especial");
      }
      if (password !== password_repeat) {
      errors.push("Las contraseñas no coinciden");
      }
      const phone_numberRegex = /^\+58(212|412|414|424|416|426)[0-9]{7}$/;
      if (phone_number && !phone_numberRegex.test(phone_number)) {
      errors.push("debe ingresar un numero en este formato: +584143417985");
      }
      if (errors.length > 0) {
      setError(errors);
      return;
      }
      
      try {
        const data = await register(name, lastname, email, phone_number, password, password_repeat);
        if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError([data.message]);
      }
      } catch (error) {
        setError([error.response?.data?.message || "Error al registarar usuarios"]);
      }
    }
    
  return{name, lastname, email,setName, setLastname, setEmail,phone_number, setPhoneNumber, password, setPassword, password_repeat, setPasswordRepeat, handleSubmit, error}

}