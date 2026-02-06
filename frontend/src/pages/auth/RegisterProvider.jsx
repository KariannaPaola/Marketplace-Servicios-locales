import useRegisterProvider from "../../hooks/auth/useRegisterProvider";
import RegisterProviderForm from "../../components/auth/RegisterProviderForm";


export default function RegisterProviderPage (){
const {error, message, infoSubmit,profession, setProfession, description,setDescription,categories, categoriaSeleccionada, setCategoriaSeleccionada, estadoSeleccionado, setEstadoSeleccionado, states, services, handleServiceChange, removeService, addService}=useRegisterProvider()

  return(
    <RegisterProviderForm
      error={error}
      message ={message}
      infoSubmit={infoSubmit}
      profession={profession}
      setProfession={setProfession}
      description={description}
      setDescription={setDescription}
      categories={categories}
      categoriaSeleccionada={categoriaSeleccionada}
      setCategoriaSeleccionada={setCategoriaSeleccionada}
      estadoSeleccionado={estadoSeleccionado}
      states={states}
      setEstadoSeleccionado={setEstadoSeleccionado}
      services={services}
      handleServiceChange={handleServiceChange}
      removeService={removeService}
      addService={addService}
      />
  ); 
}