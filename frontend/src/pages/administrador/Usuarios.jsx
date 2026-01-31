import React, { useState, useEffect } from "react";
import { usersAdmin , deleteUser, unDeleteUser} from "../../services/auth";


export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit=10

  useEffect(()=>{
  const getUsers = async ()=>{
    try {
      const data= await usersAdmin({page,limit});
      setUsers(data.users)
      setTotal(data.total)
    } catch (error) {
      console.log("error al listar usuarios", error)
    }
  }
  getUsers();
  },[page] )

  const handleDeleteUser= async (id)=>{
    try {
      const data= await deleteUser(id);
      setUsers(prev => prev.map(u =>u._id === id? { ...u, is_deleted: true }: u));
    } catch (error) {
      console.log("error al eliminar usuario", error)
    }
  }

  const handleUnDeleteUser= async (id)=>{
    try {
      const data= await unDeleteUser(id);
      setUsers(prev => prev.map(u => u._id === id ? { ...u, is_deleted: false } : u));
    } catch (error) {
      console.log("error al restaurar usuario", error)
    }
  }

  return (
  <div>
    {users.map((u)=>  
    <div key={u._id}> 
    <p>{u.name}</p> {u.lastname}{u.is_deleted ? "suspedido":  "activo"} 
    <button onClick={()=> u.is_deleted ? handleUnDeleteUser(u._id) : handleDeleteUser(u._id)} >{u.is_deleted ? "activar":  "suspender"}</button>
    </div>)}
    <div>
      <button disabled={page===1} onClick={()=>setPage(p => p - 1)}>Anterior</button>
      <button disabled={page * limit >= total} onClick={()=>setPage(p => p + 1)}>Siguiente</button>
    </div>
  </div>
  )
}