import { useState} from "react";
import { payFee } from "../../services/auth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function usePayFeeProvider (){
  const [reference, setreference] = useState("");
  const [message, setmessage] = useState("");
  const [error, setError] = useState("");
  const {id}= useParams();
  const navigate=useNavigate()

  const payMyFee= async ()=>{
    try {
      await payFee(id, reference);
      setmessage("Referencia enviada con exito")
      navigate("/provider/succefullPay");
    } catch (error) {
      setError("Error al pagar tarifa")
    }
  }

  return{payMyFee, reference, setreference, message, error}
}

