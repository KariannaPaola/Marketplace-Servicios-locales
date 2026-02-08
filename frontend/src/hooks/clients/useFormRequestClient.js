import { useState } from "react";
import { submitForm } from "../../services/auth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function useFormRequestClient(){
    const { Id_request } = useParams();
    const [name_service, setName_service] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate()
  
    const handleSubmitForm= async (e)=>{
      e.preventDefault();
      try {
        const data= await submitForm(Id_request, name_service, description, date);
        setMessage(data.message)
        navigate("/client/RequestExitosa");
      } catch (error) {
        setError(error.message)
      }
    }

return{handleSubmitForm, name_service,setName_service, date ,setDate, description, setDescription, message, error}
}