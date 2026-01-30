import { useState} from "react";
import { payFee } from "../../services/auth";
import { useParams } from "react-router-dom";


export default function PayFee(){
const [reference, setreference] = useState("");
const {id}= useParams();

const handlePayFee= async (e)=>{
  e.preventDefault();
  try {
    await payFee(id, reference);
    console.log("Referencia enviada con exito")
  } catch (error) {
    console.log("Error al pagar tarifa")
  }
}
return (
  <div>
    <h1>Pago de tarifa</h1>
    <form onSubmit={handlePayFee}>
      <input
        type="text"
        placeholder="Ingresa el numero de referencia "
        value={reference}
        onChange={(e) => setreference(e.target.value)}
        required
      />
      <button type="submit">Enviar referencia</button>
    </form>
  </div>
)



}