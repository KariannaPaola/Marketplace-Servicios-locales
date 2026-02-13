import { useState} from "react";
import { payFee } from "../../services/auth";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function usePayFeeProvider (){
  const [reference, setreference] = useState("");
  const [message, setmessage] = useState("");
  const [feeApi, setFeeApi] = useState(null);
  const [loading, setLoading] = useState(true);
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

  useEffect (()=>{
    try {
      axios.get("https://ve.dolarapi.com/v1/dolares/oficial")
      .then(resp => {
        setFeeApi(resp)})
      setLoading(false)
    } catch(error) {
      console.error(error);
    };
  
    },[])

  return{payMyFee, reference, setreference, message, error,feeApi, loading }
}

