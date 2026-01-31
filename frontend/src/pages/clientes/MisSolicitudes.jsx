import { useState, useEffect } from "react";
import { getRequestClient,  cancelRequest, confirmRequest } from "../../services/auth";

export default function MyRequestClient(){
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit=10;

useEffect (()=>{
  const handleGetRequest= async()=>{
    try {
      const data= await getRequestClient();
      setRequests(data.requests)
      setTotal(data.total)
    } catch (error) {
      console.log (error, "Error al mostrar solicitudes")
    }
}
handleGetRequest()
},[page])

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
  <h1>Mis solicitudes clientes</h1>
  {console.log(requests)}
  {requests.map((req)=>
  <div key={req._id}>
  {req.status === "en_curso" && <div>
    <p>Solicitud en curso</p>
    <button onClick={() => handleConfirmRequest(req._id)}>
      confirmar que la solictiud de realizo
    </button>
    <button onClick={() => handleCancelRequest(req._id)} >
      cancelar 
    </button>
    </div>}
    {req.status === "completado" && <div>
    <p>Solicitud completada con exito</p>
    </div>}
      {req.status === "pendiente" && (
      <div>
      <p>Debes llenar el formulario de confirmacion</p>
      </div>)}
      {req.status === "cancelado" && <div>
    <p>Solicitud cancelada con exito</p>
    </div>}
  </div>
  )}
  <div>
        <button disabled={page===1}  onClick={()=>setPage(p=> p - 1)} >Anterior</button>
        <button disabled={page * limit >= total} onClick={()=>setPage(p=> p + 1)}>Siguiente</button>
      </div>
</div>

)
}