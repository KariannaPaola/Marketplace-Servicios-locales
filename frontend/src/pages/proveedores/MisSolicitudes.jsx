import { useState, useEffect } from "react";
import { getRequestProvider } from "../../services/auth";
import { cancelRequest, confirmRequest } from "../../services/auth";

export default function MyRequestProvider(){
const [requests, setRequests] = useState([]);

useEffect (()=>{
  const handleGetRequest= async()=>{
    try {
      const data= await getRequestProvider();
      setRequests(data.requests)
      console.log(requests)
    } catch (error) {
      console.log (error, "Error al mostrar solicitudes")
    }
}
handleGetRequest()
},[])

const handleCancelRequest= async(requestId)=>{
  try {
    await cancelRequest(requestId)
    setRequests(prev =>
        prev.map(p =>
        p._id === requestId
        ? { ...p, status: "cancelado" }
        : p
        )
      );
  } catch (error) {
    console.log (error, "Error al cancelar solicitud")  
  }
 } 
const handleConfirmRequest= async(requestId)=>{
  try {
    await confirmRequest(requestId)
    setRequests(prev =>
        prev.map(p =>
        p._id === requestId
        ? { ...p, status: "completado" }
        : p
        )
      );
  } catch (error) {
    console.log (error, "Error al cancelar solicitud")  
  }
}

return (

<div >
  <h1>Mis solicitudes</h1>
  {console.log(requests)}

  {requests.map((req)=>
  <div key={req._id}>
  {req.status === "en_curso" && <div>
    <p>Solicitud en curso</p>
    <button onClick={() => handleConfirmRequest(req._id)}>
      confirmar que la solictiud de realizo
    </button>
    <button onClick={() => handleCancelRequest(req._id)}>
      cancelar 
    </button>
    </div>}
    {req.status === "completado" && <div>
    <p>Solicitud completada con exito</p>
    </div>}
      {req.status === "pendiente" && (
      <div>
        <p>falta que el cliente llene el formulario de confirmacion</p>
      </div>)}
      {req.status === "cancelado" && <div>
    <p>Solicitud cancelada</p>
    </div>}
  </div>
  )}
</div>

)
}