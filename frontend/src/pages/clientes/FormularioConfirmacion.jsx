import { useState } from "react";
import { submitForm } from "../../services/auth";
import { useParams } from "react-router-dom";


export default function FormRequest (){
  const { Id_request } = useParams();
  const [name_service, setName_service] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmitForm= async (e)=>{
    e.preventDefault();
    try {
      await submitForm(Id_request, name_service, description, date);
      console.log("solicitud en curso" )
    } catch (error) {
      console.log("Error al enviar formulario" , error)
    }
  }
  
  return(
    <div>
      <h2>Nueva solicitud de servicio</h2>
      <p>Complete los datos para contratar un proveedor de servicios</p>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Nombre del servicio"
          value={name_service}
          onChange={(e) => setName_service(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="fecha del servicio acordada"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="detalles adicionales del servicio"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Enviar formulario</button>
      </form>
    </div>
  )
}