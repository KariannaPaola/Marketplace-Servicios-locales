import React, { useState, useEffect} from "react";
import { registerProvider, getStates, categoriesPublic } from "../../services/auth";


export default function RegisterProvider (){
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [states, setStates] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([{ name_service: "", price: ""}]);
  const [error, setError] = useState("");

    useEffect(() => {
      const fetchCategories =  async () => {
          try {
            const data = await categoriesPublic();
            setCategories(data.categories)
          } catch (error) {
            console.error("Error cargando categorías", error);
          } 
        }
        fetchCategories()
    }, []);
  
    
    useEffect(() => {
      const fetchStates =  async () => {
          try {
            const data = await getStates();
            setStates(data.states)
          } catch (error) {
            console.error("Error cargando estados", error);
          } 
        }
        fetchStates()
    }, []); 

  const addService = () => {
  setServices([...services, { name_service: "", price: "" }])};

  const removeService = (index) => {
  const updatedServices = services.filter((_, i) => i !== index);
  setServices(updatedServices);
  };

  const handleServiceChange = (index, field, value) => {
  const updatedServices = [...services];
  updatedServices[index][field] = value;
  setServices(updatedServices);
  };

  const infoSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!profession || !description || !categoriaSeleccionada || !estadoSeleccionado) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (services.some(s => !s.name_service || !s.price)) {
      setError("Todos los servicios deben tener nombre y precio válido");
      return;
    }

    try {
      const data = await registerProvider(
      profession,
      description,
      categoriaSeleccionada,
      estadoSeleccionado,
      services.map(s => ({
        name_service: s.name_service,
        price: Number(s.price),
      }))
      );
      setMessage(data.message)
      } catch (error) {
      setError(error.response?.data?.message || error.message || "Error desconocido");
    }
  }

  return(
    <div>
      <h2>Registro proveedor</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={infoSubmit }>
        <input
          type="text"
          placeholder="Ingresa tu profesion"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ingresa una breve descripcion de tu perfil profesional"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
        id="category"
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
        <option value="">--Elige una opción--</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <select
        id="state"
        value={estadoSeleccionado}
        onChange={(e) => setEstadoSeleccionado(e.target.value)}>
        <option value="">--Elige una opción--</option>
        {states.map((sta) => (
          <option key={sta._id} value={sta._id}>
            {sta.name}
          </option>
        ))}
      </select>
      {services.map((service, index) => (
      <div key={index}>
      <input
      type="text"
      placeholder="Ingresa el nombre del servicio"
      value={service.name_service}
      onChange={(e) =>
        handleServiceChange(index, "name_service", e.target.value)
      }
      required
      />
      <input
      type="number"
      placeholder="Ingresa el valor del servicio"
      value={service.price}
      onChange={(e) =>
        handleServiceChange(index, "price", e.target.value)
      }
      required
      />
      {services.length > 1 && (
        <button type="button" onClick={() => removeService(index)}>
          Eliminar
        </button>
      )}
    </div>
    ))}
    <button type="button" onClick={addService}>
    Agregar Servicio
    </button>
    <button type="submit">Registrarse como proveedor</button>
    </form>
    </div>
  ); 
}