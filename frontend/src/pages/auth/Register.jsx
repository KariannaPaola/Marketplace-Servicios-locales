import React, { useState} from "react";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password_repeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (password !== password_repeat) {
    setError("Las contraseñas no coinciden");
    return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
    setError("La contraseña debe tener al menos una mayúscula, un número y un carácter especial");
    return;
    }
  
    const phone_numberRegex = /^\+58(212|412|414|424|416|426)[0-9]{7}$/;
    if (!phone_numberRegex.test(phone_number)) {
    setError("debe ingresar un numero en este formato: +584143417985");
    return;
    }
    try {
      const data = await register(name, lastname, email, phone_number, password, password_repeat);
      if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.message);
    }
    } catch (err) {
  const backendMessage =
    err.response?.data?.message ||
    err.response?.data?.msg ||
    "Error al registrarse";
  setError(backendMessage);
}
  };
  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ingresa tu apellido"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="+584143417985"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="confirmar contraseña"
          value={password_repeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
          required
        />
        <button type="submit">Registarse</button>
      </form>
    </div>
  );
}