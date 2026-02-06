import React, { useState, useEffect } from "react";
import { usersAdmin , deleteUser, unDeleteUser} from "../../services/auth";


export default function useUsersAdmin (){
  const   [users, setUsers] = useState([]);
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
  
    const remove= async (id)=>{
      try {
        await deleteUser(id);
        setUsers(prev => prev.map(u =>u._id === id? { ...u, is_deleted: true }: u));
      } catch (error) {
        console.log("error al eliminar usuario", error)
      }
    }
  
    const unDelete= async (id)=>{
      try {
        await unDeleteUser(id);
        setUsers(prev => prev.map(u => u._id === id ? { ...u, is_deleted: false } : u));
      } catch (error) {
        console.log("error al restaurar usuario", error)
      }
    }
  return{
    users, setUsers ,page, setPage, total, setTotal, limit, remove, unDelete}
}