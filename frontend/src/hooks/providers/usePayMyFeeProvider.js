import { useState} from "react";
import { payFee } from "../../services/auth";
import { useParams } from "react-router-dom";

export default function usePayFeeProvider (){
const [reference, setreference] = useState("");
const {id}= useParams();

const payMyFee= async ()=>{
  try {
    await payFee(id, reference);
    console.log("Referencia enviada con exito")
  } catch (error) {
    console.log("Error al pagar tarifa")
  }
}


  return{payMyFee, reference, setreference}
}