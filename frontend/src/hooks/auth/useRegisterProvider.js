import React, { useState, useEffect} from "react";
import { registerProvider, getStates, categoriesPublic, uploadImage } from "../../services/auth";
import { useNavigate } from "react-router-dom";


export default function useRegisterProvider(){
  const [profession, setProfession] = useState("");
  const [description, setDescription] = useState("");
  const [direction, setDirection] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [states, setStates] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [files, setFiles] = useState(null);
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([{ name_service: "", price: ""}]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFilesChange = (e) => {
    setFiles(e.target.files[0]);
  };

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
    if (!profession || !description || !direction || !categoriaSeleccionada || !estadoSeleccionado) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (services.some(s => !s.name_service || !s.price)) {
      setError("Todos los servicios deben tener nombre y precio válido");
      return;
    }
    if (!files) {
      alert("Selecciona al menos un archivo");
      return;
    }

    try {
      await registerProvider(
        profession,
        description,
        direction,
        categoriaSeleccionada,
        estadoSeleccionado,
        services.map(s => ({
          name_service: s.name_service,
          price: Number(s.price),
        }))
      );
      try {
      const formData = new FormData();
      formData.append("documents", files);
      formData.append("type", "cedula");
      await uploadImage(formData);
      } catch (error) {
        setError("Error al subir documento");
      }
      navigate("/client/RegistroProveedorExitoso");
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Error al registar proveedor");
    }
  }
  
  return{error, message, infoSubmit,profession, setProfession, description, direction, setDirection, setDescription,categories, categoriaSeleccionada, setCategoriaSeleccionada, estadoSeleccionado, states, setEstadoSeleccionado, services, handleServiceChange, removeService, addService, handleFilesChange}

}