import { useState } from "react";
import { submitForm } from "../../services/auth";
import { useParams } from "react-router-dom";

export default function useFormRequestClient(){
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

return{handleSubmitForm, name_service,setName_service, date ,setDate, description, setDescription}
}