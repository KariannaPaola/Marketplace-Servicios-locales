import React, { useState, useEffect} from "react";
import { registerProvider, getStates, categoriesPublic } from "../../services/auth";
import { useNavigate } from "react-router-dom";


export default function useRegisterProvider(){
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [states, setStates] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([{ name_service: "", price: ""}]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const infoSubmit = async () => {
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
      navigate(`/upload/file`);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Error desconocido");
    }
  }
  
  return{error, message, infoSubmit,profession, setProfession, description,setDescription,categories, categoriaSeleccionada, setCategoriaSeleccionada, estadoSeleccionado, states, setEstadoSeleccionado, services, handleServiceChange, removeService, addService}

}